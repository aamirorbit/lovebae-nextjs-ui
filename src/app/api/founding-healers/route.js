import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FoundingHealer from '@/models/FoundingHealer';
import { validateInput, sanitizeInput, logger } from '@/lib/security';
import { headers } from '@/lib/headers';

export async function POST(request) {
  try {
    const userInfo = {
      userId: request.headers.get('x-user-id'),
      userRole: request.headers.get('x-user-role')
    };

    logger.info({
      action: 'healer_application_create',
      userInfo,
      timestamp: new Date().toISOString()
    });

    const data = await request.json();
    
    // Validate input
    const validation = validateInput(data, 'foundingHealer');
    if (!validation.success) {
      logger.warn({
        action: 'healer_application_validation_failed',
        userInfo,
        errors: validation.error.errors
      });
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400, headers }
      );
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(data);

    // Connect to database
    await connectToDatabase();

    // Check for duplicates using Mongoose model
    const existingHealer = await FoundingHealer.findOne({
      $or: [
        { email: sanitizedData.email },
        { phone: sanitizedData.phone }
      ]
    });

    if (existingHealer) {
      logger.warn({
        action: 'healer_application_duplicate',
        userInfo,
        existingHealer
      });
      return NextResponse.json(
        { error: 'Application already exists' },
        { status: 409, headers }
      );
    }

    // Create new application using Mongoose model
    const healer = new FoundingHealer({
      ...sanitizedData,
      status: 'pending'
    });
    await healer.save();

    logger.info({
      action: 'healer_application_created',
      userInfo,
      healerId: healer._id
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', healer },
      { status: 201, headers }
    );
  } catch (error) {
    logger.error({
      action: 'healer_application_error',
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
}

export async function GET(request) {
  try {
    const userInfo = {
      userId: request.headers.get('x-user-id'),
      userRole: request.headers.get('x-user-role')
    };

    // Only allow admin access
    if (userInfo.userRole !== 'admin') {
      logger.warn({
        action: 'healers_unauthorized_access',
        userInfo
      });
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403, headers }
      );
    }

    logger.info({
      action: 'healers_fetch',
      userInfo
    });

    // Connect to database
    await connectToDatabase();
    
    // Fetch healers using Mongoose model
    const healers = await FoundingHealer.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(healers, { headers });
  } catch (error) {
    logger.error({
      action: 'healers_fetch_error',
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
} 