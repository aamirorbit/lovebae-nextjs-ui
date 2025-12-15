import mongoose from 'mongoose';
import dotenv from 'dotenv';
import os from 'os';

dotenv.config();

// Fix the URI format - remove the "MONGODB_URI=" prefix if present
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://orbit:A5OQXfiuoZorwPhl@v1.chntj3t.mongodb.net/lovebae';

// Clean the URI if it has the MONGODB_URI= prefix
if (MONGODB_URI.startsWith('MONGODB_URI=')) {
  MONGODB_URI = MONGODB_URI.substring('MONGODB_URI='.length);
}

console.log("MONGODB_URI:", MONGODB_URI);
// Cache the mongodb connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Helper function to wait between retry attempts
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function connectToDatabase() {
  console.log('Connecting to MongoDB...');
  if (cached.conn) {
    console.log('Already connected to MongoDB');
    return cached.conn;
  }

  const interfaces = os.networkInterfaces();
  let currentIP = 'IP not found';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        currentIP = iface.address;
      }
    }
  }
  
  console.log("Current IP Address:", currentIP);
  console.log("Attempting to connect to MongoDB...");
  console.log("MONGODB_URI:", MONGODB_URI);

  const MAX_RETRIES = 1;
  const RETRY_DELAY = 1000; // 5 seconds delay between retries
  
  // Reset connection promise if it failed previously
  if (cached.promise && !cached.conn) {
    console.log("Previous connection attempt failed, resetting...");
    cached.promise = null;
  }

  if (!cached.promise) {
    // Use different database names based on environment
    const dbName = process.env.NODE_ENV === 'production' ? 'lovebae' : 'lovebae_dev';
    console.log(`Using database: ${dbName} (NODE_ENV: ${process.env.NODE_ENV})`);
    
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      dbName,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    };

    console.log("MONGODB_URI:", MONGODB_URI);

    cached.promise = (async () => {
      let lastError;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          console.log(`Connection attempt ${attempt}/${MAX_RETRIES}...`);
          const mongoose_instance = await mongoose.connect(MONGODB_URI, opts);
          console.log("Successfully connected to MongoDB!");
          
          // List all collections in the database
          const db = mongoose_instance.connection.db;
          db.listCollections().toArray()
            .then(collections => {
              console.log("Database collections:");
              collections.forEach(collection => {
                console.log(`- ${collection.name}`);
              });
            })
            .catch(err => {
              console.error("Error listing collections:", err);
            });
            
          return mongoose_instance;
        } catch (error) {
          lastError = error;
          console.error(`Attempt ${attempt} failed:`, error.message);
          
          if (attempt < MAX_RETRIES) {
            console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
            await sleep(RETRY_DELAY);
          }
        }
      }
      
      console.error(`All ${MAX_RETRIES} connection attempts failed.`);
      throw lastError;
    })();
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Failed to establish MongoDB connection:", error);
    // Reset promise so next call will try again
    cached.promise = null;
    throw error;
  }
} 