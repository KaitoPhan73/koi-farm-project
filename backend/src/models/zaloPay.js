const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    app_trans_id: { type: String, required: true, unique: true },
    app_user: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'processing'],
      default: 'pending',
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

const Pay = mongoose.model('ZaloPay', paymentSchema);

module.exports = Pay;
