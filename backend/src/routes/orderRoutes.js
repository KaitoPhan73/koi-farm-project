// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Các API liên quan đến đơn hàng
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Order]
 *     summary: Tạo một đơn hàng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - items
 *               - totalAmount
 *             properties:
 *               customer:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5f483f1b3c45e4a5ed8f7"
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *                   example: "60d5f4a2f1b3c45e4a5ed8f8"
 *               totalAmount:
 *                 type: number
 *                 example: 150.75
 *               status:
 *                 type: string
 *                 enum: [Pending, Processing, Shipped, Completed, Cancelled]
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Đơn hàng đã được tạo thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.post('/', orderController.create);

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Lấy danh sách tất cả đơn hàng
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: >
 *           Số trang cho phân trang (ví dụ: 1, 2, 3)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: >
 *           Giới hạn số lượng đơn hàng mỗi trang (ví dụ: 10, 20, 50)
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/', orderController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Lấy thông tin một đơn hàng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đơn hàng đã tìm thấy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Đơn hàng không tìm thấy.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/:id', orderController.getById);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     tags: [Order]
 *     summary: Cập nhật thông tin một đơn hàng theo ID
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
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 format: ObjectId
 *                 example: "60d5f483f1b3c45e4a5ed8f7"
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *                   example: "60d5f4a2f1b3c45e4a5ed8f8"
 *               totalAmount:
 *                 type: number
 *                 example: 150.75
 *               status:
 *                 type: string
 *                 enum: [Pending, Processing, Shipped, Completed, Cancelled]
 *                 example: "Processing"
 *     responses:
 *       200:
 *         description: Đơn hàng đã được cập nhật thành công.
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *       404:
 *         description: Đơn hàng không tìm thấy.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.patch('/:id', orderController.update);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Xóa một đơn hàng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Đơn hàng đã được xóa.
 *       404:
 *         description: Đơn hàng không tìm thấy.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.delete('/:id', orderController.delete);

module.exports = router;
