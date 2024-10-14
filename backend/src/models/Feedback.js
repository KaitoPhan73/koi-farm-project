// models/Feedback.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    koi: { type: Schema.Types.ObjectId, ref: "Koi", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
