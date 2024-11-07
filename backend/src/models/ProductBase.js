const mongoose = require('mongoose');
const { Schema } = mongoose;

const productBaseSchema = new Schema(
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
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
      trim: true,
    },
    personality: {
      type: String,
      maxlength: [100, 'Personality description cannot exceed 100 characters'],
    },
    imageUrl: {
      type: String,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/,
        'Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)',
      ],
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [1, 'Base price must be at least 1'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductBase', productBaseSchema);
