import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { validateInput, sanitizeInput, logger } from '@/lib/security';
import { headers } from '@/lib/headers';
import WaitlistEntry from '@/models/WaitlistEntry';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// Helper function to verify admin authentication
async function verifyAdminAuth() {
  try {
    // Get the token from cookies - properly awaited
    const cookieStore = await cookies();
    const token = await cookieStore.get('admin_token');
    
    if (!token) {
      return { authenticated: false, message: 'No authentication token found' };
    }
    
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    
    // Check if user is admin
    if (payload.role !== 'admin') {
      return { authenticated: false, message: 'Insufficient permissions' };
    }
    
    return { 
      authenticated: true, 
      userId: payload.id || payload.sub, 
      role: payload.role 
    };
  } catch (error) {
    logger.error({
      action: 'auth_verification_failed',
      error: error.message
    });
    return { authenticated: false, message: 'Invalid authentication token' };
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    logger.info({
      action: 'waitlist_entry_create',
      timestamp: new Date().toISOString()
    });
    
    // Validate input - only require email
    if (!data.email || !data.email.trim()) {
      return NextResponse.json(
        { message: 'Please provide an email address' },
        { status: 400, headers }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400, headers }
      );
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(data);

    // Connect to MongoDB
    await connectToDatabase();
    
    // Check for duplicates using the model - check email, and phone if provided
    const duplicateQuery = sanitizedData.phone && sanitizedData.phone.trim()
      ? {
          $or: [
            { email: sanitizedData.email.toLowerCase().trim() },
            { phone: sanitizedData.phone.trim() }
          ]
        }
      : { email: sanitizedData.email.toLowerCase().trim() };
    
    const existingEntry = await WaitlistEntry.findOne(duplicateQuery);

    if (existingEntry) {
      logger.warn({
        action: 'waitlist_entry_duplicate',
        existingEntry
      });
      return NextResponse.json(
        { message: 'You are already on the waitlist!' },
        { status: 200, headers }
      );
    }

    // Create new entry - only include fields that are provided
    const entryData = {
      email: sanitizedData.email.toLowerCase().trim(),
      status: 'pending'
    };
    
    if (sanitizedData.name && sanitizedData.name.trim()) {
      entryData.name = sanitizedData.name.trim();
    }
    
    if (sanitizedData.phone && sanitizedData.phone.trim()) {
      entryData.phone = sanitizedData.phone.trim();
    }
    
    if (sanitizedData.service && sanitizedData.service.trim()) {
      entryData.service = sanitizedData.service.trim();
    }
    
    const entry = new WaitlistEntry(entryData);
    await entry.save();

    logger.info({
      action: 'waitlist_entry_created',
      entryId: entry._id
    });

    return NextResponse.json(
      { message: 'Entry submitted successfully', entry },
      { status: 201, headers }
    );
  } catch (error) {
    logger.error({
      action: 'waitlist_entry_error',
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
}

export async function GET() {
  try {
    // Verify admin authentication
    const authCheck = await verifyAdminAuth();
    
    logger.info({
      action: 'waitlist_fetch_attempt',
      authStatus: authCheck.authenticated ? 'authenticated' : 'unauthenticated',
      userId: authCheck.userId || 'none'
    });

    if (!authCheck.authenticated) {
      logger.warn({
        action: 'waitlist_unauthorized_access',
        message: authCheck.message
      });
      return NextResponse.json(
        { error: 'Unauthorized', message: authCheck.message },
        { status: 403, headers }
      );
    }

    logger.info({
      action: 'waitlist_fetch',
      userId: authCheck.userId,
      role: authCheck.role
    });

    // Connect to MongoDB
    await connectToDatabase();
    
    // Use the model directly instead of db.collection
    const entries = await WaitlistEntry.find()
      .sort({ createdAt: -1 })
      .lean(); // Convert MongoDB documents to plain JavaScript objects

    // Calculate counts
    const counts = {
      total: entries.length,
      healers: entries.filter(entry => entry.service === 'healing').length,
      ambassadors: entries.filter(entry => entry.service === 'ambassador').length,
      waitlist: entries.filter(entry => entry.service === 'both').length
    };

    return NextResponse.json({
      entries,
      counts
    }, { headers });
  } catch (error) {
    logger.error({
      action: 'waitlist_fetch_error',
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
} 