import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { SignJWT } from 'jose';
import { logger } from '@/lib/security';
import { nanoid } from "nanoid";

// Simple admin login page (in a real app, this would be more robust)
export async function GET() {
  logger.security({
    action: "invalid_method_admin_login",
    method: "GET",
    url: "/api/admin/login",
    timestamp: new Date().toISOString()
  });
  
  console.warn('GET request received on admin login endpoint - method not allowed');
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

// Handle login
export async function POST(request) {
  const requestId = Math.random().toString(36).substring(2, 10);
  const startTime = Date.now();
  const requestIP = request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    logger.auth({ 
      requestId,
      action: "login_api_called",
      ip: requestIP,
      userAgent,
      timestamp: new Date().toISOString()
    });
    
    await connectToDatabase();
    const dbConnectTime = Date.now();
    
    logger.debug({
      requestId,
      action: "db_connection_established",
      duration: dbConnectTime - startTime
    });
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      logger.auth({
        requestId,
        action: "login_invalid_input",
        email: email ? email.substring(0, 3) + '***' : 'missing',
        error: "Missing email or password",
        ip: requestIP,
        duration: Date.now() - startTime
      });
      
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    logger.debug({
      requestId,
      action: 'searching_user',
      email: email.substring(0, 3) + '***' // Log partial email for security
    });
    
    const userLookupStartTime = Date.now();
    const user = await User.findOne({ email });
    const userLookupEndTime = Date.now();
    
    logger.debug({
      requestId,
      action: "user_lookup_completed",
      email: email.substring(0, 3) + '***',
      userFound: !!user,
      duration: userLookupEndTime - userLookupStartTime
    });
    
    if (!user) {
      logger.auth({
        requestId,
        action: "login_user_not_found",
        email: email,
        ip: requestIP,
        userAgent,
        duration: Date.now() - startTime
      });
      
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    logger.debug({
      requestId,
      action: 'verifying_password',
      userId: user._id.toString(),
      role: user.role
    });
    
    const passwordVerifyStartTime = Date.now();
    const passwordMatch = await user.comparePassword(password);
    const passwordVerifyEndTime = Date.now();
    
    logger.debug({
      requestId,
      action: "password_verification_completed",
      userId: user._id.toString(),
      duration: passwordVerifyEndTime - passwordVerifyStartTime
    });
    
    if (!passwordMatch) {
      logger.auth({
        requestId,
        action: "login_invalid_password",
        email: email,
        userId: user._id.toString(),
        ip: requestIP,
        userAgent,
        duration: Date.now() - startTime
      });
      
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    if (user.role !== "admin" && user.role !== "moderator") {
      logger.security({
        requestId,
        action: "unauthorized_role_access",
        email: email,
        userId: user._id.toString(),
        role: user.role,
        ip: requestIP,
        userAgent,
        duration: Date.now() - startTime
      });
      
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 403 }
      );
    }
    
    // Password matches, create token and set cookie
    const tokenCreationStartTime = Date.now();
    const tokenPayload = {
      id: user._id,
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
      jti: nanoid(),
    };
    
    const token = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    
    const tokenCreationEndTime = Date.now();
    
    logger.debug({
      requestId,
      action: "token_created",
      userId: user._id.toString(),
      role: user.role,
      duration: tokenCreationEndTime - tokenCreationStartTime
    });
    
    // Set the token in a cookie
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 // 8 hours
    });
    
    logger.auth({
      requestId,
      action: "login_success",
      email: email,
      userId: user._id.toString(),
      role: user.role,
      ip: requestIP,
      userAgent,
      duration: Date.now() - startTime
    });
    
    // Return user data without password
    const userData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    
    return NextResponse.json({ 
      message: 'Login successful', 
      user: userData 
    });
    
  } catch (error) {
    logger.error({
      requestId,
      action: "login_api_error",
      error: error.message,
      stack: error.stack,
      ip: requestIP,
      userAgent,
      duration: Date.now() - startTime
    });
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 