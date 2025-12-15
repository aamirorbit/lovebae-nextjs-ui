import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  source: {
    type: String,
    enum: ['blog', 'homepage', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// If the model is already compiled, use that. Otherwise, compile it.
export default mongoose.models.NewsletterSubscriber || 
  mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema); 