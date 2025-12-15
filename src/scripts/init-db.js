// Database initialization script
// Usage: node src/scripts/init-db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createInterface } from 'readline';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lovebae';

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    console.log('\nPossible reasons:');
    console.log('1. MongoDB is not running');
    console.log('2. MongoDB connection string is incorrect');
    console.log('3. Network issue\n');
    
    return false;
  }
}

// Check database connection and create collections
async function initializeDatabase() {
  try {
    // Try to connect to the database
    const connected = await connectToDB();
    
    if (!connected) {
      const answer = await new Promise(resolve => {
        rl.question('Do you want to create a local MongoDB database? (yes/no): ', resolve);
      });
      
      if (answer.toLowerCase() === 'yes') {
        console.log('\nTo create a local MongoDB database:');
        console.log('1. Install MongoDB if not already installed');
        console.log('2. Start MongoDB service (mongod)');
        console.log('3. Update .env file with the correct MONGODB_URI');
        console.log('4. Run this script again\n');
      }
      
      return;
    }
    
    // Create collections (if they don't exist)
    const db = mongoose.connection.db;
    
    // Get list of existing collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Check if collections exist, if not create them
    if (!collectionNames.includes('waitlistentries')) {
      await db.createCollection('waitlistentries');
      console.log('Created waitlistentries collection');
    } else {
      console.log('waitlistentries collection already exists');
    }
    
    if (!collectionNames.includes('adminusers')) {
      await db.createCollection('adminusers');
      console.log('Created adminusers collection');
    } else {
      console.log('adminusers collection already exists');
    }
    
    console.log('\nDatabase initialization completed successfully');
    console.log('You can now use the admin CLI to create admin users:');
    console.log('./admin.sh create\n');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    rl.close();
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the initialization
initializeDatabase(); 