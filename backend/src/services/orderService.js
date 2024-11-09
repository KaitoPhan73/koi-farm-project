// services/orderService.js
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem'); // Nếu bạn có model OrderItem

// Tạo một order mới
const createOrder = async (userId, items, totalAmount) => {
  try {
    const order = new Order({
      user: userId,
      items: items,
      totalAmount: totalAmount,
      status: 'Pending',
    });
    await order.save();
    return order;
  } catch (error) {
    throw new Error(`Error creating orderddsds: ${error.message}`);
  }
};

// Lấy danh sách tất cả các đơn hàng
const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate('user').populate('items');
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders');
  }
};

// Lấy thông tin đơn hàng theo ID
const getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate('user')
      .populate('items');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error fetching order');
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (orderId, status) => {
  try {
    const validStatuses = [
      'Pending',
      'Processing',
      'Shipped',
      'Completed',
      'Cancelled',
    ];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error('Error updating order status');
  }
};

// Lấy danh sách đơn hàng theo userId
const getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ user: userId })
      .populate('user', '-password') // Loại bỏ password khi populate user
      .populate('items')
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo mới nhất

    return {
      success: true,
      items: orders,
      totalOrders: orders.length,
    };
  } catch (error) {
    throw new Error(`Error fetching orders by user ID: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUserId, // Export thêm method mới
};
