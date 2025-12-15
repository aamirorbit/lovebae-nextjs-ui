// Script to check if the database exists
// Usage: node src/scripts/check-db.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lovebae';

async function checkDatabase() {
  let client;
  
  try {
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    // Get admin database
    const admin = client.db('admin');
    
    // List all databases
    const result = await admin.admin().listDatabases();
    
    // Check if our database exists
    const dbName = MONGODB_URI.split('/').pop().split('?')[0];
    const dbExists = result.databases.some(db => db.name === dbName);
    
    if (dbExists) {
      console.log(`Database '${dbName}' exists`);
      process.exit(0);
    } else {
      console.log(`Database '${dbName}' does not exist`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Error checking MongoDB:', error.message);
    process.exit(1);
  } finally {
    if (client) await client.close();
  }
}

// Run the check
checkDatabase(); 