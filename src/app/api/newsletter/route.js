import { NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/db';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Parse the request body
    const data = await request.json();
    
    if (!data.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if the email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email: data.email });
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate the subscription
        existingSubscriber.status = 'active';
        await existingSubscriber.save();
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
      
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter.'
      });
    }
    
    // Create a new subscriber
    const subscriber = new NewsletterSubscriber({
      email: data.email,
      source: data.source || 'blog'
    });
    
    await subscriber.save();
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to subscribe. Please try again later.',
        error: error.message
      },
      { status: 500 }
    );
  }
} 