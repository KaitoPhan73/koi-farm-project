const feedBackService = require('../services/feedBackService');

class FeedBackController {
  async create(req, res) {
    try {
      const feedback = await feedBackService.createFeedback(req.body);
      return res.status(201).json({ message: 'Phản hồi đã được tạo thành công.', data: feedback });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getAll(req, res) {
    try {
      const feedbacks = await feedBackService.getAllFeedbacks();
      return res.status(200).json({ data: feedbacks });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getById(req, res) {
    try {
      const feedback = await feedBackService.getFeedbackById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res.status(200).json({ data: feedback });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async update(req, res) {
    try {
      const feedback = await feedBackService.updateFeedback(req.params.id, req.body);
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res.status(200).json({ message: 'Phản hồi đã được cập nhật thành công.', data: feedback });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async delete(req, res) {
    try {
      const feedback = await feedBackService.deleteFeedback(req.params.id);
      if (!feedback) {
        return res.status(404).json({ error: 'Không tìm thấy phản hồi.' });
      }
      return res.status(200).json({ message: 'Phản hồi đã bị xóa thành công.' });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }
}

module.exports = new FeedBackController();
