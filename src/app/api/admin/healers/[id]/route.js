import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import FoundingHealer from '@/models/FoundingHealer';

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const body = await request.json();
    
    const healer = await FoundingHealer.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    
    if (!healer) {
      return NextResponse.json(
        { success: false, message: 'Founding healer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      member: {
        _id: healer._id,
        name: healer.name,
        email: healer.email,
        phone: healer.phone,
        yearsOfExperience: healer.yearsOfExperience,
        background: healer.background,
        otherBackground: healer.otherBackground,
        reference: healer.reference,
        status: healer.status,
        welcomeEmailSent: healer.welcomeEmailSent,
        welcomeEmailSentAt: healer.welcomeEmailSentAt,
        createdAt: healer.createdAt
      }
    });
  } catch (error) {
    console.error('Error updating founding healer:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update founding healer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const healer = await FoundingHealer.findByIdAndDelete(id);
    
    if (!healer) {
      return NextResponse.json(
        { success: false, message: 'Founding healer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Founding healer deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting founding healer:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete founding healer' },
      { status: 500 }
    );
  }
} 