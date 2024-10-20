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
      const { page, limit } = req.query;

      // Use the getConsignments method from consignmentService
      const consignmentsData = await consignmentService.getConsignments(
        parseInt(page),
        parseInt(limit)
      );

      if (page && limit) {
        const { consignments, totalItems, totalPages } = consignmentsData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: consignments,
        });
      } else {
        // Return all consignments if pagination is not provided
        return res.status(200).json({ items: consignmentsData });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
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
