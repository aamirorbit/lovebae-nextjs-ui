import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

// Get a specific user by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user.toObject());
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Error fetching user' },
      { status: 500 }
    );
  }
}

// Update a user
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, password, role } = body;
    
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already in use by another user' },
          { status: 400 }
        );
      }
    }
    
    // Update fields
    user.name = name;
    user.email = email;
    user.role = role || user.role;
    
    // Only update password if provided
    if (password) {
      user.password = await hash(password, 10);
    }
    
    await user.save();
    
    // Don't return the password in the response
    const updatedUser = user.toObject();
    delete updatedUser.password;
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Error updating user' },
      { status: 500 }
    );
  }
}

// Delete a user
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete the user
    await User.findByIdAndDelete(id);
    
    // Return success message
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Error deleting user' },
      { status: 500 }
    );
  }
} 