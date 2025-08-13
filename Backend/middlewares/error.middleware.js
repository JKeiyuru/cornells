// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/middlewares/error.middleware.js
import dotenv from "dotenv";
dotenv.config();

// Custom error class for operational errors
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Development error response
const sendErrorDev = (err, req, res) => {
  console.error('ERROR 💥', err);

  return res.status(err.statusCode || 500).json({
    success: false,
    error: {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
      ...(req.originalUrl && { path: req.originalUrl }),
      ...(req.method && { method: req.method }),
      timestamp: new Date().toISOString()
    }
  });
};

// Production error response
const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error('ERROR 💥', err);
  
  return res.status(500).json({
    success: false,
    message: 'Something went wrong with your Cornells experience. Please try again.',
    timestamp: new Date().toISOString()
  });
};

// Handle MongoDB CastError
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handle MongoDB duplicate field error
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field === 'email' ? 'Email address' : field} '${value}' already exists. Please use another value.`;
  return new AppError(message, 409);
};

// Handle MongoDB validation error
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle JWT invalid token error
const handleJWTError = () =>
  new AppError('Invalid authentication token. Please log in again.', 401);

// Handle JWT expired token error
const handleJWTExpiredError = () =>
  new AppError('Your session has expired. Please log in again.', 401);

// Handle rate limiting errors
const handleRateLimitError = () =>
  new AppError('Too many requests from this IP. Please try again later.', 429);

// Handle file upload errors
const handleMulterError = (err) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return new AppError('File size too large. Maximum size allowed is 5MB.', 400);
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return new AppError('Too many files or unexpected field name.', 400);
  }
  return new AppError('File upload error. Please try again.', 400);
};

// Handle network/connection errors
const handleNetworkError = (err) => {
  if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
    return new AppError('Service temporarily unavailable. Please try again later.', 503);
  }
  if (err.code === 'ETIMEDOUT') {
    return new AppError('Request timeout. Please try again.', 408);
  }
  return new AppError('Network error occurred. Please check your connection.', 503);
};

// Not Found middleware - handles undefined routes
const notFound = (req, res, next) => {
  const message = `The requested resource ${req.originalUrl} was not found on our Cornells server`;
  const error = new AppError(message, 404);
  next(error);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode;

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Handler:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  }

  // Handle specific error types
  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (err.type === 'entity.too.large') {
    error = new AppError('Request entity too large', 413);
  }
  if (err.code && ['ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'].includes(err.code)) {
    error = handleNetworkError(err);
  }
  if (err.code && err.code.startsWith('LIMIT_')) {
    error = handleMulterError(err);
  }

  // Handle async errors
  if (!error.isOperational && error.message.includes('async')) {
    error = new AppError('An unexpected error occurred. Please try again.', 500);
  }

  // Set default values
  if (!error.statusCode) error.statusCode = 500;
  if (!error.isOperational) error.isOperational = false;

  // Send appropriate error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};

// Async error wrapper utility
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Validation error formatter
const formatValidationErrors = (errors) => {
  return errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

// Security error logger
const logSecurityEvent = (req, eventType, details = {}) => {
  const logData = {
    timestamp: new Date().toISOString(),
    eventType,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    url: req.originalUrl,
    method: req.method,
    userId: req.user?._id || 'anonymous',
    ...details
  };

  // In production, send to security monitoring service
  if (process.env.NODE_ENV === 'production') {
    console.warn('SECURITY EVENT:', logData);
    // Send to monitoring service like Sentry, LogRocket, etc.
  } else {
    console.warn('Security Event:', logData);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Give server time to finish current requests
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Graceful shutdown handler
const gracefulShutdown = (server) => {
  return (signal) => {
    console.log(`Received ${signal}. Graceful shutdown initiated...`);
    
    server.close((err) => {
      if (err) {
        console.error('Error during graceful shutdown:', err);
        process.exit(1);
      }
      
      console.log('Server closed successfully. Process terminating...');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };
};

export { 
  notFound, 
  errorHandler, 
  AppError, 
  catchAsync, 
  formatValidationErrors,
  logSecurityEvent,
  gracefulShutdown
};