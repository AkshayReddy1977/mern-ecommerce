const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getSingleUser,
    deleteUser,
    changeUserRole
} = require("../controllers/userController");

// ============================
// Admin Routes
// ============================

// Get all users
router.get("/", protect, adminOnly, getAllUsers);

// Get single user
router.get("/:id", protect, adminOnly, getSingleUser);

// Delete user
router.delete("/:id", protect, adminOnly, deleteUser);

// Change user role
router.put("/:id/role", protect, adminOnly, changeUserRole);

module.exports = router;