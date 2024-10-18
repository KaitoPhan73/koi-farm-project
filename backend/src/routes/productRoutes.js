const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: API Management
 *   description: Các API liên quan đến cá Koi
 */

/**
 * @swagger
 * /kois/product:
 *   post:
 *     tags: [Koi]
 *     summary: Add a new Koi fish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - origin
 *               - breed
 *               - gender
 *               - age
 *               - size
 *               - price
 *               - healthStatus
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
 *               dailyFeedAmount:
 *                 type: number
 *                 description: Amount of food per day in grams
 *                 example: 50
 *               screeningRate:
 *                 type: number
 *                 description: Screening rate in percentage
 *                 example: 3
 *               healthStatus:
 *                 type: string
 *                 description: Health status of the Koi fish
 *                 example: "Healthy"
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the Koi fish
 *                 example: "https://example.com/image.jpg"
 *               price:
 *                 type: number
 *                 description: Price of the Koi fish
 *                 example: 200
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Pending, Not for Sale]
 *                 example: "Available"
 *               isImportedPurebred:
 *                 type: boolean
 *                 description: Whether the Koi is an imported purebred
 *                 example: true
 *               isF1Hybrid:
 *                 type: boolean
 *                 description: Whether the Koi is an F1 hybrid
 *                 example: false
 *               isPureVietnamese:
 *                 type: boolean
 *                 description: Whether the Koi is purely Vietnamese
 *                 example: false
 *     responses:
 *       201:
 *         description: Koi fish added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Koi fish added successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Koi'
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
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Age must be a positive number."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post('/product', productController.create);

/**
 * @swagger
 * /kois/products:
 *   get:
 *     tags: [Koi]
 *     summary: Retrieve a list of all Koi fish
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (e.g., 1, 2, 3)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Limit of items per page (e.g., 10, 20, 50)
 *     responses:
 *       200:
 *         description: A list of Koi fish.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of Koi fish available.
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page.
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Bad request. Invalid query parameters.
 *       404:
 *         description: No Koi fish found.
 *       500:
 *         description: Internal server error.
 */
router.get('/products', productController.getAll);

/**
 * @swagger
 * /kois/product/{id}:
 *   get:
 *     tags: [Koi]
 *     summary: Retrieve a Koi fish by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Koi fish
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Koi fish found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Invalid ID format.
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
 *         description: Internal server error.
 */
router.get('/product/:id', productController.getById);

/**
 * @swagger
 * /kois/product/{id}:
 *   patch:
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
 *                 example: 3
 *               size:
 *                 type: number
 *                 example: 35
 *               personality:
 *                 type: string
 *                 example: "Energetic"
 *               dailyFeedAmount:
 *                 type: number
 *                 description: Amount of food per day in grams
 *                 example: 60
 *               screeningRate:
 *                 type: number
 *                 description: Screening rate in percentage
 *                 example: 4
 *               healthStatus:
 *                 type: string
 *                 description: Health status of the Koi fish
 *                 example: "Healthy"
 *               imageUrl:
 *                 type: string
 *                 description: Image URL of the Koi fish
 *                 example: "https://example.com/new-image.jpg"
 *               price:
 *                 type: number
 *                 description: Price of the Koi fish
 *                 example: 220
 *               status:
 *                 type: string
 *                 enum: [Available, Sold, Pending, Not for Sale]
 *                 example: "Available"
 *               isImportedPurebred:
 *                 type: boolean
 *                 description: Whether the Koi is an imported purebred
 *                 example: true
 *               isF1Hybrid:
 *                 type: boolean
 *                 description: Whether the Koi is an F1 hybrid
 *                 example: false
 *               isPureVietnamese:
 *                 type: boolean
 *                 description: Whether the Koi is purely Vietnamese
 *                 example: false
 *     responses:
 *       200:
 *         description: Koi fish updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Koi fish updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Invalid ID or data.
 *       404:
 *         description: Koi fish not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/product/:id', productController.update);

/**
 * @swagger
 * /kois/product/{id}:
 *   delete:
 *     tags: [Koi]
 *     summary: Delete a Koi fish by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Koi fish
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Koi fish deleted.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Koi fish not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/product/:id', productController.delete);

module.exports = router;
