const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, adminOnly, getDashboard);

module.exports = router;