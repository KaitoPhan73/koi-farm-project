const ProductBase = require('../models/ProductBase');

class ProductBaseService {
  async createProductBase(data) {
    const productBase = new ProductBase(data);
    return await productBase.save();
  }

  async getAllProductBases(page, limit, category) {
    const query = {};

    if (category) {
      query.category = category;
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      const productBases = await ProductBase.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('category');

      const totalItems = await ProductBase.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limit);
      return { productBases, totalPages, totalItems };
    }

    return await ProductBase.find(query)
      .populate('category')
      .sort({ createdAt: -1 });
  }

  async getProductBaseById(id) {
    return await ProductBase.findById(id).populate('category');
  }

  async updateProductBase(id, data) {
    return await ProductBase.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProductBase(id) {
    return await ProductBase.findByIdAndDelete(id);
  }

  async searchProductBases(searchTerm) {
    return await ProductBase.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { breed: { $regex: searchTerm, $options: 'i' } },
        { origin: { $regex: searchTerm, $options: 'i' } },
      ],
    }).populate('category');
  }
}

module.exports = new ProductBaseService();
