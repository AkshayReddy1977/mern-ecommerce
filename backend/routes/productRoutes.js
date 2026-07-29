const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    createProductReview,
} = require("../controllers/productControllers");

const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
router.get("/:id", getSingleProduct);

// Protected Route
router.post("/:id/review", protect, createProductReview);

// Admin Routes
router.post(
    "/",
    protect,
    adminOnly,
    createProduct
);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;