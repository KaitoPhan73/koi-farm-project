const productBaseService = require('../services/productBaseService');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

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
      const {
        page,
        limit,
        category,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
        search,
        status,
      } = req.query;

      const filters = {
        category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        status,
        search,
      };

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: sortBy
          ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
          : { createdAt: -1 },
      };

      const productsData = await productBaseService.getAllProductBases(
        filters,
        options
      );

      if (page && limit) {
        const { productBases, totalItems, totalPages } = productsData;
        return res.status(200).json({
          success: true,
          page: options.page,
          limit: options.limit,
          totalPages,
          totalItems,
          items: productBases,
        });
      }

      return res.status(200).json({
        success: true,
        items: productsData,
      });
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch ProductBases', error.message);
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
module.exports = new ProductBaseController();
