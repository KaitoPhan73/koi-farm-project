// services/orderService.js
const Order = require("../models/Order");

class OrderService {
  async createOrder(data) {
    const order = new Order(data);
    return await order.save();
  }

  async getOrders() {
    return await Order.find();
  }

  async getPagination(page = 1, limit = 10) {
    const orders = await Order.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Order.countDocuments();
    return { orders, total, page, limit };
  }

  async getOrderById(id) {
    return await Order.findById(id);
  }

  async updateOrder(id, data) {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOrder(id) {
    return await Order.findByIdAndDelete(id);
  }
}

module.exports = new OrderService();
