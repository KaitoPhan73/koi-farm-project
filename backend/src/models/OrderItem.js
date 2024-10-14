// models/OrderItem.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    koi: { type: Schema.Types.ObjectId, ref: "Koi", required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);
