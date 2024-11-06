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
      const { page, limit, category } = req.query;

      const productsData = await productService.getAllProducts(
        parseInt(page),
        parseInt(limit),
        category // Thêm category vào đây
      );

      if (page && limit) {
        const { products, totalItems, totalPages } = productsData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: products,
        });
      } else {
        return res.status(200).json({ items: productsData }); 
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
