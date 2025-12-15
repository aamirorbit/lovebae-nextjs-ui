import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FoundingHealer from '@/models/FoundingHealer';

export async function GET() {
  try {
    await connectToDatabase();
    
    const healers = await FoundingHealer.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      healers: healers.map(healer => healer.toObject())
    });
  } catch (error) {
    console.error('Error fetching founding healers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch founding healers' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, email, phone, title, avatar, status } = body;
    
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    const healer = new FoundingHealer({
      name,
      email,
      phone: phone || '',
      title: title || '',
      avatar: avatar || '',
      status: status || 'active'
    });
    
    await healer.save();
    
    return NextResponse.json({
      success: true,
      healer: healer.toObject()
    });
  } catch (error) {
    console.error('Error creating founding healer:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create founding healer' },
      { status: 500 }
    );
  }
} 