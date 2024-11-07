// services/orderItemService.js
const OrderItem = require('../models/OrderItem');
const Consignment = require('../models/Consignment');
const mongoose = require('mongoose');

class OrderItemService {
  async createOrderItem(data) {
    const orderItem = new OrderItem(data);
    return await orderItem.save();
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
        user: orderItem.order.user, // Lấy user từ order
        product: orderItem.product,
      });
      await consignment.save({ session });

      // Cập nhật reference trong OrderItem
      orderItem.consignment = consignment._id;
      await orderItem.save({ session });

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
