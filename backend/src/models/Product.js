const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductBase',
      required: true,
    },
    size: {
      type: String,
      enum: {
        values: ['S', 'M', 'L'],
        message: 'Size must be S, M, or L',
      },
      required: [true, 'Size is required'],
    },
    descriptionSize: {
      type: String,
      required: [true, 'Description size is required'],
      // validate: {
      //   validator: function (v) {
      //     // Kiểm tra format như "3-6 cm" hoặc "10 cm"
      //     return /^\d+(-\d+)?\s*cm$/.test(v);
      //   },
      //   message: (props) =>
      //     `${props.value} is not a valid size description! Format should be like "3-6 cm" or "10 cm"`,
      // },
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
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    consignment: {
      isConsignment: {
        type: Boolean,
        default: false,
      },
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      commission: {
        type: Number,
        min: 0,
        max: 100,
      },
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
