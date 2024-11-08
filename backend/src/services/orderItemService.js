// services/orderItemService.js
const OrderItem = require('../models/OrderItem');
const Consignment = require('../models/Consignment');
const Product = require('../models/Product');
const mongoose = require('mongoose');

class OrderItemService {
  async createOrderItem(data) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Kiểm tra product và stock
      const product = await Product.findById(data.product);
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.stock < data.quantity) {
        throw new Error('Insufficient stock');
      }

      // Tạo OrderItem
      const orderItem = new OrderItem(data);
      await orderItem.save({ session });

      // Cập nhật stock của product
      await Product.findByIdAndUpdate(
        data.product,
        { $inc: { stock: -data.quantity } }, // Giảm stock dựa theo quantity
        { session, new: true }
      );

      await session.commitTransaction();
      return orderItem;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
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

  async createWithConsignment(orderItemData, consignmentData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Kiểm tra và trừ stock
      const product = await Product.findById(orderItemData.product);
      if (!product) {
        throw new Error('Product not found');
      }

      if (product.stock?.quantity < orderItemData.quantity) {
        throw new Error('Insufficient stock');
      }

      // Tạo OrderItem
      const orderItem = new OrderItem({
        ...orderItemData,
        requiresConsignment: true,
      });
      await orderItem.save({ session });

      // Tạo Consignment
      const consignment = new Consignment({
        ...consignmentData,
        orderItem: orderItem._id,
        user: orderItem.order.user,
        product: orderItem.product,
      });
      await consignment.save({ session });

      // Cập nhật reference trong OrderItem
      orderItem.consignment = consignment._id;
      await orderItem.save({ session });

      // Trừ stock
      await Product.findByIdAndUpdate(
        orderItemData.product,
        {
          $inc: { 'stock.quantity': -orderItemData.quantity },
        },
        { session, new: true }
      );

      await session.commitTransaction();
      return { orderItem, consignment };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getOrderItemWithConsignment(id) {
    return await OrderItem.findById(id)
      .populate('order')
      .populate('product')
      .populate({
        path: 'consignment',
        populate: {
          path: 'healthChecks.checkedBy notes.author',
          select: 'fullName',
        },
      });
  }
}

module.exports = new OrderItemService();
