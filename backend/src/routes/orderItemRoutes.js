// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

/**
 * @swagger
 * tags:
 *   name: OrderItem
 *   description: OrderItem management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: ID của sản phẩm
 *         quantity:
 *           type: number
 *           minimum: 1
 *           description: Số lượng sản phẩm
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Giá của sản phẩm tại thời điểm đặt hàng
 */

/**
 * @swagger
 * /order-items:
 *   post:
 *     tags: [OrderItem]
 *     summary: Tạo một order item mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Order item đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', orderItemController.create);

/**
 * @swagger
 * /order-items:
 *   get:
 *     tags: [OrderItem]
 *     summary: Lấy danh sách order items
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
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi server
 */
router.get('/', orderItemController.getPagination);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     tags: [OrderItem]
 *     summary: Lấy thông tin order item theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của order item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy order item
 */
router.get('/:id', orderItemController.getById);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     tags: [OrderItem]
 *     summary: Cập nhật thông tin order item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của order item
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy order item
 */
router.put('/:id', orderItemController.update);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     tags: [OrderItem]
 *     summary: Xóa order item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của order item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy order item
 */
router.delete('/:id', orderItemController.delete);

module.exports = router;
