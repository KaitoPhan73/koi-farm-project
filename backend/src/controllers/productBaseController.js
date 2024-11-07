const productBaseService = require('../services/productBaseService');

class ProductBaseController {
  async create(req, res) {
    try {
      const productBase = await productBaseService.createProductBase(req.body);
      res.status(201).json({
        message: 'ProductBase created successfully',
        data: productBase,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Failed to create ProductBase',
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const { page, limit, category } = req.query;
      const productsData = await productBaseService.getAllProductBases(
        parseInt(page),
        parseInt(limit),
        category
      );

      if (page && limit) {
        const { productBases, totalItems, totalPages } = productsData;
        return res.status(200).json({
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages,
          totalItems,
          items: productBases,
        });
      } else {
        return res.status(200).json({ items: productsData });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch ProductBases',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const productBase = await productBaseService.getProductBaseById(
        req.params.id
      );
      if (!productBase) {
        return res.status(404).json({ message: 'ProductBase not found' });
      }
      res.status(200).json(productBase);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch ProductBase',
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const productBase = await productBaseService.updateProductBase(
        req.params.id,
        req.body
      );
      if (!productBase) {
        return res.status(404).json({ message: 'ProductBase not found' });
      }
      res.status(200).json({
        message: 'ProductBase updated successfully',
        data: productBase,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Failed to update ProductBase',
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const productBase = await productBaseService.deleteProductBase(
        req.params.id
      );
      if (!productBase) {
        return res.status(404).json({ message: 'ProductBase not found' });
      }
      res.status(200).json({
        message: 'ProductBase deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to delete ProductBase',
        error: error.message,
      });
    }
  }

  async search(req, res) {
    try {
      const { term } = req.query;
      if (!term) {
        return res.status(400).json({ message: 'Search term is required' });
      }
      const results = await productBaseService.searchProductBases(term);
      res.status(200).json({
        count: results.length,
        items: results,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to search ProductBases',
        error: error.message,
      });
    }
  }
}
