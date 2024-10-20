const Product = require('../models/Product');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(page, limit) {
    if (page && limit) {
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('category'); // Populate category information
      const totalItems = await Product.countDocuments(); // Total number of products
      const totalPages = Math.ceil(totalItems / limit); // Calculate total pages
      return { products, totalPages, totalItems };
    }

    // If no pagination is provided, return all products with populated categories
    return await Product.find().populate('category').sort({ createdAt: -1 });
  }

  async getProductById(id) {
    return await Product.findById(id).populate('category'); // Populate category information
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
