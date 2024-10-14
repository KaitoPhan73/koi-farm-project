// models/Koi.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const koiSchema = new Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true }, // Nguồn gốc xuất xứ
    breed: { type: String, required: true }, // Giống cá (thuần chủng, lai F1, thuần Việt)
    gender: { type: String, enum: ["Male", "Female"], required: true }, // Giới tính
    age: { type: Number, required: true }, // Tuổi của cá
    size: { type: Number, required: true }, // Kích thước của cá (cm)
    personality: { type: String }, // Tính cách của cá (nếu cần)
    foodPerDay: { type: Number }, // Lượng thức ăn/ngày (g)
    filteringRate: { type: Number }, // Tỉ lệ sàng lọc (%)
    status: {
      type: String,
      enum: ["Available", "Sold", "Consigned", "Under Care"],
      default: "Available",
    }, // Trạng thái của cá: có sẵn, đã bán, đang ký gửi, đang được chăm sóc
    certificates: [String], // Các giấy chứng nhận (nếu có)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Koi", koiSchema);
