// services/orderItemService.js
const OrderItem = require('../models/OrderItem');

// Tạo một OrderItem mới
const createOrderItem = async (name, price, quantity, imageUrl) => {
  try {
    const orderItem = new OrderItem({
      name,
      price,
      quantity,
      imageUrl,
    });
    await orderItem.save();
    return orderItem;
  } catch (error) {
    throw new Error('Error creating order item');
  }
};

// Lấy tất cả OrderItems
const getAllOrderItems = async () => {
  try {
    const orderItems = await OrderItem.find();
    return orderItems;
  } catch (error) {
    throw new Error('Error fetching order items');
  }
};

// Lấy OrderItem theo ID
const getOrderItemById = async (orderItemId) => {
  try {
    const orderItem = await OrderItem.findById(orderItemId);
    if (!orderItem) {
      throw new Error('Order item not found');
    }
    return orderItem;
  } catch (error) {
    throw new Error('Error fetching order item');
  }
};

// Cập nhật OrderItem
const updateOrderItem = async (orderItemId, updates) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, updates, { new: true });
    if (!orderItem) {
      throw new Error('Order item not found');
    }
    return orderItem;
  } catch (error) {
    throw new Error('Error updating order item');
  }
};

// Xóa OrderItem
const deleteOrderItem = async (orderItemId) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(orderItemId);
    if (!orderItem) {
      throw new Error('Order item not found');
    }
    return orderItem;
  } catch (error) {
    throw new Error('Error deleting order item');
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
