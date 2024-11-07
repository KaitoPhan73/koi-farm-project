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
      const { page, limit, categoryId } = req.query;

      const productsData = await productService.getAllProducts(
        parseInt(page),
        parseInt(limit),
        categoryId
      );

      if (page && limit) {
        const { products, totalItems, totalPages } = productsData;
        return res.status(200).json({
          success: true,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: products,
        });
      }

      return res.status(200).json({
        success: true,
        items: productsData,
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch products', error.message);
    }
  });

  getById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  });

  update = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
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

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  });
}

module.exports = new ProductController();
