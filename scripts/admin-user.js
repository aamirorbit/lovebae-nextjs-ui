#!/usr/bin/env node

// Script to manage admin users from the command line
// Run with: node scripts/admin-user.js [command] [options]

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { program } from 'commander';
import readline from 'readline';
import AdminUser from '../src/models/AdminUser.js';

// Load environment variables
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/silence-people';

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Create readline interface for prompting
const rl = readline.createInterface({
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

// Create a new admin user
async function createAdmin(options) {
  try {
    // Prompt for user details if not provided
    const username = options.username || await prompt('Username: ');
    const email = options.email || await prompt('Email: ');
    const password = options.password || await prompt('Password: ');
    const role = options.role || await prompt('Role (admin/super-admin): ');
    
    // Validate inputs
    if (!username || !email || !password) {
      console.error('Username, email, and password are required');
      return;
    }
    
    // Check if user already exists
    const existingUser = await AdminUser.findOne({ 
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      console.error('User with this username or email already exists');
      return;
    }
    
    // Create user
    const adminUser = new AdminUser({
      username,
      email,
      role: role === 'super-admin' ? 'super-admin' : 'admin'
    });
    
    // Set password (using the schema method)
    adminUser.setPassword(password);
    
    // Save user
    await adminUser.save();
    
    console.log(`Admin user "${username}" created successfully`);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
}

// List all admin users
async function listAdmins() {
  try {
    const admins = await AdminUser.find({}, 'username email role createdAt lastLogin');
    
    if (admins.length === 0) {
      console.log('No admin users found');
      return;
    }
    
    console.log('\nAdmin Users:');
    console.log('============================================');
    
    admins.forEach(admin => {
      console.log(`Username: ${admin.username}`);
      console.log(`Email: ${admin.email}`);
      console.log(`Role: ${admin.role}`);
      console.log(`Created: ${admin.createdAt}`);
      console.log(`Last Login: ${admin.lastLogin || 'Never'}`);
      console.log('============================================');
    });
  } catch (error) {
    console.error('Error listing admin users:', error.message);
  }
}

// Delete an admin user
async function deleteAdmin(username) {
  try {
    // Validate input
    if (!username) {
      username = await prompt('Username to delete: ');
    }
    
    // Confirm deletion
    const confirmation = await prompt(`Are you sure you want to delete the admin user "${username}"? (yes/no): `);
    
    if (confirmation.toLowerCase() !== 'yes') {
      console.log('Deletion cancelled');
      return;
    }
    
    // Delete user
    const result = await AdminUser.deleteOne({ username });
    
    if (result.deletedCount === 0) {
      console.error(`No admin user found with username "${username}"`);
      return;
    }
    
    console.log(`Admin user "${username}" deleted successfully`);
  } catch (error) {
    console.error('Error deleting admin user:', error.message);
  }
}

// Change admin user password
async function changePassword(username) {
  try {
    // Validate input
    if (!username) {
      username = await prompt('Username: ');
    }
    
    // Find user
    const adminUser = await AdminUser.findOne({ username });
    
    if (!adminUser) {
      console.error(`No admin user found with username "${username}"`);
      return;
    }
    
    // Prompt for new password
    const password = await prompt('New password: ');
    
    if (!password) {
      console.error('Password cannot be empty');
      return;
    }
    
    // Set new password
    adminUser.setPassword(password);
    
    // Save user
    await adminUser.save();
    
    console.log(`Password changed successfully for user "${username}"`);
  } catch (error) {
    console.error('Error changing password:', error.message);
  }
}

// Set up Commander for command-line parsing
program
  .name('admin-user')
  .description('Command line tool to manage admin users')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new admin user')
  .option('-u, --username <username>', 'Admin username')
  .option('-e, --email <email>', 'Admin email')
  .option('-p, --password <password>', 'Admin password')
  .option('-r, --role <role>', 'Admin role (admin or super-admin)')
  .action(createAdmin);

program
  .command('list')
  .description('List all admin users')
  .action(listAdmins);

program
  .command('delete')
  .description('Delete an admin user')
  .argument('[username]', 'Username to delete')
  .action(deleteAdmin);

program
  .command('change-password')
  .description('Change an admin user\'s password')
  .argument('[username]', 'Username to change password for')
  .action(changePassword);

// Main function
async function main() {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Parse command-line arguments
    await program.parseAsync(process.argv);
    
    // Close resources
    rl.close();
    await mongoose.connection.close();
    
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main(); 