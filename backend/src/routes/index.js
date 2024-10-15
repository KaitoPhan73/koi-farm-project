// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes");
const koiRoutes = require("./koiRoutes");
const consignmentRoutes = require("./consignmentRoutes");
const orderRoutes = require("./orderRoutes");
const orderItemRoutes = require("./orderItemRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/kois", koiRoutes);
router.use("/consignments", consignmentRoutes);
router.use("/orders", orderRoutes);
router.use("/order-items", orderItemRoutes);

module.exports = router;
