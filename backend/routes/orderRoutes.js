const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    updateOrderStatus,
    getAllOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);

router.get("/", protect, getMyOrders);

router.get("/all", protect, adminOnly, getAllOrders);

router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;