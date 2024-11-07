// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - totalAmount
 *       properties:
 *         user:
 *           type: string
 *           description: ID của người dùng
 *         items:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách ID của các OrderItem
 *         totalAmount:
 *           type: number
 *           description: Tổng số tiền
 *         status:
 *           type: string
 *           enum: [Pending, Processing, Shipped, Completed, Cancelled]
 *           description: Trạng thái đơn hàng
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Ngày đặt hàng
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Order]
 *     summary: Tạo đơn hàng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Đơn hàng đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', orderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Lấy danh sách đơn hàng
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
 *         name: status
 *         schema:
 *           type: string
 *         description: Trạng thái đơn hàng
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi server
 */
router.get('/', orderController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Lấy thông tin đơn hàng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.get('/:id', orderController.getById);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     tags: [Order]
 *     summary: Cập nhật thông tin đơn hàng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.patch('/:id', orderController.update);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Xóa đơn hàng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.delete('/:id', orderController.delete);

module.exports = router;
