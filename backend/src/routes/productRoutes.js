// routes/koiRoutes.js
const express = require('express');
const {
    createKoi,
    getAllKois,
    getKoiById,
    updateKoi,
    deleteKoi
} = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Koi
 *   description: Các API liên quan đến cá Koi
 */

/**
 * @swagger
 * /api/kois:
 *   post:
 *     tags: [Koi]
 *     summary: Thêm cá Koi mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               origin:
 *                 type: string
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               age:
 *                 type: number
 *               size:
 *                 type: number
 *               personality:
 *                 type: string
 *               foodPerDay:
 *                 type: number
 *               filteringRate:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Consigned, Under Care]
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Cá Koi được thêm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', createKoi);

/**
 * @swagger
 * /api/kois:
 *   get:
 *     tags: [Koi]
 *     summary: Lấy danh sách tất cả cá Koi
 *     responses:
 *       200:
 *         description: Danh sách cá Koi
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/', getAllKois);

/**
 * @swagger
 * /api/kois/{id}:
 *   get:
 *     tags: [Koi]
 *     summary: Lấy cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cá Koi tìm thấy
 *       404:
 *         description: Không tìm thấy cá Koi
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:id', getKoiById);

/**
 * @swagger
 * /api/kois/{id}:
 *   put:
 *     tags: [Koi]
 *     summary: Cập nhật cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
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
 *               origin:
 *                 type: string
 *               breed:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               age:
 *                 type: number
 *               size:
 *                 type: number
 *               personality:
 *                 type: string
 *               foodPerDay:
 *                 type: number
 *               filteringRate:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Consigned, Under Care]
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Cá Koi đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy cá Koi
 *       500:
 *         description: Lỗi máy chủ
 */
router.put('/:id', updateKoi);

/**
 * @swagger
 * /api/kois/{id}:
 *   delete:
 *     tags: [Koi]
 *     summary: Xóa cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cá Koi đã được xóa
 *       404:
 *         description: Không tìm thấy cá Koi
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete('/:id', deleteKoi);

module.exports = router;
