const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - user
 *         - product
 *         - rating
 *         - comment
 *       properties:
 *         user:
 *           type: string
 *           description: ID của người dùng
 *         product:
 *           type: string
 *           description: ID của sản phẩm
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Đánh giá (1-5 sao)
 *         comment:
 *           type: string
 *           description: Nội dung đánh giá
 *         status:
 *           type: string
 *           enum: [Pending, Approved, Rejected]
 *           description: Trạng thái của đánh giá
 */

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     tags: [Feedback]
 *     summary: Tạo một đánh giá mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       201:
 *         description: Đánh giá đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', feedbackController.create);

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     tags: [Feedback]
 *     summary: Lấy danh sách đánh giá
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
 *         name: product
 *         schema:
 *           type: string
 *         description: Lọc theo sản phẩm
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lọc theo trạng thái
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi server
 */
router.get('/', feedbackController.getAll);

/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     tags: [Feedback]
 *     summary: Lấy thông tin đánh giá theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đánh giá
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy đánh giá
 */
router.get('/:id', feedbackController.getById);

/**
 * @swagger
 * /feedbacks/{id}:
 *   put:
 *     tags: [Feedback]
 *     summary: Cập nhật thông tin đánh giá
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đánh giá
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy đánh giá
 */
router.put('/:id', feedbackController.update);

/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     tags: [Feedback]
 *     summary: Xóa đánh giá
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đánh giá
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy đánh giá
 */
router.delete('/:id', feedbackController.delete);

module.exports = router;
