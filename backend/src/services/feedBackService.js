const Feedback = require('../models/Feedback');

class FeedBackService {
  async createFeedback(data) {
    const feedback = new Feedback(data);
    return await feedback.save();
  }

  async getAllFeedbacks() {
    return await Feedback.find().populate('customer').populate('product');
  }

  async getFeedbackById(id) {
    return await Feedback.findById(id).populate('customer').populate('product');
  }

  async updateFeedback(id, data) {
    return await Feedback.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFeedback(id) {
    return await Feedback.findByIdAndDelete(id);
  }
}

module.exports = new FeedBackService();
