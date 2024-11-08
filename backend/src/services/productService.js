const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductService {
  async getAllProducts(query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        minPrice,
        maxPrice,
        gender,
        status,
        size,
        origin,
        breed,
        saleType,
        sortBy = 'createdAt',
        order = 'desc',
        search,
      } = query;

      const filter = {};

      // Build filters
      if (category) {
        filter.category = category;
      }
      if (gender) filter.gender = gender;
      if (status) filter.status = status;
      if (size) filter.size = size;
      if (origin) filter.origin = { $regex: origin.trim(), $options: 'i' };
      if (breed) filter.breed = { $regex: breed.trim(), $options: 'i' };
      if (saleType) filter.saleType = saleType;

      // Price range
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      // Search across multiple fields
      if (search) {
        const searchTerm = search.trim().replace(/[^a-zA-Z0-9\s]/g, '');
        filter.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { breed: { $regex: searchTerm, $options: 'i' } },
          { origin: { $regex: searchTerm, $options: 'i' } },
        ];
      }

      // Sort options
      const allowedSortFields = ['createdAt', 'price', 'name', 'stock'];
      const sortOptions = {};
      if (allowedSortFields.includes(sortBy)) {
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;
      } else {
        sortOptions.createdAt = -1; // Default sort
      }

      const skip = (Number(page) - 1) * Number(limit);

      // Execute query with pagination
      const [products, totalItems] = await Promise.all([
        Product.find(filter)
          .populate('category', 'name description')
          .sort(sortOptions)
          .skip(skip)
          .limit(Number(limit))
          .lean(),
        Product.countDocuments(filter),
      ]);

      // Trả về đúng format mà controller cần
      return {
        products,
        totalPages: Math.ceil(totalItems / Number(limit)),
      };
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id)
        .populate('category', 'name description')
        .lean();

      if (!product) {
        return {
          success: false,
          message: 'Product not found',
        };
      }

      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async createProduct(data) {
    try {
      const product = new Product(data);
      await product.save();

      const newProduct = await Product.findById(product._id)
        .populate('category', 'name description')
        .lean();

      return {
        success: true,
        data: newProduct,
      };
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async updateProduct(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).populate('category', 'name description');

      if (!product) {
        return {
          success: false,
          message: 'Product not found',
        };
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return {
          success: false,
          message: 'Product not found',
        };
      }

      return {
        success: true,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
