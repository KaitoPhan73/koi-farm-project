// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

/**
 * @swagger
 * /api/order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - quantity
 *               - imageUrl
 *     responses:
 *       201:
 *         description: Order item created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', orderItemController.createOrderItem);

/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: A list of order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 */
router.get('/', orderItemController.getAllOrderItems);

/**
 * @swagger
 * /api/order-items/{orderItemId}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: The order item
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:orderItemId', orderItemController.getOrderItemById);

/**
 * @swagger
 * /api/order-items/{orderItemId}:
 *   put:
 *     summary: Update an order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.put('/:orderItemId', orderItemController.updateOrderItem);

/**
 * @swagger
 * /api/order-items/{orderItemId}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: Order item deleted
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:orderItemId', orderItemController.deleteOrderItem);

module.exports = router;
