import mongoose from 'mongoose';

const waitlistEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
    required: [true, 'Phone number is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
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

// Create and export the model
const WaitlistEntry = mongoose.models.WaitlistEntry || mongoose.model('WaitlistEntry', waitlistEntrySchema);

export default WaitlistEntry; 