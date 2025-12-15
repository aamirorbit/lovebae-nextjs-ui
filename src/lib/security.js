import { z } from 'zod';
import { isURL } from 'validator';
import { sanitize } from 'mongo-sanitize';

// Password policy configuration
export const passwordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  validate: (password) => {
    const errors = [];
    if (password.length < 12) errors.push('Password must be at least 12 characters long');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain at least one special character');
    return errors;
  }
};

// Input validation schemas
const schemas = {
  waitlist: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15),
    service: z.string().min(2).max(100)
  }),
  foundingHealer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    yearsOfExperience: z.number().min(0),
    background: z.string().min(2).max(100),
    otherBackground: z.string().max(500).optional(),
    reference: z.string().max(200).optional()
  }),
  soulAmbassador: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    university: z.string().min(2).max(100),
    semester: z.string().min(2).max(100),
    background: z.string().min(2).max(100)
  })
};

// Input validation function
export function validateInput(data, schemaName) {
  try {
    const schema = schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} not found`);
    }
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        }
      };
    }
    throw error;
  }
}

// Input sanitization function
export function sanitizeInput(data) {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Remove HTML tags and trim whitespace
      sanitized[key] = value.replace(/<[^>]*>/g, '').trim();
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

// Logger configuration
const formatData = (data) => {
  if (typeof data === 'string') {
    return { message: data };
  }
  return data;
};

const getRequestInfo = () => {
  if (typeof window !== 'undefined') {
    return {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }
  return { timestamp: new Date().toISOString() };
};

// Enhanced logger that works in both client and server environments
const logger = {
  debug: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'debug',
      ...getRequestInfo(),
      ...logData
    };
    console.debug(JSON.stringify(logObject));
  },
  info: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'info',
      ...getRequestInfo(),
      ...logData
    };
    console.log(JSON.stringify(logObject));
  },
  warn: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'warn',
      ...getRequestInfo(),
      ...logData
    };
    console.warn(JSON.stringify(logObject));
  },
  error: (data) => {
    const logData = formatData(data);
    // Capture stack trace if it's an error object
    const errorInfo = data instanceof Error ? {
      stack: data.stack,
      name: data.name
    } : {};
    
    const logObject = {
      level: 'error',
      ...getRequestInfo(),
      ...logData,
      ...errorInfo
    };
    console.error(JSON.stringify(logObject));
  },
  auth: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'auth',
      ...getRequestInfo(),
      ...logData
    };
    console.log(JSON.stringify(logObject));
  },
  security: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'security',
      ...getRequestInfo(),
      ...logData
    };
    console.warn(JSON.stringify(logObject));
  },
  // Add request logging specifically for middleware
  request: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'request',
      ...getRequestInfo(),
      ...logData
    };
    console.log(JSON.stringify(logObject));
  },
  // Add performance logging
  performance: (data) => {
    const logData = formatData(data);
    const logObject = {
      level: 'performance',
      ...getRequestInfo(),
      ...logData
    };
    console.log(JSON.stringify(logObject));
  }
};

// Helper to clear auth data on the client side
const clearAuthData = async () => {
  if (typeof window !== 'undefined') {
    try {
      // Clear any cached auth data
      try {
        // Safely check if sessionStorage is available
        if (window.sessionStorage && typeof window.sessionStorage.removeItem === 'function') {
          window.sessionStorage.removeItem('adminAuth');
          window.sessionStorage.removeItem('userData');
        }
      } catch (e) {
        logger.warn({
          action: 'clear_auth_data_error',
          source: 'sessionStorage',
          error: e.message
        });
      }
      
      try {
        // Safely check if localStorage is available
        if (window.localStorage && typeof window.localStorage.removeItem === 'function') {
          window.localStorage.removeItem('adminAuth');
          window.localStorage.removeItem('userData');
        }
      } catch (e) {
        logger.warn({
          action: 'clear_auth_data_error',
          source: 'localStorage',
          error: e.message
        });
      }
      
      // Call logout endpoint to clear cookies
      await fetch('/api/admin/logout', {
        method: 'GET',
        credentials: 'include',
      });
      
      return true;
    } catch (e) {
      logger.error({
        action: 'clear_auth_data_failed',
        error: e.message
      });
      return false;
    }
  }
  return false;
};

export { logger, clearAuthData };

// Security utilities
export const securityUtils = {
  sanitizeInput: (input) => sanitize(input),
  validateUrl: (url) => isURL(url, { require_protocol: true }),
  generateToken: () => {
    return crypto.randomBytes(32).toString('hex');
  },
  hashPassword: (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }
};

// CORS configuration
export const corsConfig = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // 10 minutes
};

// Session configuration
export const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs (increased from 100)
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false
}; 