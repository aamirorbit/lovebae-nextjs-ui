import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referrerCreatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator',
    required: true,
  },
  referredCreatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator',
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  // Total earnings of the referred creator
  referredCreatorEarnings: {
    type: Number,
    default: 0,
  },
  // Commission earned by referrer (10% of referred creator's earnings)
  commission: {
    type: Number,
    default: 0,
  },
  // Commission rate (stored as decimal, e.g., 0.10 for 10%)
  commissionRate: {
    type: Number,
    default: 0.10,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'paid'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
referralSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to calculate and update commission
referralSchema.methods.updateCommission = function(newEarnings) {
  this.referredCreatorEarnings = newEarnings;
  this.commission = newEarnings * this.commissionRate;
  return this.save();
};

// Index for faster lookups
referralSchema.index({ referrerCreatorId: 1 });
referralSchema.index({ referredCreatorId: 1 });
referralSchema.index({ referralCode: 1 });

export default mongoose.models.Referral || mongoose.model('Referral', referralSchema);
