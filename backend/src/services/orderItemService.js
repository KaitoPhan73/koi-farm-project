// services/OrderItemService.js
const OrderItem = require("../models/OrderItem");

const OrderItemService = {
  // Lấy tất cả các đơn hàng
  getAllOrders: async () => {
    try {
      const orders = await OrderItem.find().populate("cartItems");
      return orders;
    } catch (error) {
      throw new Error("Error fetching all orders: " + error.message);
    }
  },

  // Tạo một đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const order = new OrderItem(orderData);
      await order.save();
      return order;
    } catch (error) {
      throw new Error("Error creating order: " + error.message);
    }
  },

  // Lấy đơn hàng theo ID
  getOrderById: async (id) => {
    try {
      const order = await OrderItem.findById(id).populate("cartItems");
      if (!order) throw new Error("Order not found");
      return order;
    } catch (error) {
      throw new Error("Error fetching order: " + error.message);
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (id, status) => {
    try {
      const order = await OrderItem.findById(id);
      if (!order) throw new Error("Order not found");
      order.status = status;
      await order.save();
      return order;
    } catch (error) {
      throw new Error("Error updating order status: " + error.message);
    }
  },
};

module.exports = OrderItemService;
