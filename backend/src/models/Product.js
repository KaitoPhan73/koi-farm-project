const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product schema
const productSchema = new Schema(
  {
    productBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductBase', // Reference to ProductBase
      required: true,
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: [10, 'Size must be at least 10 cm'],
      max: [100, 'Size cannot exceed 100 cm'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age cannot be negative'],
      max: [50, 'Age cannot exceed 50 years'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: 'Gender must be either Male or Female',
      },
      required: [true, 'Gender is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1'],
    },
    status: {
      type: String,
      enum: {
        values: ['Available', 'Sold', 'Pending', 'Not for Sale'],
        message: 'Status must be Available, Sold, Pending, or Not for Sale',
      },
      default: 'Available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
