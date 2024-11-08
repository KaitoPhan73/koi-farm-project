// controllers/orderItemController.js
const orderItemService = require('../services/orderItemService');

// Tạo OrderItem mới
const createOrderItem = async (req, res) => {
  try {
    const { name, price, quantity, imageUrl } = req.body;
    const orderItem = await orderItemService.createOrderItem(name, price, quantity, imageUrl);
    return res.status(201).json(orderItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả OrderItems
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();
    return res.status(200).json(orderItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy OrderItem theo ID
const getOrderItemById = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await orderItemService.getOrderItemById(orderItemId);
    return res.status(200).json(orderItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cập nhật OrderItem
const updateOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const updates = req.body;
    const orderItem = await orderItemService.updateOrderItem(orderItemId, updates);
    return res.status(200).json(orderItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Xóa OrderItem
const deleteOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await orderItemService.deleteOrderItem(orderItemId);
    return res.status(200).json({ message: 'Order item deleted', orderItem });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
