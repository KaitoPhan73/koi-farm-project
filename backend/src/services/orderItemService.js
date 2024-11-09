// services/orderItemService.js
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

// Tạo một OrderItem mới và update stock product
const createOrderItem = async (name, price, quantity, imageUrl, product) => {
  try {
    // Kiểm tra product tồn tại
    const productDoc = await Product.findById(product);
    if (!productDoc) {
      throw new Error('Product not found');
    }

    // Kiểm tra status product
    if (productDoc.status !== 'Available') {
      throw new Error(`Product is ${productDoc.status}`);
    }

    // Kiểm tra stock đủ không
    if (productDoc.stock < quantity) {
      throw new Error(
        `Insufficient stock. Only ${productDoc.stock} items available`
      );
    }

    // Tạo order item
    const orderItem = new OrderItem({
      product,
      name,
      price,
      quantity,
      imageUrl,
    });
    await orderItem.save();

    // Giảm stock và update status nếu cần
    const newStock = productDoc.stock - quantity;
    const newStatus = newStock === 0 ? 'Sold' : 'Available';

    // Update product
    await Product.findByIdAndUpdate(
      product,
      {
        stock: newStock,
        status: newStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Populate product info before returning
    await orderItem.populate('product');
    return orderItem;
  } catch (error) {
    throw new Error(`Error creating order item: ${error.message}`);
  }
};

// Lấy tất cả OrderItems với thông tin product
const getAllOrderItems = async () => {
  try {
    const orderItems = await OrderItem.find().populate('product');
    return orderItems;
  } catch (error) {
    throw new Error('Error fetching order items');
  }
};

// Lấy OrderItem theo ID với thông tin product
const getOrderItemById = async (orderItemId) => {
  try {
    const orderItem = await OrderItem.findById(orderItemId).populate('product');
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
    const orderItem = await OrderItem.findByIdAndUpdate(orderItemId, updates, {
      new: true,
    });
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
