// controllers/orderController.js
const orderService = require('../services/orderService');

// Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = await orderService.createOrder(userId, items, totalAmount);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json({ items: orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(orderId, status);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng theo userId
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await orderService.getOrdersByUserId(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUserId,
};
