import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Creator from '@/models/Creator';
import Referral from '@/models/Referral';

// GET - Fetch specific creator by ID
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    const creator = await Creator.findById(id);
    
    if (!creator) {
      return NextResponse.json(
        { success: false, message: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Get referral information
    const referrals = await Referral.find({ referrerCreatorId: id })
      .populate('referredCreatorId', 'name email status earnings');
    
    return NextResponse.json({
      success: true,
      creator: {
        id: creator._id,
        name: creator.name,
        email: creator.email,
        phone: creator.phone,
        instagramHandle: creator.instagramHandle,
        tiktokHandle: creator.tiktokHandle,
        followerCount: creator.followerCount,
        niche: creator.niche,
        audienceType: creator.audienceType,
        referralCode: creator.referralCode,
        referredByCode: creator.referredByCode,
        status: creator.status,
        earnings: creator.earnings,
        referralEarnings: creator.referralEarnings,
        referralCount: creator.referralCount,
        bio: creator.bio,
        createdAt: creator.createdAt,
        approvedAt: creator.approvedAt,
      },
      referrals: referrals.map(r => ({
        id: r._id,
        referredCreator: r.referredCreatorId ? {
          name: r.referredCreatorId.name,
          email: r.referredCreatorId.email,
          status: r.referredCreatorId.status,
          earnings: r.referredCreatorId.earnings,
        } : null,
        commission: r.commission,
        status: r.status,
        createdAt: r.createdAt,
      })),
    });
    
  } catch (error) {
    console.error('Error fetching creator:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update creator (mainly for admin approval/rejection)
export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const body = await request.json();
    
    const creator = await Creator.findById(id);
    
    if (!creator) {
      return NextResponse.json(
        { success: false, message: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Allowed fields to update
    const allowedUpdates = ['status', 'earnings', 'referralEarnings', 'niche', 'bio'];
    const updates = {};
    
    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }
    
    // Set approvedAt when status changes to approved
    if (body.status === 'approved' && creator.status !== 'approved') {
      updates.approvedAt = new Date();
    }
    
    updates.updatedAt = new Date();
    
    const updatedCreator = await Creator.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    
    // If earnings updated, update referral commissions
    if (body.earnings !== undefined && body.earnings !== creator.earnings) {
      const referral = await Referral.findOne({ referredCreatorId: id });
      if (referral) {
        await referral.updateCommission(body.earnings);
        
        // Update referrer's referral earnings
        const totalCommission = await Referral.aggregate([
          { $match: { referrerCreatorId: referral.referrerCreatorId } },
          { $group: { _id: null, total: { $sum: '$commission' } } }
        ]);
        
        if (totalCommission.length > 0) {
          await Creator.findByIdAndUpdate(referral.referrerCreatorId, {
            referralEarnings: totalCommission[0].total
          });
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Creator updated successfully',
      creator: {
        id: updatedCreator._id,
        name: updatedCreator.name,
        email: updatedCreator.email,
        status: updatedCreator.status,
        earnings: updatedCreator.earnings,
        referralEarnings: updatedCreator.referralEarnings,
      },
    });
    
  } catch (error) {
    console.error('Error updating creator:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove creator application
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    const creator = await Creator.findById(id);
    
    if (!creator) {
      return NextResponse.json(
        { success: false, message: 'Creator not found' },
        { status: 404 }
      );
    }
    
    // Delete associated referrals
    await Referral.deleteMany({
      $or: [
        { referrerCreatorId: id },
        { referredCreatorId: id }
      ]
    });
    
    await Creator.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Creator deleted successfully',
    });
    
  } catch (error) {
    console.error('Error deleting creator:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
