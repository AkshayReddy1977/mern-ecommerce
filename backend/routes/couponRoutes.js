const express = require("express");
const router = express.Router();

const {
    createCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Admin
router.post("/", protect, adminOnly, createCoupon);
router.get("/", protect, adminOnly, getCoupons);
router.delete("/:id", protect, adminOnly, deleteCoupon);

// User
router.post("/apply", protect, applyCoupon);

module.exports = router;