const Consignment = require('../models/Consignment');

class ConsignmentService {
  static async createConsignment(data) {
    try {
      const consignment = new Consignment(data);
      await consignment.save();
      return consignment;
    } catch (error) {
      throw new Error('Error while creating consignment: ' + error.message);
    }
  }

  static async getAllConsignments() {
    try {
      return await Consignment.find(); 
    } catch (error) {
      throw new Error('Error while fetching consignments: ' + error.message);
    }
  }

  static async getConsignmentsByUser(userId) {
    try {
      return await Consignment.find({ user: userId }).populate('user', 'name email'); 
    } catch (error) {
      throw new Error('Error while fetching consignments for user: ' + error.message);
    }
  }
  
}

module.exports = ConsignmentService;
