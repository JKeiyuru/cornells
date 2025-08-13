// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/utils/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connection state tracking
let connectionState = {
  isConnected: false,
  isConnecting: false,
  connectionAttempts: 0,
  lastConnectionTime: null,
  lastError: null
};

// Database connection configuration
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maximum number of connections in the connection pool
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  bufferCommands: false, // Disable mongoose buffering
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  heartbeatFrequencyMS: 2000, // Check connection health every 2 seconds
};

// Enhanced connection retry logic
const MAX_RETRY_ATTEMPTS = 5;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 30000; // 30 seconds

// Calculate exponential backoff delay
const getRetryDelay = (attempt) => {
  const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, attempt), MAX_RETRY_DELAY);
  // Add jitter to prevent thundering herd
  return delay + Math.random() * 1000;
};

// Database connection function with enhanced error handling
const dbConnection = async () => {
  if (connectionState.isConnecting) {
    console.log('🔄 Database connection already in progress...');
    return;
  }

  if (connectionState.isConnected) {
    console.log('✅ Database already connected');
    return;
  }

  if (!process.env.DB) {
    console.error('❌ DATABASE_URL environment variable is not defined');
    throw new Error('Database connection string is required');
  }

  connectionState.isConnecting = true;
  connectionState.connectionAttempts++;

  try {
    console.log(`🚀 Attempting to connect to Cornells database (attempt ${connectionState.connectionAttempts}/${MAX_RETRY_ATTEMPTS})`);

    await mongoose.connect(process.env.DB, dbConfig);

    connectionState.isConnected = true;
    connectionState.isConnecting = false;
    connectionState.lastConnectionTime = new Date();
    connectionState.lastError = null;

    console.log(`✨ Cornells database connection established successfully!`);
    console.log(`🏪 Connected to: ${mongoose.connection.name || 'Unknown Database'}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);

  } catch (error) {
    connectionState.isConnecting = false;
    connectionState.lastError = error;

    console.error(`❌ Database connection failed (attempt ${connectionState.connectionAttempts}):`, error.message);

    if (connectionState.connectionAttempts < MAX_RETRY_ATTEMPTS) {
      const retryDelay = getRetryDelay(connectionState.connectionAttempts - 1);
      console.log(`🔄 Retrying connection in ${Math.round(retryDelay / 1000)} seconds...`);
      setTimeout(() => {
        dbConnection().catch(err => {
          console.error('🚨 Critical database connection failure:', err.message);
        });
      }, retryDelay);
    } else {
      console.error('🚨 Max connection attempts reached. Database connection failed permanently.');
      setTimeout(() => {
        connectionState.connectionAttempts = 0;
        console.log('🔄 Resetting connection attempts counter...');
      }, 60000);
      throw error;
    }
  }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to Cornells database');
  connectionState.isConnected = true;
  connectionState.connectionAttempts = 0;
});

mongoose.connection.on('error', (err) => {
  console.error('🚨 Mongoose connection error:', err.message);
  connectionState.lastError = err;
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from database');
  connectionState.isConnected = false;
  if (!mongoose.connection._hasOpened) {
    console.log('🔄 Attempting to reconnect...');
    setTimeout(dbConnection, 5000);
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 Mongoose reconnected to database');
  connectionState.isConnected = true;
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 Database connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  try {
    await mongoose.connection.close();
    console.log('🛑 Database connection closed through SIGTERM');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
    process.exit(1);
  }
});

const gracefulDisconnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🛑 Database connection closed gracefully');
    }
  } catch (error) {
    console.error('❌ Error during graceful disconnect:', error.message);
    throw error;
  }
};

const checkDatabaseHealth = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return {
      status: 'healthy',
      connected: connectionState.isConnected,
      lastConnectionTime: connectionState.lastConnectionTime,
      connectionAttempts: connectionState.connectionAttempts,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      database: mongoose.connection.name
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      connected: false,
      error: error.message,
      lastError: connectionState.lastError?.message,
      connectionAttempts: connectionState.connectionAttempts,
      readyState: mongoose.connection.readyState
    };
  }
};

const getDatabaseStats = async () => {
  try {
    if (!connectionState.isConnected) {
      throw new Error('Database not connected');
    }

    const stats = await mongoose.connection.db.stats();
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    return {
      database: mongoose.connection.name,
      collections: collections.length,
      totalSize: stats.storageSize,
      totalDocuments: stats.objects,
      indexes: stats.indexes,
      avgObjSize: stats.avgObjSize,
      dataSize: stats.dataSize,
      indexSize: stats.indexSize
    };
  } catch (error) {
    console.error('❌ Error getting database stats:', error.message);
    throw error;
  }
};

const getConnectionState = () => {
  return {
    ...connectionState,
    readyState: mongoose.connection.readyState,
    readyStateText: getReadyStateText(mongoose.connection.readyState)
  };
};

const getReadyStateText = (state) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
};

const initializeDatabase = async () => {
  try {
    if (!connectionState.isConnected) {
      throw new Error('Database not connected');
    }

    console.log('🔧 Initializing database indexes and constraints...');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (collectionNames.includes('products')) {
      try {
        await mongoose.connection.db.collection('products').createIndex({
          title: 'text',
          description: 'text',
          categories: 'text'
        }, { name: 'product_search_index' });
        console.log('✅ Product search index created');
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.warn('⚠️ Product search index creation failed:', error.message);
        }
      }
    }

    if (collectionNames.includes('orders')) {
      try {
        await mongoose.connection.db.collection('orders').createIndex(
          { userId: 1, createdAt: -1 },
          { name: 'user_orders_index' }
        );
        console.log('✅ User orders index created');
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.warn('⚠️ User orders index creation failed:', error.message);
        }
      }
    }

    console.log('✨ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

const cleanupTestDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    try {
      await mongoose.connection.dropDatabase();
      console.log('🧪 Test database cleaned up');
    } catch (error) {
      console.error('❌ Test database cleanup failed:', error.message);
    }
  }
};

export { 
  dbConnection, 
  gracefulDisconnect, 
  checkDatabaseHealth, 
  getDatabaseStats,
  getConnectionState,
  initializeDatabase,
  cleanupTestDatabase
};
