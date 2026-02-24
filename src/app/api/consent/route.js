import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { sanitizeInput, logger } from '@/lib/security';
import { headers } from '@/lib/headers';
import AgeConsent from '@/models/AgeConsent';
import { cookies } from 'next/headers';

// Generate a session ID if not exists
async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('consent_session_id')?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    // Set cookie to expire in 2 years
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 2);

    cookieStore.set('consent_session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires
    });
  }

  return sessionId;
}

export async function POST(request) {
  try {
    const data = await request.json();
    const sessionId = await getSessionId();

    logger.info({
      action: 'age_consent_submit',
      sessionId,
      timestamp: new Date().toISOString()
    });

    // Validate required fields
    if (!data.age || !data.hasConsented !== undefined) {
      return NextResponse.json(
        { message: 'Age and consent status are required' },
        { status: 400, headers }
      );
    }

    const numericAge = parseInt(data.age);
    if (isNaN(numericAge) || numericAge < 1 || numericAge > 120) {
      return NextResponse.json(
        { message: 'Please provide a valid age' },
        { status: 400, headers }
      );
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(data);

    // Connect to MongoDB
    await connectToDatabase();

    // Check if consent already exists for this session
    const existingConsent = await AgeConsent.findOne({ sessionId });

    if (existingConsent) {
      // Update existing consent
      existingConsent.age = numericAge;
      existingConsent.hasConsented = sanitizedData.hasConsented;
      existingConsent.consentedAt = new Date();
      existingConsent.userAgent = request.headers.get('user-agent') || '';
      existingConsent.ipAddress = request.headers.get('x-forwarded-for') ||
                                 request.headers.get('x-real-ip') || '';
      existingConsent.gameAccessed = sanitizedData.gameAccessed || '';

      await existingConsent.save();

      logger.info({
        action: 'age_consent_updated',
        sessionId,
        consentId: existingConsent._id
      });

      return NextResponse.json(
        { message: 'Consent updated successfully', consent: existingConsent },
        { status: 200, headers }
      );
    } else {
      // Create new consent record
      const consentData = {
        sessionId,
        age: numericAge,
        hasConsented: sanitizedData.hasConsented,
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') || '',
        gameAccessed: sanitizedData.gameAccessed || ''
      };

      const consent = new AgeConsent(consentData);
      await consent.save();

      logger.info({
        action: 'age_consent_created',
        sessionId,
        consentId: consent._id
      });

      return NextResponse.json(
        { message: 'Consent recorded successfully', consent },
        { status: 201, headers }
      );
    }
  } catch (error) {
    logger.error({
      action: 'age_consent_error',
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
    const sessionId = await getSessionId();

    logger.info({
      action: 'age_consent_check',
      sessionId
    });

    // Connect to MongoDB
    await connectToDatabase();

    const consent = await AgeConsent.findOne({ sessionId }).sort({ consentedAt: -1 });

    if (consent) {
      return NextResponse.json({
        hasConsent: true,
        age: consent.age,
        consentedAt: consent.consentedAt,
        hasConsented: consent.hasConsented
      }, { headers });
    } else {
      return NextResponse.json({
        hasConsent: false
      }, { headers });
    }
  } catch (error) {
    logger.error({
      action: 'age_consent_check_error',
      error: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
}