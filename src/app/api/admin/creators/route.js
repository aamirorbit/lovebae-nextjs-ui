import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Creator from '@/models/Creator';

// GET - List all creators (for admin panel)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    
    // Build query
    const query = {};
    
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { instagramHandle: { $regex: search, $options: 'i' } },
        { tiktokHandle: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Get total count
    const total = await Creator.countDocuments(query);
    
    // Fetch creators with pagination
    const creators = await Creator.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v');
    
    // Get stats
    const stats = await Creator.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalEarnings: { $sum: '$earnings' },
          totalReferralEarnings: { $sum: '$referralEarnings' },
        }
      }
    ]);
    
    const statsMap = {
      pending: { count: 0, totalEarnings: 0, totalReferralEarnings: 0 },
      approved: { count: 0, totalEarnings: 0, totalReferralEarnings: 0 },
      rejected: { count: 0, totalEarnings: 0, totalReferralEarnings: 0 },
    };
    
    stats.forEach(s => {
      statsMap[s._id] = {
        count: s.count,
        totalEarnings: s.totalEarnings,
        totalReferralEarnings: s.totalReferralEarnings,
      };
    });
    
    return NextResponse.json({
      success: true,
      creators: creators.map(c => ({
        id: c._id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        instagramHandle: c.instagramHandle,
        tiktokHandle: c.tiktokHandle,
        followerCount: c.followerCount,
        audienceType: c.audienceType,
        referralCode: c.referralCode,
        referredByCode: c.referredByCode,
        status: c.status,
        earnings: c.earnings,
        referralEarnings: c.referralEarnings,
        referralCount: c.referralCount,
        createdAt: c.createdAt,
        approvedAt: c.approvedAt,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: statsMap,
    });
    
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
