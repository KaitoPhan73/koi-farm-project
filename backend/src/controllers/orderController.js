// controllers/orderController.js
const orderService = require('../services/orderService');

class OrderController {
  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const { page, limit } = req.query;

      // Use the getAllOrders method from orderService
      const ordersData = await orderService.getAllOrders(
        parseInt(page),
        parseInt(limit)
      );

      if (page && limit) {
        const { orders, totalItems, totalPages } = ordersData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: orders,
        });
      } else {
        // Return all orders if pagination is not provided
        return res.status(200).json({ items: ordersData });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedOrder = await orderService.updateOrder(
        req.params.id,
        req.body
      );
      if (!updatedOrder)
        return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedOrder = await orderService.deleteOrder(req.params.id);
      if (!deletedOrder)
        return res.status(404).json({ message: 'Order not found' });
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
