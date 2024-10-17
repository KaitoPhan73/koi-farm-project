// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.create);
router.get('/', orderController.getPagination); // Sử dụng getPagination ở đây
router.get('/:id', orderController.getById);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

module.exports = router;
