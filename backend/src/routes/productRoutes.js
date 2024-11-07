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
 *         - productBase
 *         - size
 *         - age
 *         - gender
 *         - price
 *       properties:
 *         productBase:
 *           type: string
 *           description: ID của ProductBase
 *         size:
 *           type: number
 *           description: Kích thước của cá (cm)
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
 *         available:
 *           type: boolean
 *           description: Trạng thái có sẵn
 *         status:
 *           type: string
 *           enum: [Available, Sold, Pending, Not for Sale]
 *           description: Trạng thái sản phẩm
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
 *             $ref: '#/components/schemas/Product'
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
 *         description: Giới tính của cá
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Trạng thái sản phẩm
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Trường để sắp xếp
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Thứ tự sắp xếp
 *     responses:
 *       200:
 *         description: Thành công
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
 * /products/{categoryId}:
 *   get:
 *     tags: [Product]
 *     summary: Lấy danh sách cá Koi theo danh mục
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID của danh mục cá Koi
 *         schema:
 *           type: string
 *           example: "67135ffb22a6b877d0866c13"
 *     responses:
 *       200:
 *         description: Danh sách cá Koi theo danh mục.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Tổng số cá Koi trong danh mục.
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   description: Số trang hiện tại.
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Số lượng sản phẩm mỗi trang.
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Yêu cầu không hợp lệ. Tham số truy vấn không hợp lệ.
 *       404:
 *         description: Không tìm thấy cá Koi trong danh mục này.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/:categoryId', productController.getProductsByCategory);


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
