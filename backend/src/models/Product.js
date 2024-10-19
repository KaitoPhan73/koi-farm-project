const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age cannot be negative'],
      max: [50, 'Age cannot exceed 50 years'],
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: 'Gender must be either Male or Female',
      },
      required: [true, 'Gender is required'],
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
      min: [10, 'Size must be at least 10 cm'],
      max: [100, 'Size cannot exceed 100 cm'],
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      trim: true,
    },
    personality: {
      type: String,
      maxlength: [100, 'Personality description cannot exceed 100 characters'],
    },
    dailyFeedAmount: {
      type: Number,
      min: [1, 'Daily feed amount must be at least 1 gram'],
      max: [500, 'Daily feed amount cannot exceed 500 grams'],
    },
    screeningRate: {
      type: Number,
      min: [0, 'Screening rate must be at least 0%'],
      max: [100, 'Screening rate cannot exceed 100%'],
    },
    healthStatus: {
      type: String,
      required: [true, 'Health status is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/,
        'Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1'],
    },
    available: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model('Products', productSchema);
