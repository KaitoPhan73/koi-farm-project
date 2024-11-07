// controllers/orderItemController.js
const orderItemService = require('../services/orderItemService');

class OrderItemController {
  async create(req, res) {
    try {
      const orderItem = await orderItemService.createOrderItem(req.body);
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const orderItems = await orderItemService.getOrderItems();
      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPagination(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
      const result = await orderItemService.getPagination(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const orderItem = await orderItemService.getOrderItemById(req.params.id);
      if (!orderItem)
        return res.status(404).json({ message: 'Order item not found' });
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedOrderItem = await orderItemService.updateOrderItem(
        req.params.id,
        req.body
      );
      if (!updatedOrderItem)
        return res.status(404).json({ message: 'Order item not found' });
      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedOrderItem = await orderItemService.deleteOrderItem(
        req.params.id
      );
      if (!deletedOrderItem)
        return res.status(404).json({ message: 'Order item not found' });
      res.status(200).json({ message: 'Order item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createWithConsignment(req, res) {
    try {
      const { orderItem: orderItemData, consignment: consignmentData } =
        req.body;

      const result = await orderItemService.createWithConsignment(
        orderItemData,
        consignmentData
      );

      res.status(201).json({
        success: true,
        message: 'OrderItem with consignment created successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create OrderItem with consignment',
        error: error.message,
      });
    }
  }
}

module.exports = new OrderItemController();
