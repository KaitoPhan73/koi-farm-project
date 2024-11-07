const express = require('express');
const router = express.Router();
const productBaseController = require('../controllers/productBaseController');

/**
 * @swagger
 * tags:
 *   name: ProductBase
 *   description: ProductBase management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductBase:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - breed
 *         - origin
 *         - basePrice
 *       properties:
 *         name:
 *           type: string
 *           description: Tên của sản phẩm cơ bản
 *         category:
 *           type: string
 *           description: ID của danh mục
 *         breed:
 *           type: string
 *           description: Giống cá
 *         origin:
 *           type: string
 *           description: Xuất xứ
 *         personality:
 *           type: string
 *           description: Đặc điểm tính cách
 *         imageUrl:
 *           type: string
 *           description: URL hình ảnh
 *         basePrice:
 *           type: number
 *           description: Giá cơ bản
 */

/**
 * @swagger
 * /product-bases:
 *   post:
 *     tags: [ProductBase]
 *     summary: Tạo một sản phẩm cơ bản mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBase'
 *     responses:
 *       201:
 *         description: Sản phẩm cơ bản đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', productBaseController.create);

/**
 * @swagger
 * /product-bases:
 *   get:
 *     tags: [ProductBase]
 *     summary: Lấy danh sách sản phẩm cơ bản với filter
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số lượng item trên mỗi trang
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: ID của danh mục để lọc
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Giá tối thiểu
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Giá tối đa
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên hoặc mô tả
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, basePrice, createdAt]
 *         description: Sắp xếp theo trường
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Thứ tự sắp xếp
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         description: Lọc theo giống
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Lọc theo xuất xứ
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductBase'
 *       500:
 *         description: Lỗi server
 */
router.get('/', productBaseController.getAll);

/**
 * @swagger
 * /product-bases/search:
 *   get:
 *     tags: [ProductBase]
 *     summary: Tìm kiếm sản phẩm cơ bản
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: Từ khóa tìm kiếm
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: ID của danh mục để lọc
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Giá tối thiểu
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Giá tối đa
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductBase'
 *       400:
 *         description: Thiếu từ khóa tìm kiếm
 */
router.get('/search', productBaseController.search);

/**
 * @swagger
 * /product-bases/{id}:
 *   get:
 *     tags: [ProductBase]
 *     summary: Lấy thông tin sản phẩm cơ bản theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cơ bản
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/:id', productBaseController.getById);

/**
 * @swagger
 * /product-bases/{id}:
 *   patch:
 *     tags: [ProductBase]
 *     summary: Cập nhật thông tin sản phẩm cơ bản
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cơ bản
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBase'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.patch('/:id', productBaseController.update);

/**
 * @swagger
 * /product-bases/{id}:
 *   delete:
 *     tags: [ProductBase]
 *     summary: Xóa sản phẩm cơ bản
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cơ bản
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete('/:id', productBaseController.delete);

module.exports = router;
