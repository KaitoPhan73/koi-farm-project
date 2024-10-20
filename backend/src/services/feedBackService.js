const Feedback = require('../models/Feedback');

class FeedBackService {
  async createFeedback(data) {
    const feedback = new Feedback(data);
    return await feedback.save();
  }

  async getAllFeedbacks(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const feedbacks = await Feedback.find()
        .skip(skip)
        .limit(limit)
        .populate('user') // Populate user information
        .populate('product') // Populate product information
        .sort({ createdAt: -1 }); // Optional: Sort by creation date

      const totalItems = await Feedback.countDocuments(); // Total number of feedbacks
      const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

      return { feedbacks, totalPages, totalItems };
    }

    // If no pagination is provided, return all feedbacks with populated user and products
    return await Feedback.find()
      .populate('user')
      .populate('product')
      .sort({ createdAt: -1 });
  }

  async getFeedbackById(id) {
    return await Feedback.findById(id).populate('user').populate('product');
  }

  async updateFeedback(id, data) {
    return await Feedback.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFeedback(id) {
    return await Feedback.findByIdAndDelete(id);
  }
}

module.exports = new FeedBackService();
