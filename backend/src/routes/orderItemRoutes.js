// routes/OrderItemRoutes.js
const express = require("express");
const OrderItemController = require("../controllers/OrderItemController");

const router = express.Router();

/**
 * @swagger
 *  /order-items:
 *   get:
 *     summary: Lấy danh sách tất cả các đơn hàng
 *     description: Lấy tất cả các đơn hàng từ hệ thống
 *     tags: [OrderItem]
 *     responses:
 *       200:
 *         description: Danh sách các đơn hàng
 *       500:
 *         description: Lỗi server
 */
router.get("/", OrderItemController.getAllOrderItem);

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Tạo một đơn hàng mới
 *     description: Tạo một đơn hàng mới với thông tin các sản phẩm trong giỏ hàng
 *     tags: [OrderItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Đơn hàng đã được tạo
 *       500:
 *         description: Lỗi server
 */
router.post("/", OrderItemController.createOrder);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Lấy thông tin đơn hàng theo ID
 *     description: Lấy chi tiết đơn hàng dựa trên ID
 *     tags: [OrderItem]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của đơn hàng
 *     responses:
 *       200:
 *         description: Thông tin đơn hàng
 *       500:
 *         description: Lỗi server
 */
router.get("/:id", OrderItemController.getOrder);

/**
 * @swagger
 * /order-items/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái đơn hàng
 *     description: Cập nhật trạng thái của đơn hàng (Pending, Completed, Cancelled)
 *     tags: [OrderItem]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của đơn hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Completed, Cancelled]
 *                 description: Trạng thái mới của đơn hàng
 *     responses:
 *       200:
 *         description: Đơn hàng đã được cập nhật trạng thái
 *       500:
 *         description: Lỗi server
 */
router.put("/:id/status", OrderItemController.updateOrderStatus);

module.exports = router;
