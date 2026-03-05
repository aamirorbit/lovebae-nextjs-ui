import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema(
  {
    authorName: { type: String, trim: true },
    partnerNames: { type: String, trim: true },
    story: { type: String, required: true },
    relationshipType: { type: String, trim: true },
    duration: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    consentToPublish: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['pending', 'published', 'rejected'],
      default: 'pending',
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

if (mongoose.models.SuccessStory) {
  delete mongoose.models.SuccessStory;
}

export default mongoose.models.SuccessStory || mongoose.model('SuccessStory', successStorySchema);
