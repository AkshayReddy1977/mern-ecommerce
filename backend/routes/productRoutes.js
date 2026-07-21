const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productControllers");

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


const protect = require("../middleware/authMiddleware");
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
const adminOnly = require("../middleware/adminMiddleware");
router.delete("/:id", protect, adminOnly, deleteProduct);
module.exports = router;