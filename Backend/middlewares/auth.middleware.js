// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// Rate limiting store (in production, use Redis)
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Helper function to clean up expired attempts
const cleanupAttempts = () => {
  const now = Date.now();
  for (const [key, data] of loginAttempts.entries()) {
    if (now - data.lastAttempt > LOCKOUT_TIME) {
      loginAttempts.delete(key);
    }
  }
};

// Rate limiting middleware for login attempts
const rateLimitLogin = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  cleanupAttempts();
  
  const attempts = loginAttempts.get(clientIP);
  
  if (attempts) {
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      const timeLeft = LOCKOUT_TIME - (now - attempts.lastAttempt);
      if (timeLeft > 0) {
        res.status(429);
        throw new Error(`Too many login attempts. Please try again in ${Math.ceil(timeLeft / 60000)} minutes`);
      } else {
        // Reset attempts after lockout period
        loginAttempts.delete(clientIP);
      }
    }
  }
  
  next();
};

// Record failed login attempt
const recordFailedLogin = (req) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  const attempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: now };
  attempts.count += 1;
  attempts.lastAttempt = now;
  
  loginAttempts.set(clientIP, attempts);
};

// Clear login attempts on successful login
const clearLoginAttempts = (req) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  loginAttempts.delete(clientIP);
};

// Enhanced token verification middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check for token in cookies (primary method)
  token = req.cookies.jwt;
  
  // Fallback: Check Authorization header
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Access denied - Authentication required for Cornells exclusive experience");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    
    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('-password')
      .lean();

    if (!user) {
      res.status(401);
      throw new Error("Access denied - User account not found");
    }

    // Check if user account is active
    if (user.isActive === false) {
      res.status(401);
      throw new Error("Access denied - Account has been deactivated");
    }

    // Check if account is locked
    if (user.accountLocked && user.lockUntil && new Date() < user.lockUntil) {
      res.status(423);
      throw new Error("Account temporarily locked due to security concerns");
    }

    // Attach user to request object
    req.user = user;
    
    // Update user's last activity (optional, for analytics)
    if (req.path !== '/api/v1/auth/verify') {
      // Avoid updating on token verification requests to reduce DB calls
      User.findByIdAndUpdate(user._id, { 
        lastActivity: new Date() 
      }).exec().catch(err => console.warn('Failed to update last activity:', err.message));
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      res.status(401);
      throw new Error("Session expired - Please login again to continue your Cornells experience");
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401);
      throw new Error("Invalid authentication token - Please login again");
    } else if (error.name === 'NotBeforeError') {
      res.status(401);
      throw new Error("Token not active yet - Please try again later");
    }
    
    res.status(401);
    throw new Error("Authentication failed - Please login to access Cornells exclusive features");
  }
});

// Admin authorization middleware
const requireAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Authentication required");
  }

  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Administrator privileges required for this exclusive action");
  }

  next();
});

// Optional authentication middleware (doesn't throw error if no token)
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      const user = await User.findById(decoded.userId)
        .select('-password')
        .lean();

      if (user && user.isActive !== false) {
        req.user = user;
      }
    } catch (error) {
      // Silently fail for optional auth
      console.warn('Optional auth failed:', error.message);
    }
  }

  next();
});

// Role-based access control middleware
const requireRole = (roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Authentication required");
    }

    const userRole = req.user.role || 'user';
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      res.status(403);
      throw new Error(`Access denied - Requires one of the following roles: ${allowedRoles.join(', ')}`);
    }

    next();
  });
};

// Account verification middleware
const requireVerifiedAccount = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Authentication required");
  }

  if (req.user.emailVerified === false) {
    res.status(403);
    throw new Error("Please verify your email address to access this feature");
  }

  next();
});

// Check if user owns resource middleware
const checkResourceOwnership = (resourceType) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Authentication required");
    }

    // Admin can access all resources
    if (req.user.role === 'admin') {
      return next();
    }

    const resourceId = req.params.id;
    let resource;

    try {
      switch (resourceType) {
        case 'user':
          if (req.user._id.toString() !== resourceId) {
            res.status(403);
            throw new Error("Access denied - You can only access your own profile");
          }
          break;
        case 'order':
          const Order = (await import('../models/order.model.js')).default;
          resource = await Order.findById(resourceId).select('userId');
          if (!resource || resource.userId.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Access denied - You can only access your own orders");
          }
          break;
        case 'cart':
          const Cart = (await import('../models/cart.model.js')).default;
          resource = await Cart.findById(resourceId).select('userId');
          if (!resource || resource.userId.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error("Access denied - You can only access your own cart");
          }
          break;
        default:
          res.status(400);
          throw new Error("Invalid resource type");
      }

      next();
    } catch (error) {
      throw error;
    }
  });
};

// Security headers middleware
const setSecurityHeaders = (req, res, next) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
};

// API key middleware (for external integrations)
const requireApiKey = asyncHandler(async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    res.status(401);
    throw new Error("API key required");
  }

  // In production, store API keys in database with proper hashing
  const validApiKeys = process.env.API_KEYS?.split(',') || [];
  
  if (!validApiKeys.includes(apiKey)) {
    res.status(401);
    throw new Error("Invalid API key");
  }

  // Log API usage
  console.log(`API accessed with key: ${apiKey.substring(0, 8)}...`);
  
  next();
});

export { 
  protect, 
  requireAdmin,
  optionalAuth,
  requireRole,
  requireVerifiedAccount,
  checkResourceOwnership,
  rateLimitLogin,
  recordFailedLogin,
  clearLoginAttempts,
  setSecurityHeaders,
  requireApiKey
};