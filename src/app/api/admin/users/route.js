import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Blog from '@/models/Blog';

// Get all users with blog count
export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all users
    const users = await User.find({}).select('-password').lean();
    
    // Get blog counts for each user
    const blogCounts = await Blog.aggregate([
      { $group: { _id: '$authorId', count: { $sum: 1 } } }
    ]);
    
    // Create a map of user ID to blog count
    const blogCountMap = blogCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});
    
    // Add blog count to each user
    const usersWithBlogCount = users.map(user => ({
      ...user,
      blogCount: blogCountMap[user._id.toString()] || 0
    }));
    
    return NextResponse.json(usersWithBlogCount);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    
    // Don't return the password in the response
    const user = newUser.toObject();
    delete user.password;
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 