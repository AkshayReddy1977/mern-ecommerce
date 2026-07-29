const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
console.log("auth =", auth);

const wishlistController = require("../controllers/wishlistController");
console.log("wishlistController =", wishlistController);

const protect = auth;

const {
    addToWishlist,
    getWishlist,
    removeWishlistItem,
} = wishlistController;

router.post("/", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/:id", protect, removeWishlistItem);

module.exports = router;