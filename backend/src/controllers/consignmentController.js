const ConsignmentService = require('../services/consignmentService');

exports.createConsignment = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.user;
    const consignmentData = { ...req.body, user: userId };

    const consignment = await ConsignmentService.createConsignment(consignmentData);

    res.status(201).json({
      message: 'Đăng ký thành công!',
      consignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllConsignments = async (req, res) => {
  try {
    const consignments = await ConsignmentService.getAllConsignments();
    res.status(200).json(consignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
