const productService = require('../services/productService');

class ProductController {
  async create(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create product',
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const result = await productService.getAllProducts(req.query);
      res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      const statusCode = error.message === 'Product not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      const statusCode = error.message === 'Product not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      const statusCode = error.message === 'Product not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  async search(req, res) {
    try {
      const result = await productService.searchProducts(req.query);
      res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search products',
        error: error.message,
      });
    }
  }
}

module.exports = new ProductController();
