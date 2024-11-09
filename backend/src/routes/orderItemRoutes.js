// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

/**
 * @swagger
 * /order-items:
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
 *               product:
 *                 type: string
 *                 description: Product ID
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *             required:
 *               - product
 *               - name
 *               - price
 *               - quantity
 *     responses:
 *       201:
 *         description: Order item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     product:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         stock:
 *                           type: number
 *                         status:
 *                           type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     imageUrl:
 *                       type: string
 *       400:
 *         description: Bad request - Insufficient stock or Invalid product
 *       500:
 *         description: Internal server error
 */
router.post('/', orderItemController.createOrderItem);

/**
 * @swagger
 * /order-items:
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
 *                   _id:
 *                     type: string
 *                   product:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       stock:
 *                         type: number
 *                       status:
 *                         type: string
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
 * /order-items/{orderItemId}:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     stock:
 *                       type: number
 *                     status:
 *                       type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Order item not found
 */
router.get('/:orderItemId', orderItemController.getOrderItemById);

/**
 * @swagger
 * /order-items/{orderItemId}:
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
 *               quantity:
 *                 type: number
 *                 description: New quantity (will update product stock accordingly)
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       400:
 *         description: Bad request - Insufficient stock
 *       404:
 *         description: Order item not found
 */
router.put('/:orderItemId', orderItemController.updateOrderItem);

/**
 * @swagger
 * /order-items/{orderItemId}:
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
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete('/:orderItemId', orderItemController.deleteOrderItem);

module.exports = router;
