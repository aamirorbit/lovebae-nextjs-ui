import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import SoulAmbassador from '@/models/SoulAmbassador';

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the request body
    const body = await request.json();

    console.log("Soul Ambassador application body:", body);
    
    // Create a new entry
    const newApplication = new SoulAmbassador({
      name: body.name,
      phone: body.phone,
      email: body.email,
      university: body.university,
      semester: body.semester,
      background: body.background,
      otherBackground: body.otherBackground || '',
      reference: body.reference || '',
    });

    console.log("New Soul Ambassador application:", newApplication);
    
    // Validate the entry (mongoose will handle this based on our schema)
    try {
      await newApplication.validate();
      console.log("Soul Ambassador application validated");
    } catch (validationError) {
      const errorMessages = Object.values(validationError.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, message: errorMessages.join(', ') },
        { status: 400 }
      );
    }
    
    // Save the entry to MongoDB
    await newApplication.save();

    console.log("Soul Ambassador application saved");
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Soul Ambassador application submitted successfully',
        application: newApplication
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Soul Ambassador application error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all entries (for admin purposes)
// In a real application, this would be protected by authentication
export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Fetch all entries, sorted by most recent first
    const applications = await SoulAmbassador.find().sort({ createdAt: -1 });
    
    return NextResponse.json(
      { applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching Soul Ambassador applications:', error);
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 