// controllers/productController.js
const productService = require('../services/productService');

class ProductController {
  async create(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPagination(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
      const result = await productService.getPagination(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!updatedProduct)
        return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
