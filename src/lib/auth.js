import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import User from '@/models/User';
import {connectToDatabase} from './db';
import { NextResponse } from 'next/server';
import { logger } from './security';

/**
 * Verify admin authentication from the admin token cookie
 */
export async function verifyAdminAuth() {
  const startTime = Date.now();
  const authId = Math.random().toString(36).substring(2, 10);
  
  try {
    logger.debug({
      authId,
      action: 'verify_admin_auth_start',
      timestamp: new Date().toISOString()
    });
    
    // Get the token from cookies
    const cookieStore = await cookies();
    const token = await cookieStore.get('admin_token');
    
    if (!token) {
      logger.security({
        authId,
        action: 'admin_auth_no_token',
        duration: Date.now() - startTime
      });
      
      return { authenticated: false, message: 'No authentication token found' };
    }
    
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    
    // Log token payload details for debugging
    logger.debug({
      authId,
      action: 'admin_token_decoded',
      userId: payload.sub,
      role: payload.role,
      exp: new Date(payload.exp * 1000).toISOString(),
      iat: new Date(payload.iat * 1000).toISOString()
    });
    
    // Check if user is admin
    if (payload.role !== 'admin') {
      logger.security({
        authId,
        action: 'admin_auth_insufficient_role',
        userId: payload.sub,
        actualRole: payload.role,
        requiredRole: 'admin',
        duration: Date.now() - startTime
      });
      
      return { authenticated: false, message: 'Insufficient permissions' };
    }
    
    logger.auth({
      authId,
      action: 'admin_auth_success',
      userId: payload.sub,
      role: payload.role,
      duration: Date.now() - startTime
    });
    
    return { 
      authenticated: true, 
      userId: payload.sub, 
      role: payload.role,
      user: {
        id: payload.sub,
        role: payload.role,
        name: payload.name || 'Admin'
      }
    };
  } catch (error) {
    logger.error({
      authId,
      action: 'admin_auth_error',
      error: error.message,
      stack: error.stack,
      duration: Date.now() - startTime
    });
    
    return { authenticated: false, message: error.message };
  }
}

/**
 * Create a JWT token for an admin user
 */
export async function createAdminToken(userId, role, name, expiry = '7d') {
  const tokenId = Math.random().toString(36).substring(2, 10);
  
  try {
    logger.debug({
      tokenId,
      action: 'admin_token_creation_start',
      userId,
      role
    });
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    const token = await new SignJWT({ role, name })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(userId)
      .setIssuedAt()
      .setExpirationTime(expiry)
      .sign(secret);
    
    logger.auth({
      tokenId,
      action: 'admin_token_created',
      userId,
      role,
      expirySet: expiry
    });
    
    return token;
  } catch (error) {
    logger.error({
      tokenId,
      action: 'admin_token_creation_error',
      userId,
      role,
      error: error.message,
      stack: error.stack
    });
    
    throw error;
  }
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUser(email, password) {
  const authId = Math.random().toString(36).substring(2, 10);
  const startTime = Date.now();
  
  try {
    logger.debug({
      authId,
      action: 'user_authentication_start',
      email: email.substring(0, 3) + '***' // Mask email for privacy
    });
    
    await connectToDatabase();
    
    const user = await User.findOne({ email });
    if (!user) {
      logger.security({
        authId,
        action: 'auth_user_not_found',
        email: email.substring(0, 3) + '***',
        duration: Date.now() - startTime
      });
      
      return { success: false, message: 'User not found' };
    }
    
    logger.debug({
      authId,
      action: 'user_found_checking_password',
      userId: user._id.toString(),
      role: user.role
    });
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.security({
        authId,
        action: 'auth_invalid_password',
        userId: user._id.toString(),
        email: email.substring(0, 3) + '***',
        duration: Date.now() - startTime
      });
      
      return { success: false, message: 'Invalid password' };
    }
    
    logger.auth({
      authId,
      action: 'user_authentication_success',
      userId: user._id.toString(),
      email: email.substring(0, 3) + '***',
      role: user.role,
      duration: Date.now() - startTime
    });
    
    return { 
      success: true, 
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  } catch (error) {
    logger.error({
      authId,
      action: 'user_authentication_error',
      error: error.message,
      stack: error.stack,
      email: email.substring(0, 3) + '***',
      duration: Date.now() - startTime
    });
    
    return { success: false, message: error.message };
  }
}

export async function verifyAuth(request) {
  try {
    const token = cookies().get('token')?.value;
    
    logger.debug({
      action: 'auth_token_check',
      hasToken: !!token
    });
    
    if (!token) {
      logger.auth({
        action: 'auth_no_token',
        url: request.url
      });
      return { isAuthenticated: false, error: 'No token found' };
    }

    // Verify the token
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      
      const user = verified.payload;
      
      logger.auth({
        action: 'auth_token_verified',
        userId: user.id,
        role: user.role,
        exp: new Date(user.exp * 1000).toISOString()
      });
      
      return { isAuthenticated: true, user };
    } catch (error) {
      logger.security({
        action: 'auth_invalid_token',
        error: error.message,
        url: request.url
      });
      return { isAuthenticated: false, error: 'Invalid token' };
    }
  } catch (error) {
    logger.error({
      action: 'auth_verification_error',
      error: error.message,
      stack: error.stack,
      url: request.url
    });
    return { isAuthenticated: false, error: 'Authentication error' };
  }
}

export function requireAuth(handler) {
  return async (request, context) => {
    logger.debug({
      action: 'auth_middleware_start',
      url: request.url,
      method: request.method
    });
    
    const { isAuthenticated, user, error } = await verifyAuth(request);
    
    if (!isAuthenticated) {
      logger.security({
        action: 'auth_access_denied',
        reason: error,
        url: request.url,
        method: request.method
      });
      
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    // Add user info to the request for handlers to use
    request.user = user;
    
    logger.auth({
      action: 'auth_access_granted',
      userId: user.id,
      role: user.role,
      url: request.url,
      method: request.method
    });
    
    return handler(request, context);
  };
}

export function requireRole(roles, handler) {
  return requireAuth(async (request, context) => {
    const user = request.user;
    
    logger.debug({
      action: 'role_check',
      userRole: user.role,
      requiredRoles: roles,
      url: request.url
    });
    
    if (!roles.includes(user.role)) {
      logger.security({
        action: 'role_access_denied',
        userId: user.id,
        userRole: user.role,
        requiredRoles: roles,
        url: request.url,
        method: request.method
      });
      
      return NextResponse.json(
        { message: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }
    
    logger.auth({
      action: 'role_access_granted',
      userId: user.id,
      role: user.role,
      url: request.url
    });
    
    return handler(request, context);
  });
}

export function generateToken(user) {
  try {
    // Implementation details...
    logger.debug({
      action: 'token_generation',
      userId: user.id,
      role: user.role
    });
    
    // Return the token...
  } catch (error) {
    logger.error({
      action: 'token_generation_error',
      userId: user.id,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
} 