const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Koi
 *   description: Các API liên quan đến cá Koi
 */

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Koi]
 *     summary: Add a new Koi fish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Golden Koi"
 *               origin:
 *                 type: string
 *                 example: "Japan"
 *               breed:
 *                 type: string
 *                 example: "Kohaku"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: "Male"
 *               age:
 *                 type: number
 *                 example: 2
 *               size:
 *                 type: number
 *                 example: 30
 *               personality:
 *                 type: string
 *                 example: "Calm"
 *               foodPerDay:
 *                 type: number
 *                 example: 50
 *               filteringRate:
 *                 type: number
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Consigned, Under Care]
 *                 example: "Available"
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Certificate A"
 *     responses:
 *       201:
 *         description: Koi fish added successfully.
 *       400:
 *         description: Invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name is required"
 */

router.post('/product', productController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Koi]
 *     summary: Retrieve a list of all Koi fish
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit of items per page
 *     responses:
 *       200:
 *         description: A list of Koi fish.
 *       500:
 *         description: Internal server error.
 */

router.get('/', productController.getAll);

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
router.get('/:id', productController.getById);

/**
 * @swagger
 * /api/kois/{id}:
 *   put:
 *     tags: [Koi]
 *     summary: Update a Koi fish by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Koi fish
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
 *                 example: "Golden Koi"
 *               origin:
 *                 type: string
 *                 example: "Japan"
 *               breed:
 *                 type: string
 *                 example: "Kohaku"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: "Male"
 *               age:
 *                 type: number
 *                 example: 2
 *               size:
 *                 type: number
 *                 example: 30
 *               personality:
 *                 type: string
 *                 example: "Calm"
 *               foodPerDay:
 *                 type: number
 *                 example: 50
 *               filteringRate:
 *                 type: number
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Consigned, Under Care]
 *                 example: "Available"
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Certificate A"
 *     responses:
 *       200:
 *         description: Koi fish updated successfully.
 *       400:
 *         description: Invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Koi fish not found.
 *       500:
 *         description: Server error.
 */

router.put('/:id', productController.update);

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
router.delete('/:id', productController.delete);

module.exports = router;
