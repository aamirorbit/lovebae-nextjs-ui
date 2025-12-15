import mongoose from 'mongoose';

// Helper function to generate unique referral code
function generateReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'LB-';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true,
  },
  instagramHandle: {
    type: String,
    trim: true,
    default: '',
  },
  tiktokHandle: {
    type: String,
    trim: true,
    default: '',
  },
  followerCount: {
    type: String,
    enum: ['1k-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1m', '1m+'],
    required: [true, 'Please select your follower count range'],
  },
  niche: {
    type: String,
    trim: true,
    default: '',
  },
  audienceType: {
    type: String,
    enum: ['couples', 'singles', 'mixed'],
    required: [true, 'Please select your audience type'],
  },
  referralCode: {
    type: String,
    unique: true,
    default: generateReferralCode,
  },
  referredByCode: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  earnings: {
    type: Number,
    default: 0,
  },
  referralEarnings: {
    type: Number,
    default: 0,
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
    default: null,
  },
});

// Ensure referral code is unique before saving
creatorSchema.pre('save', async function(next) {
  this.updatedAt = new Date();
  
  // If this is a new document, ensure unique referral code
  if (this.isNew) {
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!isUnique && attempts < maxAttempts) {
      const existingCreator = await mongoose.models.Creator.findOne({ 
        referralCode: this.referralCode 
      });
      
      if (!existingCreator) {
        isUnique = true;
      } else {
        this.referralCode = generateReferralCode();
        attempts++;
      }
    }
    
    if (!isUnique) {
      next(new Error('Could not generate unique referral code'));
    }
  }
  
  next();
});

// Index for faster lookups
creatorSchema.index({ email: 1 });
creatorSchema.index({ referralCode: 1 });
creatorSchema.index({ status: 1 });
creatorSchema.index({ referredByCode: 1 });

export default mongoose.models.Creator || mongoose.model('Creator', creatorSchema);
