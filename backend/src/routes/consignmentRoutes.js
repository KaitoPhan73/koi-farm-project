const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');

/**
 * @swagger
 * /consignments:
 *   post:
 *     summary: Tạo một đơn đăng ký mới
 *     description: Tạo một đơn đăng ký gửi cá Koi mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsignmentRequest'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công!
 *                 consignment:
 *                   $ref: '#/components/schemas/Consignment'
 *       500:
 *         description: Lỗi khi tạo đơn đăng ký
 *   get:
 *     summary: Lấy tất cả các đơn đăng ký
 *     description: Lấy danh sách tất cả các đơn đăng ký gửi cá Koi
 *     responses:
 *       200:
 *         description: Danh sách các đơn đăng ký
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consignment'
 *       500:
 *         description: Lỗi khi lấy danh sách
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConsignmentRequest:
 *       type: object
 *       required:
 *         - name
 *         - contact
 *         - email
 *         - address
 *         - koiType
 *         - selectedMethod
 *         - comments
 *       properties:
 *         name:
 *           type: string
 *           example: Nguyễn Văn A
 *         contact:
 *           type: string
 *           example: 0123456789
 *         email:
 *           type: string
 *           example: a@example.com
 *         address:
 *           type: string
 *           example: Hà Nội
 *         koiType:
 *           type: string
 *           example: Type 1
 *         comments:
 *           type: string
 *           example: Mô tả về các cá Koi
 *         selectedType:
 *           type: string
 *           example: type2
 *         selectedMethod:
 *           type: string
 *           example: online
 *     Consignment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         contact:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         koiType:
 *           type: string
 *         comments:
 *           type: string
 *         selectedType:
 *           type: string
 *         selectedMethod:
 *           type: string
 *         user:
 *           type: string
 *           example: 641dfc28b5f0a5e9c7a8a732
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.post('/', consignmentController.createConsignment);

router.get('/', consignmentController.getAllConsignments);

module.exports = router;
