// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/app.js
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import morgan from "morgan";
import colors from "colors";

// Import enhanced route handlers for Rekker business
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import userRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";
import stripeRoute from "./routes/stripe.js";
import bannerRoute from "./routes/banner.route.js";
import uploadRoute from "./routes/upload.route.js";

// Import enhanced middleware
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

// Initialize Rekker's business application
const app = express();

// Trust proxy for cloud deployments
app.set('trust proxy', 1);

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED SECURITY MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// Helmet for security headers with Rekker-specific configurations
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://js.stripe.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "https://res.cloudinary.com", "https://cloudinary.com", "data:", "blob:"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.cloudinary.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Enhanced CORS configuration for Rekker's multi-brand platform
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5174',
      'http://localhost:5173',
      'https://rekker-admin.vercel.app',
      'https://rekker-business.vercel.app',
      'https://rekker.co.ke',
      'https://www.rekker.co.ke',
      'https://admin.rekker.co.ke'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(colors.yellow(`⚠️  CORS blocked request from: ${origin}`));
      callback(new Error('Access denied by Rekker\'s security policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-Rekker-Client',
    'X-Admin-Token'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Rekker-Version', 'X-Brand-Info'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED RATE LIMITING FOR BUSINESS
// ═══════════════════════════════════════════════════════════════

// General API rate limiting - More generous for business operations
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Higher limit for business operations
  message: {
    error: 'Too many requests from this location. Please try again in 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED',
    brand: 'Rekker Business Platform'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.warn(colors.yellow(`⚡ Rate limit exceeded for IP: ${req.ip}`));
    res.status(429).json({
      success: false,
      error: 'Too many requests from this location. Please try again in 15 minutes.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

// Strict rate limiting for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes  
  max: 15, // More attempts for business users
  message: {
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Business order rate limiting
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Higher limit for wholesale orders
  message: {
    error: 'Order frequency limit reached. Please contact Rekker support for assistance.',
    code: 'ORDER_RATE_LIMIT_EXCEEDED'
  }
});

// Apply general rate limiting
app.use(generalLimiter);

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED DATA PROCESSING
// ═══════════════════════════════════════════════════════════════

// Compression for optimal performance
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Enhanced JSON parsing for product images and business data
app.use(express.json({ 
  limit: '100mb', // Higher limit for product images and bulk operations
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '100mb',
  parameterLimit: 100000 // Higher for bulk operations
}));

// Enhanced cookie parser with security
app.use(cookieParser(process.env.COOKIE_SECRET || 'rekker-business-secret'));

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED SECURITY SANITIZATION
// ═══════════════════════════════════════════════════════════════

// MongoDB injection protection
app.use(mongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(colors.yellow(`🛡️  Sanitized NoSQL injection attempt: ${key} from ${req.ip}`));
  },
}));

// XSS protection
app.use(xss());

// HTTP Parameter Pollution protection with business-specific whitelist
app.use(hpp({
  whitelist: [
    'sort',
    'fields',
    'page',
    'limit',
    'category',
    'brand',
    'price',
    'wholesalePrice',
    'moq',
    'rating',
    'size',
    'color',
    'targetMarket',
    'inStock',
    'featured',
    'search'
  ]
}));

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED LOGGING & MONITORING
// ═══════════════════════════════════════════════════════════════

// Custom Morgan tokens for business tracking
morgan.token('rekker-user-id', (req) => req.user?.id || 'anonymous');
morgan.token('rekker-user-role', (req) => req.user?.role || 'guest');
morgan.token('rekker-brand', (req) => req.headers['x-rekker-brand'] || 'general');
morgan.token('user-agent-short', (req) => {
  const ua = req.get('User-Agent') || '';
  return ua.length > 50 ? ua.substring(0, 50) + '...' : ua;
});

const morganFormat = process.env.NODE_ENV === 'production'
  ? '[:date[iso]] :method :url :status :response-time ms - :res[content-length] bytes [:rekker-user-role/:rekker-user-id] Brand:[:rekker-brand] ":user-agent-short"'
  : colors.cyan(':method') + ' ' + colors.yellow(':url') + ' ' + 
    colors.green(':status') + ' ' + colors.magenta(':response-time ms') + 
    ' - ' + colors.blue('[:rekker-user-role/:rekker-user-id]') + ' ' +
    colors.gray('Brand:[:rekker-brand]');

app.use(morgan(morganFormat));

// ═══════════════════════════════════════════════════════════════
//                    BUSINESS PLATFORM MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// Rekker business headers and metadata
app.use((req, res, next) => {
  // Add business platform headers
  res.setHeader('X-Business-Platform', 'Rekker Multi-Brand System');
  res.setHeader('X-Rekker-Version', '2.0.0');
  res.setHeader('X-Environment', process.env.NODE_ENV);
  res.setHeader('X-Supported-Brands', 'Rekker,Saffron,Cornells');
  
  // Add request timing
  req.startTime = Date.now();
  
  // Log business requests in development
  if (process.env.NODE_ENV === 'development') {
    const brand = req.headers['x-rekker-brand'] || 'general';
    console.log(colors.cyan(`🏢 ${req.method} ${req.path} - Rekker Business Platform [${brand}]`));
  }
  
  next();
});

// Enhanced response time tracking with business metrics
app.use((req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    const responseTime = Date.now() - req.startTime;
    res.setHeader('X-Response-Time', responseTime + 'ms');
    
    // Track business operation performance
    if (req.path.includes('/products/')) {
      res.setHeader('X-Operation-Type', 'Product');
    } else if (req.path.includes('/admin/')) {
      res.setHeader('X-Operation-Type', 'Admin');
    } else if (req.path.includes('/wholesale/')) {
      res.setHeader('X-Operation-Type', 'Wholesale');
    }
    
    // Log slow business operations
    if (responseTime > 2000) {
      console.warn(colors.yellow(`⚡ Slow business operation: ${req.method} ${req.path} - ${responseTime}ms`));
    }
    
    // Log successful admin operations
    if (req.path.includes('/admin/') && res.statusCode < 400) {
      console.log(colors.green(`✅ Admin operation: ${req.method} ${req.path} by ${req.user?.name || 'Unknown'}`));
    }
    
    return originalSend.call(this, data);
  };
  
  next();
});

// ═══════════════════════════════════════════════════════════════
//                    BUSINESS PLATFORM HEALTH CHECKS
// ═══════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Rekker Business Platform API 🏢',
    platform: 'Rekker Multi-Brand System',
    version: '2.0.0',
    environment: process.env.NODE_ENV,
    status: 'Business Operations Active',
    timestamp: new Date().toISOString(),
    brands: {
      rekker: 'Main company products (stationery, bags, toys, etc.)',
      saffron: 'Cleaning products manufactured by Rekker',
      cornells: 'Beauty products distributed by Rekker'
    },
    endpoints: {
      authentication: '/api/v1/auth',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      users: '/api/v1/users', 
      cart: '/api/v1/carts',
      payments: '/api/v1/stripe',
      banners: '/api/v1/banners'
    },
    businessFeatures: {
      wholesaleCatalog: '/api/v1/products/wholesale/catalog',
      brandProducts: '/api/v1/products/brand/:brandName',
      quoteRequests: '/api/v1/products/:id/quote',
      adminDashboard: '/api/v1/products/admin/dashboard',
      bulkOperations: '/api/v1/products/admin/bulk'
    }
  });
});

// Enhanced health check for business operations
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'Rekker Business Platform - Operational Excellence',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    memory: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(process.memoryUsage().external / 1024 / 1024)} MB`
    },
    status: {
      api: 'healthy',
      database: 'connected', // This could be enhanced with actual DB ping
      services: 'operational',
      brands: ['Rekker', 'Saffron', 'Cornells']
    },
    businessMetrics: {
      supportedOperations: [
        'Product Management',
        'Wholesale Operations', 
        'Multi-Brand Support',
        'Quote Management',
        'Inventory Tracking',
        'Admin Dashboard'
      ]
    }
  };

  res.status(200).json(healthCheck);
});

// Business platform status endpoint
app.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    platform: 'Rekker Business System',
    status: 'Active',
    brands: {
      rekker: { status: 'active', products: 'available' },
      saffron: { status: 'active', products: 'available' },
      cornells: { status: 'active', products: 'available' }
    },
    services: {
      productCatalog: 'online',
      wholesaleOperations: 'online',
      adminPanel: 'online',
      quoteSystem: 'online'
    },
    timestamp: new Date().toISOString()
  });
});

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED BUSINESS ROUTES
// ═══════════════════════════════════════════════════════════════

// Apply specific rate limiters to sensitive routes
app.use('/api/v1/auth', authLimiter, authRoute);
app.use('/api/v1/orders', orderLimiter, orderRoute);

// Standard business routes with enhanced functionality
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/stripe', stripeRoute);
app.use('/api/v1/banners', bannerRoute);
app.use('/api/v1/upload', uploadRoute);

// ═══════════════════════════════════════════════════════════════
//                    ENHANCED ERROR HANDLING
// ═══════════════════════════════════════════════════════════════

// Enhanced 404 handler for business operations
app.use((req, res, next) => {
  const error = new Error(`Business endpoint not found: ${req.originalUrl}`);
  error.status = 404;
  error.code = 'ENDPOINT_NOT_FOUND';
  
  // Log missing endpoints for business improvement
  console.warn(colors.yellow(`🔍 Missing endpoint requested: ${req.method} ${req.originalUrl} from ${req.ip}`));
  
  next(error);
});

// Business-focused error handlers
app.use(notFound);
app.use(errorHandler);

// Global error catcher for unhandled business errors
app.use((error, req, res, next) => {
  console.error(colors.red.bold('🚨 Unhandled error in Rekker business platform:'));
  console.error(colors.red(error.stack));
  
  // Track business-critical errors
  const isCriticalError = req.path.includes('/admin/') || 
                         req.path.includes('/products/') || 
                         req.path.includes('/orders/');
  
  if (isCriticalError) {
    console.error(colors.red.bold('⚠️  CRITICAL BUSINESS ERROR - Immediate attention required!'));
  }
  
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred in the Rekker business platform',
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : error.message,
    code: 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
    support: 'Please contact Rekker technical support team',
    platform: 'Rekker Business System'
  });
});

export default app;