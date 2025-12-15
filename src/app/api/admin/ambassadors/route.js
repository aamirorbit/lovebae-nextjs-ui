import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import SoulAmbassador from '@/models/SoulAmbassador';

export async function GET() {
  try {
    await connectToDatabase();
    
    const ambassadors = await SoulAmbassador.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      members: ambassadors.map(ambassador => ({
        _id: ambassador._id,
        name: ambassador.name,
        email: ambassador.email,
        phone: ambassador.phone,
        university: ambassador.university,
        semester: ambassador.semester,
        background: ambassador.background,
        otherBackground: ambassador.otherBackground,
        status: ambassador.status || 'pending',
        createdAt: ambassador.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching soul ambassadors:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch soul ambassadors' },
      { status: 500 }
    );
  }
} 