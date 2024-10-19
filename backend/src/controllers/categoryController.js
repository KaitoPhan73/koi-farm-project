const categoryService = require('../services/categoryService');

class CategoryController {
  async create(req, res) {
    console.log('Creating category:', req.body); // Thêm dòng này để theo dõi

    try {
      const existingCategory = await categoryService.getCategoryByName(
        req.body.name
      );
      if (existingCategory) {
        return res.status(400).json({ error: 'Tên danh mục đã tồn tại.' });
      }

      const category = await categoryService.createCategory(req.body);
      return res
        .status(201)
        .json({ message: 'Danh mục đã được tạo thành công.', data: category });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getAll(req, res) {
    try {
      const { page, limit } = req.query;
      const categoriesData = await categoryService.getAllCategories(
        parseInt(page),
        parseInt(limit)
      );

      if (page && limit) {
        const { categories, totalPages, totalItems } = categoriesData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: categories,
        });
      } else {
        return res.status(200).json(categoriesData);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
      }
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async getByName(req, res) {
    try {
      const category = await categoryService.getCategoryByName(req.params.name);
      if (!category) {
        return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
      }
      return res.status(200).json({ data: category });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async update(req, res) {
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
      }

      const existingCategory = await categoryService.getCategoryByName(
        req.body.name
      );
      if (
        existingCategory &&
        existingCategory._id.toString() !== req.params.id
      ) {
        return res.status(400).json({ error: 'Tên danh mục đã tồn tại.' });
      }

      return res.status(200).json({
        message: 'Danh mục đã được cập nhật thành công.',
        data: category,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }

  async delete(req, res) {
    try {
      const category = await categoryService.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Không tìm thấy danh mục.' });
      }
      return res
        .status(200)
        .json({ message: 'Danh mục đã bị xóa thành công.' });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  }
}

module.exports = new CategoryController();
