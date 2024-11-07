const ProductBase = require('../models/ProductBase');

class ProductBaseService {
  async createProductBase(data) {
    const productBase = new ProductBase(data);
    return await productBase.save();
  }

  async getAllProductBases(filters = {}, options = {}) {
    try {
      const query = {};

      // Filter by category
      if (filters.category) {
        query.category = filters.category;
      }

      // Filter by price range
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};
        if (filters.minPrice !== undefined) {
          query.price.$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          query.price.$lte = filters.maxPrice;
        }
      }

      // Filter by status
      if (filters.status) {
        query.status = filters.status;
      }

      // Search by name or description
      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } },
        ];
      }

      // Pagination options
      const page = options.page || 1;
      const limit = options.limit || 10;
      const skip = (page - 1) * limit;

      // Get total count for pagination
      const totalItems = await ProductBase.countDocuments(query);
      const totalPages = Math.ceil(totalItems / limit);

      // Get products with filters, pagination and sorting
      const productBases = await ProductBase.find(query)
        .populate('category', 'name') // Populate category if needed
        .sort(options.sort)
        .skip(skip)
        .limit(limit);

      return {
        productBases,
        totalItems,
        totalPages,
      };
    } catch (error) {
      throw new Error(`Error getting product bases: ${error.message}`);
    }
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
