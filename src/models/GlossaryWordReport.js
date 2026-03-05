import mongoose from 'mongoose';

const glossaryWordReportSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    definition: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    phrase: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    pagePath: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    source: {
      type: String,
      trim: true,
      maxlength: 80,
      default: 'game_glossary_tooltip',
    },
    isMissingGlossaryWord: {
      type: Boolean,
      default: false,
      index: true,
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    ipAddress: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'resolved'],
      default: 'new',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.GlossaryWordReport) {
  delete mongoose.models.GlossaryWordReport;
}

const GlossaryWordReport = mongoose.model('GlossaryWordReport', glossaryWordReportSchema);

export default GlossaryWordReport;
