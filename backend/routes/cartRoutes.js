const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

// Get logged-in user's cart
router.get("/", protect, getCart);

// Remove product from cart
router.delete("/:id", protect, removeFromCart);

module.exports = router;