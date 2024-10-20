// services/orderService.js
const Order = require('../models/Order');

class OrderService {
  async createOrder(data) {
    const order = new Order(data);
    return await order.save();
  }

  async getAllOrders(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .sort({ orderDate: -1 }) // Sort by order date or any other relevant field
        .populate('items'); // Populate items if necessary (make sure 'items' field is referenced correctly)

      const totalItems = await Order.countDocuments(); // Total number of orders
      const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

      return { orders, totalPages, totalItems };
    }

    // If no pagination is provided, return all orders with populated items
    return await Order.find().populate('items').sort({ orderDate: -1 });
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
