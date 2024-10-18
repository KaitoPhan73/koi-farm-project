const express = require('express');
const feedBackController = require('../controllers/feedBackController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Các API liên quan đến phản hồi
 */

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     tags: [Feedback]
 *     summary: Tạo phản hồi mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - koi
 *               - rating
 *             properties:
 *               customer:
 *                 type: string
 *                 description: ID của khách hàng
 *                 example: "615e63d9c8e7b63bb8c00001"
 *               koi:
 *                 type: string
 *                 description: ID của sản phẩm cá Koi
 *                 example: "615e63d9c8e7b63bb8c00002"
 *               rating:
 *                 type: number
 *                 description: Đánh giá từ 1 đến 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Nhận xét của khách hàng
 *                 example: "Cá rất khỏe mạnh và đẹp."
 *     responses:
 *       201:
 *         description: Phản hồi đã được tạo thành công.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.post('/', feedBackController.create);

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     tags: [Feedback]
 *     summary: Lấy tất cả phản hồi
 *     responses:
 *       200:
 *         description: Danh sách phản hồi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/', feedBackController.getAll);

/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     tags: [Feedback]
 *     summary: Lấy phản hồi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phản hồi đã tìm thấy.
 *       404:
 *         description: Không tìm thấy phản hồi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/:id', feedBackController.getById);

/**
 * @swagger
 * /feedbacks/{id}:
 *   patch:
 *     tags: [Feedback]
 *     summary: Cập nhật phản hồi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Đánh giá từ 1 đến 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Nhận xét của khách hàng
 *                 example: "Cá rất đẹp."
 *     responses:
 *       200:
 *         description: Phản hồi đã được cập nhật thành công.
 *       404:
 *         description: Không tìm thấy phản hồi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.patch('/:id', feedBackController.update);

/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     tags: [Feedback]
 *     summary: Xóa phản hồi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của phản hồi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phản hồi đã bị xóa thành công.
 *       404:
 *         description: Không tìm thấy phản hồi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.delete('/:id', feedBackController.delete);

module.exports = router;
