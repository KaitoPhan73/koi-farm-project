const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - size
 *         - age
 *         - gender
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Tên sản phẩm
 *         category:
 *           type: string
 *           description: ID của danh mục
 *         breed:
 *           type: string
 *           description: Giống cá
 *         origin:
 *           type: string
 *           description: Xuất xứ
 *         size:
 *           type: string
 *           enum: [S, M, L]
 *           description: Kích thước
 *         descriptionSize:
 *           type: string
 *           description: Mô tả kích thước
 *         age:
 *           type: number
 *           description: Tuổi của cá
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: Giới tính của cá
 *         price:
 *           type: number
 *           description: Giá bán
 *         stock:
 *           type: number
 *           description: Số lượng trong kho
 *         personality:
 *           type: string
 *           description: Đặc điểm tính cách
 *         imageUrl:
 *           type: string
 *           description: URL hình ảnh
 *         status:
 *           type: string
 *           enum: [Available, Sold, Pending, Not for Sale]
 *           description: Trạng thái sản phẩm
 *         saleType:
 *           type: string
 *           enum: [Individual, Batch]
 *           description: Kiểu bán hàng (Cá thể hoặc Lô)
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: Tạo một sản phẩm mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - size
 *               - age
 *               - gender
 *               - price
 *               - saleType
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               breed:
 *                 type: string
 *               origin:
 *                 type: string
 *               size:
 *                 type: string
 *               descriptionSize:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               price:
 *                 type: number
 *               saleType:
 *                 type: string
 *                 enum: [Individual, Batch]
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', productController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Lấy danh sách sản phẩm
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
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: ID của danh mục để lọc (alias for category)
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
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Male, Female]
 *         description: Giới tính của cá
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Sold, Pending, Not for Sale]
 *         description: Trạng thái sản phẩm
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, age, createdAt, name]
 *         description: Trường để sắp xếp
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Thứ tự sắp xếp
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên hoặc mô tả
 *       - in: query
 *         name: saleType
 *         schema:
 *           type: string
 *           enum: [Individual, Batch]
 *         description: Lọc theo kiểu bán hàng (Cá thể hoặc Lô)
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
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Product'
 *                       totalItems:
 *                         type: number
 *                       totalPages:
 *                         type: number
 *       500:
 *         description: Lỗi server
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Product]
 *     summary: Tìm kiếm sản phẩm
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
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
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi server
 */
router.get('/search', productController.search);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Lấy thông tin sản phẩm theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags: [Product]
 *     summary: Cập nhật thông tin sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.patch('/:id', productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Xóa sản phẩm
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete('/:id', productController.delete);

module.exports = router;
