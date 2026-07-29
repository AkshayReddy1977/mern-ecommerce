
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

// User Routes
router.post("/", protect, placeOrder);
router.get("/", protect, getMyOrders);
// Admin Routes
router.get("/all", protect, adminOnly, getAllOrders);
router.get("/:id", protect, getSingleOrder);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;