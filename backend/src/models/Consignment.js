// models/Consignment.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const consignmentSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Khách hàng ký gửi
    koi: { type: Schema.Types.ObjectId, ref: "Koi", required: true }, // Cá Koi được ký gửi
    consignmentType: {
      type: String,
      enum: ["Sell-Offline", "Sell-Online", "Care"],
      required: true,
    }, // Loại ký gửi: bán offline, bán online, hoặc chăm sóc
    priceAgreed: Number, // Giá đã thỏa thuận cho việc bán cá (nếu là ký gửi bán)
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Sold", "Under Care"],
      default: "Pending",
    }, // Trạng thái: Đang chờ, Đã đồng ý, Đã bán, Đang chăm sóc, ...
    consignmentDate: { type: Date, default: Date.now }, // Ngày ký gửi
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consignment", consignmentSchema);
