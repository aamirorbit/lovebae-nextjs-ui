import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Creator from '@/models/Creator';
import Referral from '@/models/Referral';

// POST - Submit new creator application
export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Check if creator already exists
    const existingCreator = await Creator.findOne({ email: body.email.toLowerCase() });
    if (existingCreator) {
      return NextResponse.json(
        { success: false, message: 'An application with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create new creator application
    const newCreator = new Creator({
      name: body.name,
      email: body.email,
      phone: body.phone,
      instagramHandle: body.instagramHandle || '',
      tiktokHandle: body.tiktokHandle || '',
      followerCount: body.followerCount,
      niche: body.niche || '',
      audienceType: body.audienceType,
      referredByCode: body.referredByCode || '',
      bio: body.bio || '',
    });
    
    // Validate
    try {
      await newCreator.validate();
    } catch (validationError) {
      const errorMessages = Object.values(validationError.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, message: errorMessages.join(', ') },
        { status: 400 }
      );
    }
    
    // Save the creator
    await newCreator.save();
    
    // If referred by another creator, create a referral record
    if (body.referredByCode) {
      const referrer = await Creator.findOne({ referralCode: body.referredByCode });
      if (referrer) {
        const referral = new Referral({
          referrerCreatorId: referrer._id,
          referredCreatorId: newCreator._id,
          referralCode: body.referredByCode,
        });
        await referral.save();
        
        // Update referrer's referral count
        await Creator.findByIdAndUpdate(referrer._id, {
          $inc: { referralCount: 1 }
        });
      }
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully! We will review your application and get back to you soon.',
        creator: {
          id: newCreator._id,
          name: newCreator.name,
          email: newCreator.email,
          referralCode: newCreator.referralCode,
          status: newCreator.status,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Creator application error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'An application with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Fetch creator by email (for dashboard access)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    
    if (!email && !code) {
      return NextResponse.json(
        { success: false, message: 'Email or referral code is required' },
        { status: 400 }
      );
    }
    
    let creator;
    if (email) {
      creator = await Creator.findOne({ email: email.toLowerCase() });
    } else if (code) {
      creator = await Creator.findOne({ referralCode: code });
    }
    
    if (!creator) {
      return NextResponse.json(
        { success: false, message: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Get referral stats if approved
    let referralStats = null;
    if (creator.status === 'approved') {
      const referrals = await Referral.find({ referrerCreatorId: creator._id })
        .populate('referredCreatorId', 'name email status earnings');
      
      referralStats = {
        totalReferrals: referrals.length,
        totalCommission: referrals.reduce((sum, r) => sum + r.commission, 0),
        referrals: referrals.map(r => ({
          name: r.referredCreatorId?.name || 'Unknown',
          status: r.referredCreatorId?.status || 'unknown',
          commission: r.commission,
          createdAt: r.createdAt,
        })),
      };
    }
    
    return NextResponse.json({
      success: true,
      creator: {
        id: creator._id,
        name: creator.name,
        email: creator.email,
        referralCode: creator.referralCode,
        status: creator.status,
        earnings: creator.earnings,
        referralEarnings: creator.referralEarnings,
        referralCount: creator.referralCount,
        createdAt: creator.createdAt,
        approvedAt: creator.approvedAt,
      },
      referralStats,
    });
    
  } catch (error) {
    console.error('Error fetching creator:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
