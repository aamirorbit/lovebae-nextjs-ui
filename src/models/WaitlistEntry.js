import mongoose from 'mongoose';

const waitlistEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    enum: ['individual', 'couples', 'crisis', 'groups', 'family', 'teen', 'healing', 'ambassador', 'both'],
    default: 'individual'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Delete the model from cache if it exists to ensure fresh schema
if (mongoose.models.WaitlistEntry) {
  delete mongoose.models.WaitlistEntry;
}

// Create and export the model
const WaitlistEntry = mongoose.model('WaitlistEntry', waitlistEntrySchema);

export default WaitlistEntry; 