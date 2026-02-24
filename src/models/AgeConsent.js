import mongoose from 'mongoose';

const ageConsentSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  hasConsented: {
    type: Boolean,
    required: true,
    default: false
  },
  consentedAt: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String,
    trim: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  gameAccessed: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  // Create TTL index to automatically delete records after 2 years
  expires: 365 * 24 * 60 * 60 * 2 // 2 years in seconds
});

// Compound index for efficient queries
ageConsentSchema.index({ sessionId: 1, hasConsented: 1 });

// Delete the model from cache if it exists to ensure fresh schema
if (mongoose.models.AgeConsent) {
  delete mongoose.models.AgeConsent;
}

// Create and export the model
const AgeConsent = mongoose.model('AgeConsent', ageConsentSchema);

export default AgeConsent;