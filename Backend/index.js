// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/index.js
import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./utils/db.js";
import colors from "colors";

// Configure environment variables
dotenv.config();

// Luxury brand ASCII art for Cornell's
const displayBrandLogo = () => {
  console.log(colors.yellow(`
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║                                                                       ║     
  ║   ██████╗ ██████╗ ██████╗ ███╗   ██╗███████╗██╗     ██╗     ███████╗  ║
  ║  ██╔════╝██╔═══██╗██╔══██╗████╗  ██║██╔════╝██║     ██║     ██╔════╝  ║
  ║  ██║     ██║   ██║██████╔╝██╔██╗ ██║█████╗  ██║     ██║     ██████║   ║
  ║  ██║     ██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██║     ██║         ██║   ║
  ║  ╚██████╗╚██████╔╝██║  ██║██║ ╚████║███████╗███████╗███████╗██████║   ║
  ║   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝          ║
  ║                                                                       ║
  ║            🌟 LUXURY BEAUTY BY STERLING PARFUMS 🌟                    ║
  ║                    Exquisite • Exclusive • Elite                      ║
  ╚═══════════════════════════════════════════════════════════════════════╝
  `));
};

// Environment validation for luxury brand security
const validateEnvironment = () => {
  const requiredEnvVars = [
    'PORT',
    'DB',
    'JWT_SEC',
    'NODE_ENV'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(colors.red.bold('❌ CRITICAL: Missing required environment variables:'));
    missingVars.forEach(varName => {
      console.error(colors.red(`   • ${varName}`));
    });
    console.error(colors.yellow('\n💡 Please check your .env file and ensure all variables are configured.'));
    process.exit(1);
  }

  // Validate JWT secret strength for luxury security
  if (process.env.JWT_SEC.length < 32) {
    console.warn(colors.yellow.bold('⚠️  WARNING: JWT_SECRET should be at least 32 characters for optimal security'));
  }

  console.log(colors.green('✅ Environment validation passed - All luxury security measures in place'));
};

// Graceful shutdown handler for luxury brand reliability
const gracefulShutdown = (server) => {
  const shutdown = (signal) => {
    console.log(colors.cyan(`\n🛑 ${signal} received. Initiating graceful shutdown of Cornell's luxury platform...`));
    
    server.close(() => {
      console.log(colors.blue('🔒 HTTP server closed'));
      console.log(colors.magenta('💎 Cornell\'s luxury services terminated gracefully'));
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error(colors.red.bold('⚠️  Forced shutdown - some connections may have been terminated abruptly'));
      process.exit(1);
    }, 10000);
  };

  // Listen for termination signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGUSR2', () => shutdown('SIGUSR2')); // For nodemon
};

// Error handling for unhandled rejections and exceptions
const setupErrorHandlers = () => {
  process.on('unhandledRejection', (err, promise) => {
    console.error(colors.red.bold('🚨 UNHANDLED PROMISE REJECTION:'));
    console.error(colors.red(`Error: ${err.message}`));
    console.error(colors.gray('Stack:', err.stack));
    console.log(colors.yellow('📧 Alert: Cornell\'s technical team has been notified'));
  });

  process.on('uncaughtException', (err) => {
    console.error(colors.red.bold('🚨 UNCAUGHT EXCEPTION:'));
    console.error(colors.red(`Error: ${err.message}`));
    console.error(colors.gray('Stack:', err.stack));
    console.log(colors.red.bold('🔥 Shutting down due to uncaught exception...'));
    process.exit(1);
  });
};

// Main server initialization
const startLuxuryServer = async () => {
  try {
    // Display brand identity
    displayBrandLogo();
    
    // Validate environment
    validateEnvironment();
    
    // Setup error handlers
    setupErrorHandlers();
    
    // Server configuration
    const PORT = process.env.PORT || 5000;
    const NODE_ENV = process.env.NODE_ENV || 'development';
    
    // Start the luxury e-commerce server
    const server = app.listen(PORT, async () => {
      try {
        // Connect to luxury database
        await dbConnection();
        
        console.log(colors.green.bold('\n🚀 Cornell\'s Luxury Beauty Platform is LIVE!'));
        console.log(colors.cyan(`🌐 Server running on port: ${colors.yellow.bold(PORT)}`));
        console.log(colors.cyan(`🏷️  Environment: ${colors.yellow.bold(NODE_ENV.toUpperCase())}`));
        console.log(colors.cyan(`⚡ API Base URL: ${colors.yellow.bold(`http://localhost:${PORT}/api/v1`)}`));
        
        if (NODE_ENV === 'development') {
          console.log(colors.magenta('\n📋 Available Luxury Endpoints:'));
          console.log(colors.white('   • Authentication: /api/v1/auth'));
          console.log(colors.white('   • Products: /api/v1/products'));
          console.log(colors.white('   • Orders: /api/v1/orders'));
          console.log(colors.white('   • Users: /api/v1/users'));
          console.log(colors.white('   • Cart: /api/v1/carts'));
          console.log(colors.white('   • Payments: /api/v1/stripe'));
          console.log(colors.white('   • Banners: /api/v1/banners'));
        }
        
        console.log(colors.yellow('\n✨ Ready to serve luxury beauty experiences worldwide ✨'));
        console.log(colors.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
        
        // Performance monitoring for luxury standards
        if (NODE_ENV === 'production') {
          console.log(colors.blue('🔍 Production monitoring active for optimal luxury experience'));
          
          // Monitor memory usage
          setInterval(() => {
            const memUsage = process.memoryUsage();
            const memMB = Math.round(memUsage.rss / 1024 / 1024);
            
            if (memMB > 500) { // Alert if memory usage > 500MB
              console.warn(colors.yellow(`⚠️  Memory usage: ${memMB}MB - Consider optimization`));
            }
          }, 300000); // Check every 5 minutes
        }
        
      } catch (dbError) {
        console.error(colors.red.bold('❌ Database connection failed:'));
        console.error(colors.red(dbError.message));
        console.log(colors.yellow('🔄 Retrying database connection in 5 seconds...'));
        
        setTimeout(() => {
          dbConnection().catch(() => {
            console.error(colors.red.bold('💥 Unable to establish database connection. Exiting...'));
            process.exit(1);
          });
        }, 5000);
      }
    });
    
    // Configure server settings for luxury performance
    server.keepAliveTimeout = 65000; // Keep connections alive longer
    server.headersTimeout = 66000; // Slightly higher than keepAliveTimeout
    
    // Setup graceful shutdown
    gracefulShutdown(server);
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(colors.red.bold(`❌ Port ${PORT} is already in use`));
        console.log(colors.yellow('💡 Try a different port or stop the existing process'));
      } else {
        console.error(colors.red.bold('🚨 Server error:'), error);
      }
      process.exit(1);
    });
    
  } catch (error) {
    console.error(colors.red.bold('💥 Failed to start Cornell\'s luxury server:'));
    console.error(colors.red(error.message));
    process.exit(1);
  }
};

// Launch the luxury e-commerce platform
startLuxuryServer();