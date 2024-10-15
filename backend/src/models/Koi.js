const mongoose = require("mongoose");

const KoiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    origin: { type: String, required: true }, // Nguồn gốc
    gender: { type: String, enum: ["Male", "Female"], required: true }, // Giới tính
    size: { type: Number, required: true }, // Kích thước (cm)
    healthStatus: { type: String, required: true }, // Tình trạng sức khỏe
    imageUrl: { type: String }, // URL hình ảnh
    price: { type: Number, required: true }, // Giá bán
    available: { type: Boolean, default: true }, // Cá có sẵn hay không
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending", "Not for Sale"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Koi", KoiSchema);
