// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/utils/response.js
import dotenv from "dotenv";
dotenv.config();

// Standard response structure for Cornells API
class ApiResponse {
  constructor(success, data = null, message = null, statusCode = 200, metadata = null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = new Date().toISOString();
    
    if (data !== null) {
      this.data = data;
    }
    
    if (metadata !== null) {
      this.metadata = metadata;
    }
    
    // Add request ID for tracing in production
    if (process.env.NODE_ENV === 'production') {
      this.requestId = this.generateRequestId();
    }
  }
  
  generateRequestId() {
    return `cor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Success response helper
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200, metadata = null) => {
  const response = new ApiResponse(true, data, message, statusCode, metadata);
  return res.status(statusCode).json(response);
};

// Error response helper
const sendError = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = new ApiResponse(false, null, message, statusCode);
  
  if (errors && process.env.NODE_ENV === 'development') {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

// Validation error response
const sendValidationError = (res, errors, message = 'Validation failed') => {
  const response = new ApiResponse(false, null, message, 400);
  response.validationErrors = errors;
  return res.status(400).json(response);
};

// Not found response
const sendNotFound = (res, resource = 'Resource', message = null) => {
  const defaultMessage = `${resource} not found in our exclusive Cornells collection`;
  return sendError(res, message || defaultMessage, 404);
};

// Unauthorized response
const sendUnauthorized = (res, message = 'Authentication required for Cornells exclusive access') => {
  return sendError(res, message, 401);
};

// Forbidden response
const sendForbidden = (res, message = 'Access denied to this exclusive Cornells feature') => {
  return sendError(res, message, 403);
};

// Conflict response
const sendConflict = (res, message = 'Resource already exists') => {
  return sendError(res, message, 409);
};

// Too Many Requests response
const sendTooManyRequests = (res, message = 'Too many requests. Please try again later.', retryAfter = 3600) => {
  res.set('Retry-After', retryAfter);
  return sendError(res, message, 429);
};

// Server error response
const sendServerError = (res, message = 'Internal server error occurred') => {
  return sendError(res, message, 500);
};

// Created response
const sendCreated = (res, data, message = 'Resource created successfully') => {
  return sendSuccess(res, data, message, 201);
};

// No content response
const sendNoContent = (res, message = 'Operation completed successfully') => {
  return res.status(204).json({
    success: true,
    message,
    timestamp: new Date().toISOString()
  });
};

// Paginated response
const sendPaginatedResponse = (res, data, pagination, message = 'Data retrieved successfully') => {
  const metadata = {
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
      nextPage: pagination.hasNextPage ? pagination.currentPage + 1 : null,
      prevPage: pagination.hasPrevPage ? pagination.currentPage - 1 : null
    }
  };
  
  return sendSuccess(res, data, message, 200, metadata);
};

// Search response with metadata
const sendSearchResponse = (res, data, searchMetadata, message = 'Search completed successfully') => {
  const metadata = {
    search: {
      query: searchMetadata.query,
      totalResults: searchMetadata.totalResults,
      searchTime: searchMetadata.searchTime,
      filters: searchMetadata.filters || {},
      suggestions: searchMetadata.suggestions || []
    }
  };
  
  if (searchMetadata.pagination) {
    metadata.pagination = searchMetadata.pagination;
  }
  
  return sendSuccess(res, data, message, 200, metadata);
};

// Health check response
const sendHealthCheck = (res, healthData) => {
  const metadata = {
    health: {
      status: healthData.status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.APP_VERSION || '1.0.0',
      services: healthData.services || {}
    }
  };
  
  const statusCode = healthData.status === 'healthy' ? 200 : 503;
  const message = healthData.status === 'healthy' 
    ? 'Cornells services are running smoothly' 
    : 'Some Cornells services are experiencing issues';
    
  return sendSuccess(res, null, message, statusCode, metadata);
};

// Upload response
const sendUploadResponse = (res, files, message = 'Files uploaded successfully') => {
  const fileData = Array.isArray(files) ? files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    url: file.url || `/uploads/${file.filename}`
  })) : {
    filename: files.filename,
    originalName: files.originalname,
    size: files.size,
    mimetype: files.mimetype,
    url: files.url || `/uploads/${files.filename}`
  };
  
  return sendSuccess(res, { files: fileData }, message, 201);
};

// Analytics response
const sendAnalyticsResponse = (res, analyticsData, timeRange, message = 'Analytics data retrieved') => {
  const metadata = {
    analytics: {
      timeRange: timeRange,
      generatedAt: new Date().toISOString(),
      dataPoints: Array.isArray(analyticsData) ? analyticsData.length : Object.keys(analyticsData).length
    }
  };
  
  return sendSuccess(res, analyticsData, message, 200, metadata);
};

// Batch operation response
const sendBatchResponse = (res, results, message = 'Batch operation completed') => {
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  const metadata = {
    batch: {
      total: results.length,
      successful,
      failed,
      successRate: ((successful / results.length) * 100).toFixed(1) + '%'
    }
  };
  
  const statusCode = failed === 0 ? 200 : 207; // 207 Multi-Status for partial success
  return sendSuccess(res, results, message, statusCode, metadata);
};

// Cache response wrapper
const sendCachedResponse = (res, data, cacheInfo, message = 'Data retrieved from cache') => {
  const metadata = {
    cache: {
      hit: true,
      cachedAt: cacheInfo.cachedAt,
      expiresAt: cacheInfo.expiresAt,
      ttl: cacheInfo.ttl
    }
  };
  
  res.set('X-Cache', 'HIT');
  res.set('Cache-Control', `max-age=${cacheInfo.ttl}`);
  
  return sendSuccess(res, data, message, 200, metadata);
};

// Rate limited response with retry info
const sendRateLimitedResponse = (res, limit, remaining, resetTime, message = null) => {
  const defaultMessage = `Rate limit exceeded. ${remaining} requests remaining.`;
  
  res.set({
    'X-RateLimit-Limit': limit,
    'X-RateLimit-Remaining': remaining,
    'X-RateLimit-Reset': resetTime,
    'Retry-After': Math.ceil((resetTime - Date.now()) / 1000)
  });
  
  return sendError(res, message || defaultMessage, 429);
};

// Maintenance mode response
const sendMaintenanceResponse = (res, maintenanceInfo) => {
  const message = maintenanceInfo.message || 'Cornells is currently under maintenance. We\'ll be back soon!';
  const metadata = {
    maintenance: {
      scheduledEnd: maintenanceInfo.scheduledEnd,
      reason: maintenanceInfo.reason,
      affectedServices: maintenanceInfo.affectedServices || []
    }
  };
  
  res.set('Retry-After', maintenanceInfo.retryAfter || 3600);
  return sendError(res, message, 503);
};

// API version mismatch response
const sendVersionMismatchResponse = (res, requestedVersion, currentVersion) => {
  const message = `API version ${requestedVersion} is not supported. Current version is ${currentVersion}.`;
  const metadata = {
    version: {
      requested: requestedVersion,
      current: currentVersion,
      supported: ['v1', 'v2'] // Update based on your supported versions
    }
  };
  
  return sendError(res, message, 400);
};

// Export response with download headers
const sendExportResponse = (res, data, filename, format = 'json') => {
  const contentTypes = {
    json: 'application/json',
    csv: 'text/csv',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf'
  };
  
  const fileExtensions = {
    json: 'json',
    csv: 'csv',
    xlsx: 'xlsx',
    pdf: 'pdf'
  };
  
  const timestamp = new Date().toISOString().split('T')[0];
  const fullFilename = `${filename}_${timestamp}.${fileExtensions[format]}`;
  
  res.set({
    'Content-Type': contentTypes[format],
    'Content-Disposition': `attachment; filename="${fullFilename}"`,
    'X-Export-Format': format,
    'X-Export-Generated': new Date().toISOString()
  });
  
  if (format === 'json') {
    return res.status(200).json(data);
  } else {
    return res.status(200).send(data);
  }
};

// Webhook response
const sendWebhookResponse = (res, success = true, message = 'Webhook received') => {
  const statusCode = success ? 200 : 400;
  return res.status(statusCode).json({
    success,
    message,
    timestamp: new Date().toISOString(),
    processed: success
  });
};

// Debug response (development only)
const sendDebugResponse = (res, debugData, message = 'Debug information') => {
  if (process.env.NODE_ENV !== 'development') {
    return sendForbidden(res, 'Debug information is not available in production');
  }
  
  const metadata = {
    debug: {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      requestId: debugData.requestId,
      executionTime: debugData.executionTime,
      memoryUsage: process.memoryUsage(),
      queries: debugData.queries || []
    }
  };
  
  return sendSuccess(res, debugData.data, message, 200, metadata);
};

// API documentation response
const sendApiDocsResponse = (res, endpoints) => {
  const metadata = {
    api: {
      version: '1.0.0',
      baseUrl: `${req.protocol}://${req.get('host')}/api/v1`,
      documentation: 'https://docs.cornells.com/api',
      supportContact: 'api@cornells.com'
    }
  };
  
  return sendSuccess(res, { endpoints }, 'API documentation retrieved', 200, metadata);
};

// Custom response builder
class ResponseBuilder {
  constructor(res) {
    this.res = res;
    this.statusCode = 200;
    this.data = null;
    this.message = null;
    this.metadata = {};
    this.headers = {};
  }
  
  status(code) {
    this.statusCode = code;
    return this;
  }
  
  data(data) {
    this.data = data;
    return this;
  }
  
  message(message) {
    this.message = message;
    return this;
  }
  
  meta(key, value) {
    this.metadata[key] = value;
    return this;
  }
  
  header(key, value) {
    this.headers[key] = value;
    return this;
  }
  
  send() {
    // Set custom headers
    Object.entries(this.headers).forEach(([key, value]) => {
      this.res.set(key, value);
    });
    
    const response = new ApiResponse(
      this.statusCode < 400,
      this.data,
      this.message,
      this.statusCode,
      Object.keys(this.metadata).length > 0 ? this.metadata : null
    );
    
    return this.res.status(this.statusCode).json(response);
  }
}

// Create response builder
const createResponse = (res) => {
  return new ResponseBuilder(res);
};

// Response timing middleware
const responseTime = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    res.set('X-Response-Time', `${duration}ms`);
    
    // Log slow responses
    if (duration > 1000) {
      console.warn(`Slow response: ${req.method} ${req.originalUrl} took ${duration}ms`);
    }
  });
  
  next();
};

// Response compression helper
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  
  // Only compress JSON responses larger than 1KB
  const contentType = res.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const contentLength = res.get('content-length');
    return !contentLength || parseInt(contentLength) > 1024;
  }
  
  return false;
};

export {
  ApiResponse,
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  sendConflict,
  sendTooManyRequests,
  sendServerError,
  sendCreated,
  sendNoContent,
  sendPaginatedResponse,
  sendSearchResponse,
  sendHealthCheck,
  sendUploadResponse,
  sendAnalyticsResponse,
  sendBatchResponse,
  sendCachedResponse,
  sendRateLimitedResponse,
  sendMaintenanceResponse,
  sendVersionMismatchResponse,
  sendExportResponse,
  sendWebhookResponse,
  sendDebugResponse,
  sendApiDocsResponse,
  createResponse,
  ResponseBuilder,
  responseTime,
  shouldCompress
};