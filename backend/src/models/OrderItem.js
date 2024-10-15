const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    koi: { type: mongoose.Schema.Types.ObjectId, ref: "Koi", required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
