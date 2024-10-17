const Product = require('../models/Product');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getProducts() {
    return await Product.find();
  }

  async getPagination(page = 1, limit = 10) {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments();
    return { products, total, page, limit };
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
