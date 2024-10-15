// routes/koiRoutes.js
const express = require("express");
const router = express.Router();
const koiController = require("../controllers/koiController");

router.post("/", koiController.create);
router.get("/", koiController.getPagination); // Sử dụng getPagination ở đây
router.get("/:id", koiController.getById);
router.put("/:id", koiController.update);
router.delete("/:id", koiController.delete);

module.exports = router;
