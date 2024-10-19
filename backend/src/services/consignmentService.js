// services/consignmentService.js
const Consignment = require('../models/Consignment');

class ConsignmentService {
  async createConsignment(data) {
    const consignment = new Consignment(data);
    return await consignment.save();
  }

  async getConsignments() {
    return await Consignment.find();
  }

  async getPagination(page = 1, limit = 10) {
    const consignments = await Consignment.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Consignment.countDocuments();
    return { consignments, total, page, limit };
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
