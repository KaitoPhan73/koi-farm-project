const Product = require('../models/Product');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Tính toán số mục cần bỏ qua
      const products = await Product.find().skip(skip).limit(limit); // Lấy dữ liệu theo phân trang
      const totalItems = await Product.countDocuments(); // Tổng số sản phẩm
      const totalPages = Math.ceil(totalItems / limit); // Tính toán tổng số trang
      return { products, totalPages, totalItems };
    }
    return await Product.find(); // Nếu không có phân trang thì trả về toàn bộ
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
