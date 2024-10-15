// services/orderItemService.js
const OrderItem = require("../models/OrderItem");

class OrderItemService {
  async createOrderItem(data) {
    const orderItem = new OrderItem(data);
    return await orderItem.save();
  }

  async getOrderItems() {
    return await OrderItem.find();
  }

  async getPagination(page = 1, limit = 10) {
    const orderItems = await OrderItem.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await OrderItem.countDocuments();
    return { orderItems, total, page, limit };
  }

  async getOrderItemById(id) {
    return await OrderItem.findById(id);
  }

  async updateOrderItem(id, data) {
    return await OrderItem.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOrderItem(id) {
    return await OrderItem.findByIdAndDelete(id);
  }
}

module.exports = new OrderItemService();
