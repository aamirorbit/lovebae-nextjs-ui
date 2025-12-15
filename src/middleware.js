import { NextResponse } from 'next/server';
import { logger, rateLimitConfig, corsConfig } from '@/lib/security';

// Simple in-memory rate limiter
class RateLimiter {
  constructor(max, windowMs) {
    this.max = max;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  limit(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Clean up old entries
    for (const [k, v] of this.requests.entries()) {
      if (v.timestamp < windowStart) {
        this.requests.delete(k);
      }
    }

    // Get or create request count for this key
    const request = this.requests.get(key) || { count: 0, timestamp: now };
    request.count++;
    this.requests.set(key, request);

    const remaining = Math.max(0, this.max - request.count);
    const reset = now + this.windowMs;
    const success = request.count <= this.max;

    return {
      success,
      limit: this.max,
      remaining,
      reset
    };
  }
}

// Initialize rate limiter
const ratelimit = new RateLimiter(
  rateLimitConfig.max,
  rateLimitConfig.windowMs
);

// API routes that should be protected - for logging purposes only
const protectedApiRoutes = [
  '/api/admin',
  '/api/waitlist',
  '/api/soul-ambassadors',
  '/api/founding-healers'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 10);
  
  // Extract more request details for enhanced logging
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';
  const contentType = request.headers.get('content-type') || 'none';
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  const host = request.headers.get('host') || 'unknown';
  
  // Log incoming request with more details
  logger.request({
    requestId,
    method: request.method,
    path: pathname,
    ip: request.ip || '127.0.0.1',
    userAgent,
    referer,
    contentType,
    host,
    acceptLanguage,
    query: Object.fromEntries(request.nextUrl.searchParams),
    timestamp: new Date().toISOString()
  });

  // Apply rate limiting
  const ip = request.ip ?? '127.0.0.1';
  
  // Skip rate limiting in development environment for testing
  const isDev = process.env.NODE_ENV === 'development';
  
  // Skip rate limiting for admin routes and in development
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  
  // Apply special rate limits or skip based on route type
  let rateLimit;
  if (isDev) {
    // Skip rate limiting in development
    rateLimit = { success: true, limit: rateLimitConfig.max, remaining: rateLimitConfig.max, reset: Date.now() + rateLimitConfig.windowMs };
    
    logger.debug({
      requestId,
      action: 'rate_limit_skipped',
      reason: 'development_environment',
      ip
    });
  } else if (isAdminRoute) {
    // More generous rate limiting for admin routes
    const adminRateLimiter = new RateLimiter(
      rateLimitConfig.max * 3, // 3x the normal limit for admin routes
      rateLimitConfig.windowMs
    );
    rateLimit = adminRateLimiter.limit(`admin-${ip}`);
    
    logger.debug({
      requestId,
      action: 'admin_rate_limit_applied',
      ip,
      limit: rateLimitConfig.max * 3,
      remaining: rateLimit.remaining
    });
  } else {
    // Standard rate limiting for public routes
    rateLimit = ratelimit.limit(ip);
    
    logger.debug({
      requestId,
      action: 'standard_rate_limit_applied',
      ip,
      limit: rateLimitConfig.max,
      remaining: rateLimit.remaining
    });
  }
  
  const { success, limit, reset, remaining } = rateLimit;
  
  if (!success) {
    logger.security({
      requestId,
      action: 'rate_limit_exceeded',
      ip,
      path: pathname,
      userAgent,
      method: request.method,
      remaining: 0,
      nextAllowedRequest: new Date(reset).toISOString()
    });
    
    const response = new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: Math.ceil((reset - Date.now()) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Content-Type': 'application/json'
        }
      }
    );
    
    const endTime = Date.now();
    logger.performance({
      requestId,
      action: 'request_blocked',
      path: pathname,
      duration: endTime - startTime,
      status: 429
    });
    
    return response;
  }

  // Enhanced logging for protected API routes
  const isProtectedApi = protectedApiRoutes.some(path => pathname.startsWith(path));
  if (isProtectedApi) {
    logger.security({
      requestId,
      action: 'protected_api_access',
      path: pathname,
      ip,
      userAgent,
      method: request.method,
      timestamp: new Date().toISOString()
    });
  }

  // Apply CORS headers
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', corsConfig.origin.join(','));
  response.headers.set('Access-Control-Allow-Methods', corsConfig.methods.join(','));
  response.headers.set('Access-Control-Allow-Headers', corsConfig.allowedHeaders.join(','));
  response.headers.set('Access-Control-Expose-Headers', corsConfig.exposedHeaders.join(','));
  response.headers.set('Access-Control-Max-Age', corsConfig.maxAge.toString());
  
  if (corsConfig.credentials) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  // Add tracking headers for debugging (only in dev mode)
  if (isDev) {
    response.headers.set('X-Request-ID', requestId);
    response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
  }
  
  const endTime = Date.now();
  logger.performance({
    requestId,
    action: 'request_completed',
    path: pathname,
    method: request.method,
    ip,
    duration: endTime - startTime,
    status: 200
  });

  return response;
}

// Configure the paths that should be matched by this middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/waitlist',
    '/api/soul-ambassadors',
    '/api/founding-healers'
  ]
}; 