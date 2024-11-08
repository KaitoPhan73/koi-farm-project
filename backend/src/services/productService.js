const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductService {
  async createProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(query = {}) {
    const {
      page,
      limit = 10,
      category,
      categoryId,
      minPrice,
      maxPrice,
      gender,
      status,
      sortBy = 'createdAt',
      order = 'desc',
      search,
    } = query;

    const filter = {};

    // Build filters
    if (categoryId || category) {
      filter.category = categoryId || category;
    }
    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    try {
      // Nếu có page -> thêm skip/limit
      if (page) {
        const skip = (Number(page) - 1) * Number(limit);
        const [products, totalItems] = await Promise.all([
          Product.find(filter)
            .populate('category', 'name')
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean(),
          Product.countDocuments(filter),
        ]);

        return {
          products,
          totalPages: Math.ceil(totalItems / Number(limit)),
        };
      }

      // Nếu không có page -> trả về tất cả
      const products = await Product.find(filter)
        .populate('category', 'name')
        .sort(sortOptions)
        .lean();

      return { products };
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id)
        .populate('category', 'name')
        .lean();

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
      }).populate('category', 'name');

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
          { name: { $regex: term, $options: 'i' } },
          { breed: { $regex: term, $options: 'i' } },
          { origin: { $regex: term, $options: 'i' } },
        ];
      }

      // Add other filters
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          if (key === 'category' || key === 'categoryId') {
            query.category = filters[key];
          } else {
            query[key] = filters[key];
          }
        }
      });

      const skip = (Number(page) - 1) * Number(limit);

      const products = await Product.find(query)
        .populate('category', 'name')
        .skip(skip)
        .limit(Number(limit))
        .lean();

      const totalItems = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalItems / Number(limit));

      return {
        products,
        totalItems,
        totalPages,
        currentPage: Number(page),
        hasNext: page < totalPages,
        hasPrev: page > 1,
      };
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
