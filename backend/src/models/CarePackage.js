// models/CarePackage.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const carePackageSchema = new Schema(
  {
    koi: { type: Schema.Types.ObjectId, ref: "Koi", required: true }, // Cá Koi được chăm sóc
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Khách hàng ký gửi chăm sóc
    startDate: { type: Date, required: true }, // Ngày bắt đầu chăm sóc
    endDate: { type: Date, required: true }, // Ngày kết thúc chăm sóc
    dailyCareCost: { type: Number, required: true }, // Chi phí chăm sóc mỗi ngày
    totalCareCost: { type: Number, required: true }, // Tổng chi phí chăm sóc
    careStatus: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    }, // Trạng thái chăm sóc
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarePackage", carePackageSchema);
