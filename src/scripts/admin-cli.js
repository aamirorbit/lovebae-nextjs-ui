// Admin CLI for managing admin users
// Usage: node src/scripts/admin-cli.js <command>

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createInterface } from 'readline';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lovebae';

// Admin user schema
const AdminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  passwordSalt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
}, { collection: 'adminusers' });

// Method to set password
AdminUserSchema.methods.setPassword = function(password) {
  this.passwordSalt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
};

// Method to verify password
AdminUserSchema.methods.verifyPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
  return this.passwordHash === hash;
};

// Create the model
const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

// Create readline interface for prompting
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'lovebae',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected to lovebae database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

// Create admin user
async function createAdmin() {
  try {
    const username = await prompt('Username: ');
    const email = await prompt('Email: ');
    const password = await prompt('Password: ');
    const role = await prompt('Role (admin/super-admin): ');
    
    // Check if user already exists
    const existingUser = await AdminUser.findOne({ 
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      console.error('Error: User with this username or email already exists');
      return;
    }
    
    // Create the admin user
    const admin = new AdminUser({
      username,
      email,
      role: role === 'super-admin' ? 'super-admin' : 'admin'
    });
    
    // Set password
    admin.setPassword(password);
    
    // Save to database
    await admin.save();
    
    console.log(`Admin user "${username}" created successfully`);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
}

// List all admin users
async function listAdmins() {
  try {
    const admins = await AdminUser.find({}).sort({ createdAt: -1 });
    
    if (admins.length === 0) {
      console.log('No admin users found');
      return;
    }
    
    console.log('\nAdmin Users:');
    console.log('===========================================');
    
    admins.forEach(admin => {
      console.log(`Username: ${admin.username}`);
      console.log(`Email: ${admin.email}`);
      console.log(`Role: ${admin.role}`);
      console.log(`Created: ${admin.createdAt}`);
      console.log(`Last Login: ${admin.lastLogin || 'Never'}`);
      console.log('===========================================');
    });
  } catch (error) {
    console.error('Error listing admin users:', error.message);
  }
}

// Delete admin user
async function deleteAdmin() {
  try {
    const username = await prompt('Username to delete: ');
    
    // Confirm deletion
    const confirm = await prompt(`Are you sure you want to delete user "${username}"? (yes/no): `);
    
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Deletion cancelled');
      return;
    }
    
    // Delete the user
    const result = await AdminUser.deleteOne({ username });
    
    if (result.deletedCount === 0) {
      console.error(`No user found with username "${username}"`);
      return;
    }
    
    console.log(`Admin user "${username}" deleted successfully`);
  } catch (error) {
    console.error('Error deleting admin user:', error.message);
  }
}

// Main function
async function main() {
  try {
    // Get command from arguments
    const command = process.argv[2];
    
    if (!command) {
      console.log('Usage: node src/scripts/admin-cli.js <command>');
      console.log('Available commands: create, list, delete');
      process.exit(0);
    }
    
    // Connect to database
    await connectDB();
    
    // Execute command
    switch (command.toLowerCase()) {
      case 'create':
        await createAdmin();
        break;
      case 'list':
        await listAdmins();
        break;
      case 'delete':
        await deleteAdmin();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        console.log('Available commands: create, list, delete');
    }
    
    // Close connections
    rl.close();
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the main function
main(); 