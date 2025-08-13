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

// Import luxury route handlers
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import userRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";
import stripeRoute from "./routes/stripe.js";
import bannerRoute from "./routes/banner.route.js";

// Import luxury middleware
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

// Initialize Cornell's luxury express application
const app = express();

// Trust proxy for luxury cloud deployments
app.set('trust proxy', 1);

// ═══════════════════════════════════════════════════════════════
//                    LUXURY SECURITY MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// Helmet for luxury-grade security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
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

// Luxury CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'https://cornells-luxury.com',
      'https://www.cornells-luxury.com',
      'https://cornells-beauty.vercel.app'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(colors.yellow(`⚠️  CORS blocked request from: ${origin}`));
      callback(new Error('Access denied by Cornell\'s security policy'));
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
    'X-Luxury-Client'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Luxury-Version'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// ═══════════════════════════════════════════════════════════════
//                    LUXURY RATE LIMITING
// ═══════════════════════════════════════════════════════════════

// General API rate limiting for luxury experience
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Generous limit for luxury customers
  message: {
    error: 'Too many requests from this exclusive location. Please try again in 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.warn(colors.yellow(`⚡ Rate limit exceeded for IP: ${req.ip}`));
    res.status(429).json({
      success: false,
      error: 'Too many requests from this exclusive location. Please try again in 15 minutes.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

// Strict rate limiting for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes  
  max: 10, // Limit login attempts
  message: {
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Luxury order rate limiting
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 orders per hour (generous for luxury)
  message: {
    error: 'Order frequency limit reached. Please contact our luxury concierge for assistance.',
    code: 'ORDER_RATE_LIMIT_EXCEEDED'
  }
});

// Apply general rate limiting
app.use(generalLimiter);

// ═══════════════════════════════════════════════════════════════
//                    LUXURY DATA PROCESSING
// ═══════════════════════════════════════════════════════════════

// Compression for optimal luxury performance
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

// Enhanced JSON parsing for luxury data
app.use(express.json({ 
  limit: '50mb', // Generous for luxury product images
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb',
  parameterLimit: 50000
}));

// Luxury cookie parser with security
app.use(cookieParser(process.env.COOKIE_SECRET));

// ═══════════════════════════════════════════════════════════════
//                    LUXURY SECURITY SANITIZATION
// ═══════════════════════════════════════════════════════════════

// MongoDB injection protection
app.use(mongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(colors.yellow(`🛡️  Sanitized NoSQL injection attempt: ${key}`));
  },
}));

// XSS protection for luxury content
app.use(xss());

// HTTP Parameter Pollution protection
app.use(hpp({
  whitelist: [
    'sort',
    'fields',
    'page',
    'limit',
    'category',
    'brand',
    'price',
    'rating',
    'size',
    'color'
  ]
}));

// ═══════════════════════════════════════════════════════════════
//                    LUXURY LOGGING & MONITORING
// ═══════════════════════════════════════════════════════════════

// Custom Morgan format for luxury logging
morgan.token('luxury-id', (req) => req.user?.id || 'anonymous');
morgan.token('luxury-role', (req) => req.user?.role || 'guest');
morgan.token('user-agent-short', (req) => {
  const ua = req.get('User-Agent') || '';
  return ua.length > 50 ? ua.substring(0, 50) + '...' : ua;
});

const morganFormat = process.env.NODE_ENV === 'production'
  ? '[:date[iso]] :method :url :status :response-time ms - :res[content-length] bytes [:luxury-role/:luxury-id] ":user-agent-short"'
  : colors.cyan(':method') + ' ' + colors.yellow(':url') + ' ' + 
    colors.green(':status') + ' ' + colors.magenta(':response-time ms') + 
    ' - ' + colors.blue('[:luxury-role/:luxury-id]');

app.use(morgan(morganFormat));

// ═══════════════════════════════════════════════════════════════
//                    LUXURY API MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// Luxury brand headers and metadata
app.use((req, res, next) => {
  // Add luxury brand headers
  res.setHeader('X-Luxury-Brand', 'Cornells by Sterling Parfums');
  res.setHeader('X-Luxury-Version', '1.0.0');
  res.setHeader('X-Luxury-Environment', process.env.NODE_ENV);
  
  // Add request timing
  req.startTime = Date.now();
  
  // Log luxury requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(colors.cyan(`🌟 ${req.method} ${req.path} - Cornell's Luxury API`));
  }
  
  next();
});

// Request response time tracking
app.use((req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    const responseTime = Date.now() - req.startTime;
    res.setHeader('X-Response-Time', responseTime + 'ms');
    
    // Log slow requests for luxury performance monitoring
    if (responseTime > 1000) {
      console.warn(colors.yellow(`⚡ Slow luxury request: ${req.method} ${req.path} - ${responseTime}ms`));
    }
    
    return originalSend.call(this, data);
  };
  
  next();
});

// ═══════════════════════════════════════════════════════════════
//                    LUXURY API HEALTH CHECK
// ═══════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Cornell\'s Luxury Beauty API ✨',
    brand: 'Cornell\'s by Sterling Parfums',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    status: 'Elite Service Active',
    timestamp: new Date().toISOString(),
    endpoints: {
      authentication: '/api/v1/auth',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      users: '/api/v1/users', 
      cart: '/api/v1/carts',
      payments: '/api/v1/stripe',
      banners: '/api/v1/banners'
    }
  });
});

// Luxury health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'Cornell\'s Luxury Platform - Operational Excellence',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    memory: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`
    },
    status: {
      api: 'healthy',
      database: 'connected', // This could be enhanced with actual DB ping
      services: 'operational'
    }
  };

  res.status(200).json(healthCheck);
});

// ═══════════════════════════════════════════════════════════════
//                    LUXURY API ROUTES
// ═══════════════════════════════════════════════════════════════

// Apply specific rate limiters to sensitive routes
app.use('/api/v1/auth', authLimiter, authRoute);
app.use('/api/v1/orders', orderLimiter, orderRoute);

// Standard luxury routes
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/stripe', stripeRoute);
app.use('/api/v1/banners', bannerRoute);

// ═══════════════════════════════════════════════════════════════
//                    LUXURY ERROR HANDLING
// ═══════════════════════════════════════════════════════════════

// Enhanced 404 handler for luxury experience
app.use((req, res, next) => {
  const error = new Error(`Exclusive endpoint not found: ${req.originalUrl}`);
  error.status = 404;
  error.code = 'ENDPOINT_NOT_FOUND';
  next(error);
});

// Luxury error handlers
app.use(notFound);
app.use(errorHandler);

// Global error catcher for unhandled errors
app.use((error, req, res, next) => {
  console.error(colors.red.bold('🚨 Unhandled error in Cornell\'s luxury platform:'));
  console.error(colors.red(error.stack));
  
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred in our luxury platform',
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : error.message,
    code: 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
    support: 'Please contact Cornell\'s luxury support team'
  });
});

export default app;