// services/consignmentService.js
const Consignment = require('../models/Consignment');

class ConsignmentService {
  async createConsignment(data) {
    const consignment = new Consignment(data);
    return await consignment.save();
  }

  async getConsignments(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const consignments = await Consignment.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Optional: Sort by creation date

      const totalItems = await Consignment.countDocuments(); // Total number of consignments
      const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

      return { consignments, totalPages, totalItems };
    }

    // If no pagination is provided, return all consignments
    return await Consignment.find().sort({ createdAt: -1 });
  }

  async getConsignmentById(id) {
    return await Consignment.findById(id);
  }

  async updateConsignment(id, data) {
    return await Consignment.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteConsignment(id) {
    return await Consignment.findByIdAndDelete(id);
  }
}

module.exports = new ConsignmentService();
