// routes/consignmentRoutes.js
const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');

router.post('/', consignmentController.create);
router.get('/', consignmentController.getAll);
router.get('/:id', consignmentController.getById);
router.put('/:id', consignmentController.update);
router.delete('/:id', consignmentController.delete);

module.exports = router;
