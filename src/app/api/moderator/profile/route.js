import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function GET(request) {
  try {
    // Get the JWT token from the cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Connect to the database
    await connectToDatabase();
    
    // Find the moderator in the database (user with role moderator or admin)
    const moderator = await User.findById(decoded.id).select('-password');
    
    if (!moderator) {
      return NextResponse.json(
        { message: 'Moderator not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is a moderator or admin
    if (moderator.role !== 'moderator' && moderator.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized - Moderator access required' },
        { status: 403 }
      );
    }
    
    // Return the moderator data
    return NextResponse.json(moderator);
  } catch (error) {
    console.error('Error fetching moderator profile:', error);
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
} 