// models/Order.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      { type: Schema.Types.ObjectId, ref: "OrderItem", required: true },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
