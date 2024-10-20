const feedbackService = require('../services/feedbackService');

class FeedBackController {
  async create(req, res) {
    try {
      const feedback = await feedbackService.createFeedback(req.body);
      return res
        .status(201)
        .json({ message: 'Phản hồi đã được tạo thành công.', data: feedback });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getAll(req, res) {
    try {
      const { page, limit } = req.query;

      // Use the getAllFeedbacks method from feedbackService
      const feedbacksData = await feedbackService.getAllFeedbacks(
        parseInt(page),
        parseInt(limit)
      );

      if (page && limit) {
        const { feedbacks, totalItems, totalPages } = feedbacksData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: feedbacks,
        });
      } else {
        // Return all feedbacks if pagination is not provided
        return res.status(200).json({ items: feedbacksData });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const feedback = await feedbackService.getFeedbackById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res.status(200).json(feedback);
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async update(req, res) {
    try {
      const feedback = await feedbackService.updateFeedback(
        req.params.id,
        req.body
      );
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res.status(200).json({
        message: 'Phản hồi đã được cập nhật thành công.',
        data: feedback,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async delete(req, res) {
    try {
      const feedback = await feedbackService.deleteFeedback(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res
        .status(200)
        .json({ message: 'Phản hồi đã bị xóa thành công.' });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }
}

module.exports = new FeedBackController();
