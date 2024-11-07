// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - fullName
 *         - email
 *         - phone
 *         - address
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Tên đăng nhập
 *         fullName:
 *           type: string
 *           description: Họ và tên
 *         email:
 *           type: string
 *           format: email
 *           description: Email
 *         phone:
 *           type: string
 *           description: Số điện thoại
 *         address:
 *           type: string
 *           description: Địa chỉ
 *         role:
 *           type: string
 *           enum: [Customer, Staff, Manager, Admin]
 *           description: Vai trò người dùng
 *         status:
 *           type: string
 *           enum: [Active, Inactive, Banned]
 *           description: Trạng thái tài khoản
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Tạo người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', userController.create);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Lấy danh sách người dùng
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
 *         name: role
 *         schema:
 *           type: string
 *         description: Lọc theo vai trò
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
router.get('/', userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Lấy thông tin người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [User]
 *     summary: Cập nhật thông tin người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.patch('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Xóa người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete('/:id', userController.delete);

module.exports = router;
