// controllers/OrderItemController.js
const OrderItemService = require("../services/OrderItemService");

const OrderItemController = {
  // Lấy tất cả đơn hàng
  getAllOrderItem: async (req, res) => {
    try {
      const orders = await OrderItemService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ message: "Error fetching all orders" });
    }
  },

  // Tạo một đơn hàng mới
  createOrder: async (req, res) => {
    try {
      const orderData = req.body;
      const order = await OrderItemService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Error creating order" });
    }
  },

  // Lấy đơn hàng theo ID
  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await OrderItemService.getOrderById(id);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Error fetching order" });
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await OrderItemService.updateOrderStatus(id, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Error updating order status" });
    }
  },
};

module.exports = OrderItemController;
