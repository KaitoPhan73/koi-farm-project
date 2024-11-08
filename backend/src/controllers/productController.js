const productService = require('../services/productService');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

class ProductController {
  create = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body);

    if (!product) {
      throw new ApiError(400, 'Failed to create product');
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  });

  getAll = catchAsync(async (req, res) => {
    try {
      const { page, limit } = req.query;
      const result = await productService.getAllProducts(req.query);

      if (page || limit) {
        return res.status(200).json({
          success: true,
          items: result.products,
          totalPages: result.totalPages,
          page: Number(page) || 1,
          limit: Number(limit) || 10,
        });
      }

      return res.status(200).json({
        success: true,
        items: result.products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch products',
        items: [],
      });
    }
  });

  getById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(product);
  });

  update = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(product);
  });

  delete = catchAsync(async (req, res) => {
    const result = await productService.deleteProduct(req.params.id);

    if (!result) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  });

  search = catchAsync(async (req, res) => {
    const result = await productService.searchProducts(req.query);

    res.status(200).json(result.products);
  });
}

module.exports = new ProductController();
