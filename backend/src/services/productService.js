const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(query = {}) {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      gender,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const filter = {};

    // Xây dựng filter
    if (category) filter['productBase.category'] = category;
    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find(filter)
        .populate({
          path: 'productBase',
          populate: {
            path: 'category',
            model: 'Categories',
          },
        })
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit));

      const totalItems = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / Number(limit));

      return {
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalItems,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id).populate({
        path: 'productBase',
        populate: {
          path: 'category',
          model: 'Categories',
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async updateProduct(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate({
        path: 'productBase',
        populate: {
          path: 'category',
          model: 'Categories',
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async searchProducts(searchQuery) {
    const { term, page = 1, limit = 10, ...filters } = searchQuery;

    try {
      const query = {};

      // Add text search if term exists
      if (term) {
        query.$or = [
          { 'productBase.name': { $regex: term, $options: 'i' } },
          { 'productBase.breed': { $regex: term, $options: 'i' } },
        ];
      }

      // Add other filters
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          query[key] = filters[key];
        }
      });

      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find(query)
        .populate({
          path: 'productBase',
          populate: {
            path: 'category',
            model: 'Categories',
          },
        })
        .skip(skip)
        .limit(Number(limit));

      const totalItems = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalItems / Number(limit));

      return {
        products,
        pagination: {
          currentPage: Number(page),
          totalPages,
          totalItems,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
