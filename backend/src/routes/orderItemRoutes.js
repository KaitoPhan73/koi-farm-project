// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.post('/', orderItemController.create);
router.get('/', orderItemController.getPagination); // Sử dụng getPagination ở đây
router.get('/:id', orderItemController.getById);
router.put('/:id', orderItemController.update);
router.delete('/:id', orderItemController.delete);

module.exports = router;
