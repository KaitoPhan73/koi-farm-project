const Product = require('../models/Product');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(page, limit, category) {
    const query = {}; // Tạo một truy vấn rỗng

    // Nếu có category, thêm vào truy vấn
    if (category) {
      query.category = category;
    }

    if (page && limit) {
      const skip = (page - 1) * limit; // Tính số lượng mục cần bỏ qua
      const products = await Product.find(query) // Sử dụng truy vấn
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('category'); // Populcate thông tin danh mục
      const totalItems = await Product.countDocuments(query); // Tổng số sản phẩm theo truy vấn
      const totalPages = Math.ceil(totalItems / limit); // Tính tổng số trang
      return { products, totalPages, totalItems };
    }

    // Nếu không có phân trang, trả về tất cả sản phẩm với thông tin danh mục
    return await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 });
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
