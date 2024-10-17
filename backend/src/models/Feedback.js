const FeedbackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    koi: { type: mongoose.Schema.Types.ObjectId, ref: 'Koi', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
