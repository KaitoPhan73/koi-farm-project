// controllers/consignmentController.js
const consignmentService = require('../services/consignmentService');

class ConsignmentController {
  async create(req, res) {
    try {
      const consignment = await consignmentService.createConsignment(req.body);
      res.status(201).json(consignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const consignments = await consignmentService.getConsignments();
      res.status(200).json(consignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPagination(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
      const result = await consignmentService.getPagination(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const consignment = await consignmentService.getConsignmentById(
        req.params.id
      );
      if (!consignment)
        return res.status(404).json({ message: 'Consignment not found' });
      res.status(200).json(consignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedConsignment = await consignmentService.updateConsignment(
        req.params.id,
        req.body
      );
      if (!updatedConsignment)
        return res.status(404).json({ message: 'Consignment not found' });
      res.status(200).json(updatedConsignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedConsignment = await consignmentService.deleteConsignment(
        req.params.id
      );
      if (!deletedConsignment)
        return res.status(404).json({ message: 'Consignment not found' });
      res.status(200).json({ message: 'Consignment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ConsignmentController();
