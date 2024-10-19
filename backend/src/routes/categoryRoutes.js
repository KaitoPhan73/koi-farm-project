const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Các API liên quan đến danh mục
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Category]
 *     summary: Tạo danh mục mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục
 *                 example: "Cá Koi"
 *               description:
 *                 type: string
 *                 description: Mô tả danh mục
 *                 example: "Danh mục chứa các sản phẩm cá Koi."
 *     responses:
 *       201:
 *         description: Danh mục đã được tạo thành công.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Category]
 *     summary: Lấy tất cả danh mục
 *     responses:
 *       200:
 *         description: Danh sách danh mục.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Lấy danh mục theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh mục đã tìm thấy.
 *       404:
 *         description: Không tìm thấy danh mục.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /categories/name/{name}:
 *   get:
 *     tags: [Category]
 *     summary: Lấy danh mục theo tên
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Tên của danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh mục đã tìm thấy.
 *       404:
 *         description: Không tìm thấy danh mục.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/name/:name', categoryController.getByName);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags: [Category]
 *     summary: Cập nhật danh mục theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục
 *                 example: "Cá Koi Nhập Khẩu"
 *               description:
 *                 type: string
 *                 description: Mô tả danh mục
 *                 example: "Danh mục chứa các sản phẩm cá Koi nhập khẩu."
 *     responses:
 *       200:
 *         description: Danh mục đã được cập nhật thành công.
 *       404:
 *         description: Không tìm thấy danh mục.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.patch('/:id', categoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Xóa danh mục theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh mục đã bị xóa thành công.
 *       404:
 *         description: Không tìm thấy danh mục.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.delete('/:id', categoryController.delete);

module.exports = router;
