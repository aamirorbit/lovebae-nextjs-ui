import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logger } from '@/lib/security';

export async function GET(request) {
  const requestId = Math.random().toString(36).substring(2, 10);
  const requestIP = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    logger.auth({
      requestId,
      action: 'admin_logout_requested',
      ip: requestIP,
      userAgent,
      timestamp: new Date().toISOString()
    });

    // Create the response first
    const response = NextResponse.redirect(new URL('/login/admin', request.url));
    
    // Clear the admin token cookie in the response
    response.cookies.delete('admin_token');
    
    logger.auth({
      requestId,
      action: 'admin_logout_success',
      ip: requestIP,
      userAgent
    });
    
    return response;
  } catch (error) {
    logger.error({
      requestId,
      action: 'admin_logout_error',
      error: error.message,
      stack: error.stack,
      ip: requestIP,
      userAgent
    });
    
    const response = NextResponse.redirect(new URL('/login/admin', request.url));
    response.cookies.delete('admin_token');
    return response;
  }
}

// Add POST endpoint for programmatic logout (API calls)
export async function POST(request) {
  const requestId = Math.random().toString(36).substring(2, 10);
  const requestIP = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    logger.auth({
      requestId,
      action: 'admin_logout_api_requested',
      ip: requestIP,
      userAgent,
      timestamp: new Date().toISOString()
    });

    // Create the response
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
    
    // Clear the admin token cookie in the response
    response.cookies.delete('admin_token');
    
    logger.auth({
      requestId,
      action: 'admin_logout_api_success',
      ip: requestIP,
      userAgent
    });
    
    return response;
  } catch (error) {
    logger.error({
      requestId,
      action: 'admin_logout_api_error',
      error: error.message,
      stack: error.stack,
      ip: requestIP,
      userAgent
    });
    
    const response = NextResponse.json(
      { success: false, message: 'Error during logout' },
      { status: 500 }
    );
    response.cookies.delete('admin_token');
    return response;
  }
} 