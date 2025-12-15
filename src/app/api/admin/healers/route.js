import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FoundingHealer from '@/models/FoundingHealer';

export async function GET() {
  try {
    await connectToDatabase();
    
    const healers = await FoundingHealer.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      members: healers.map(healer => ({
        _id: healer._id,
        name: healer.name,
        email: healer.email,
        phone: healer.phone,
        yearsOfExperience: healer.yearsOfExperience,
        background: healer.background,
        otherBackground: healer.otherBackground,
        reference: healer.reference,
        status: healer.status || 'pending',
        welcomeEmailSent: healer.welcomeEmailSent || false,
        welcomeEmailSentAt: healer.welcomeEmailSentAt,
        createdAt: healer.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching founding healers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch founding healers' },
      { status: 500 }
    );
  }
} 