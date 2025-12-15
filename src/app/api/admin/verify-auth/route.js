import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { logger } from '@/lib/security';
import { headers } from '@/lib/headers';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET(request) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 10);
  const requestIP = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const requestPath = request.nextUrl.pathname || 'unknown';
  const referer = request.headers.get('referer') || 'unknown';
  
  logger.auth({
    requestId,
    action: 'auth_verification_request',
    path: requestPath,
    ip: requestIP,
    userAgent,
    referer,
    timestamp: new Date().toISOString()
  });
  
  try {
    // Get the token from cookies - properly awaited
    const cookieStartTime = Date.now();
    const cookieStore = await cookies();
    const token = await cookieStore.get('admin_token');
    const cookieEndTime = Date.now();
    
    logger.debug({
      requestId,
      action: 'cookie_retrieval_completed',
      duration: cookieEndTime - cookieStartTime
    });
    
    if (!token) {
      logger.security({
        requestId,
        action: 'auth_verification_no_token',
        path: requestPath,
        ip: requestIP,
        userAgent,
        referer,
        duration: Date.now() - startTime
      });
      
      const response = NextResponse.json(
        { authenticated: false, error: 'No authentication token found' },
        { status: 401, headers }
      );
      
      // Clear any existing invalid cookies
      response.cookies.delete('admin_token');
      
      return response;
    }
    
    logger.debug({
      requestId,
      action: 'token_found_verifying',
      tokenExists: !!token,
      tokenLength: token.value.length,
    });
    
    // Verify the token
    const verifyStartTime = Date.now();
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    try {
      const { payload } = await jwtVerify(token.value, secret);
      const verifyEndTime = Date.now();
      
      logger.debug({
        requestId,
        action: 'token_verification_completed',
        userId: payload.sub,
        role: payload.role,
        email: payload.email,
        exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'unknown',
        duration: verifyEndTime - verifyStartTime
      });
      
      // Check if user has appropriate role (admin or moderator)
      if (payload.role !== 'admin' && payload.role !== 'moderator') {
        logger.security({
          requestId,
          action: 'auth_verification_insufficient_permissions',
          userId: payload.sub,
          role: payload.role,
          path: requestPath,
          ip: requestIP,
          userAgent,
          duration: Date.now() - startTime
        });
        
        return NextResponse.json(
          { authenticated: false, error: 'Insufficient permissions' },
          { status: 403, headers }
        );
      }
      
      // Get fresh user data from the database
      await connectToDatabase();
      const userId = payload.sub;
      const userData = await User.findById(userId).select('-password').lean();
      
      if (!userData) {
        logger.security({
          requestId,
          action: 'auth_verification_user_not_found',
          userId: payload.sub,
          role: payload.role,
          path: requestPath,
          ip: requestIP,
          userAgent,
          duration: Date.now() - startTime
        });
        
        return NextResponse.json(
          { authenticated: false, error: 'User not found' },
          { status: 401, headers }
        );
      }
      
      logger.auth({
        requestId,
        action: 'auth_verification_success',
        userId: payload.sub,
        role: userData.role,
        path: requestPath,
        ip: requestIP,
        userAgent,
        duration: Date.now() - startTime
      });
      
      // Add additional debug info for session tracking
      logger.debug({
        requestId,
        action: 'session_info',
        sessionStart: new Date().toISOString(),
        tokenExpiry: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'unknown',
        timeToExpiry: payload.exp ? Math.floor((payload.exp * 1000 - Date.now()) / 1000 / 60) + ' minutes' : 'unknown',
        userAgent
      });
      
      // Convert MongoDB _id to string to avoid serialization issues
      const safeUserData = {
        ...userData,
        _id: userData._id.toString(),
        id: userData._id.toString(),
      };
      
      const response = NextResponse.json(
        { 
          authenticated: true, 
          user: safeUserData
        },
        { headers }
      );
      
      // Add debug headers in development environment
      if (process.env.NODE_ENV === 'development') {
        response.headers.set('X-Request-ID', requestId);
        response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
      }
      
      return response;
    } catch (jwtError) {
      logger.security({
        requestId,
        action: 'auth_jwt_verification_error',
        error: jwtError.message,
        code: jwtError.code || 'unknown',
        path: requestPath,
        ip: requestIP,
        userAgent,
        duration: Date.now() - startTime
      });
      
      // If token validation fails, make sure to clear the cookie
      const response = NextResponse.json(
        { authenticated: false, error: 'Invalid authentication token' },
        { status: 401, headers }
      );
      
      // Always clear the cookie on auth failures to prevent UI issues
      response.cookies.delete('admin_token');
      
      return response;
    }
  } catch (error) {
    logger.error({
      requestId,
      action: 'auth_verification_critical_error',
      error: error.message,
      stack: error.stack,
      path: requestPath,
      ip: requestIP,
      userAgent,
      duration: Date.now() - startTime
    });
    
    return NextResponse.json(
      { authenticated: false, error: 'Invalid authentication token' },
      { status: 401, headers }
    );
  }
} 