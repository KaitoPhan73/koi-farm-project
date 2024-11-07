const mongoose = require('mongoose');

const ConsignmentSchema = new mongoose.Schema(
  {
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    sentDate: {
      type: Date,
      default: Date.now,
    },
    expectedReturnDate: {
      type: Date,
      required: true,
    },
    actualReturnDate: {
      type: Date,
    },
    careInstructions: {
      type: String,
      maxlength: [500, 'Care instructions cannot exceed 500 characters'],
    },
    consignmentFee: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Under Care', 'Returned', 'Cancelled'],
      default: 'Pending',
    },
    healthChecks: [
      {
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['Healthy', 'Sick', 'Critical', 'Deceased'],
          required: true,
        },
        notes: String,
        checkedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    notes: [
      {
        date: { type: Date, default: Date.now },
        content: String,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Consignment', ConsignmentSchema);
