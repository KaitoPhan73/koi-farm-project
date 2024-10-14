// models/Promotion.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const promotionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    discount: { type: Number, required: true }, // Percentage discount
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    koi: [{ type: Schema.Types.ObjectId, ref: "Koi" }], // List of Koi Fish under promotion
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionSchema);
