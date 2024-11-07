// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
<<<<<<< HEAD
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
=======
 *   name: Users
 *   description: User management routes
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 */

/**
 * @swagger
 * /users:
 *   post:
<<<<<<< HEAD
 *     tags: [User]
 *     summary: Tạo người dùng mới
=======
 *     summary: Create a new user
 *     tags: [Users]
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< HEAD
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', userController.create);
=======
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
// router.post('/', userController.create);
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029

/**
 * @swagger
 * /users:
 *   get:
<<<<<<< HEAD
 *     tags: [User]
 *     summary: Lấy danh sách người dùng
=======
 *     summary: Get users with pagination
 *     tags: [Users]
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
<<<<<<< HEAD
 *         description: Số trang
=======
 *         description: Page number for pagination
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
<<<<<<< HEAD
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
=======
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users with pagination
 *       500:
 *         description: Internal server error
 */
router.get('/', userController.getPagination);
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029

/**
 * @swagger
 * /users/{id}:
 *   get:
<<<<<<< HEAD
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
=======
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /users/{id}:
<<<<<<< HEAD
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
=======
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< HEAD
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.patch('/:id', userController.update);
=======
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', userController.update);
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029

/**
 * @swagger
 * /users/{id}:
 *   delete:
<<<<<<< HEAD
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
=======
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
>>>>>>> 3d33f7f842df5c90dd52bb82b91d0c1a038cd029
 */
router.delete('/:id', userController.delete);

module.exports = router;
