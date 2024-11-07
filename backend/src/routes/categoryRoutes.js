const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Tên danh mục
 *         description:
 *           type: string
 *           description: Mô tả danh mục
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Danh mục đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Category]
 *     summary: Lấy danh sách danh mục
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
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Lấy thông tin danh mục theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /categories/name/{name}:
 *   get:
 *     tags: [Category]
 *     summary: Lấy thông tin danh mục theo tên
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Tên danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get('/name/:name', categoryController.getByName);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags: [Category]
 *     summary: Cập nhật thông tin danh mục
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.patch('/:id', categoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Xóa danh mục
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete('/:id', categoryController.delete);

module.exports = router;
