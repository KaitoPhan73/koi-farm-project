const mongoose = require("mongoose");

const ConsignmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
    sentDate: { type: Date, default: Date.now }, // Ngày ký gửi
    returnDate: { type: Date }, // Ngày trả lại cá
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Under Care", "Returned"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consignment", ConsignmentSchema);
