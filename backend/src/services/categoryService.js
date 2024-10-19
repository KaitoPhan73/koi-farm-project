const Category = require('../models/Category');

class CategoryService {
  async createCategory(data) {
    const category = new Category(data);
    return await category.save();
  }

  async getAllCategories(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Tính toán số mục cần bỏ qua
      const categories = await Category.find().skip(skip).limit(limit); // Lấy dữ liệu theo phân trang
      const totalItems = await Category.countDocuments(); // Tổng số danh mục
      const totalPages = Math.ceil(totalItems / limit); // Tính toán tổng số trang
      return { categories, totalPages, totalItems };
    }
    return await Category.find(); // Nếu không có phân trang thì trả về toàn bộ
  }

  async getCategoryById(id) {
    return await Category.findById(id);
  }

  async getCategoryByName(name) {
    return await Category.findOne({ name });
  }

  async updateCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
