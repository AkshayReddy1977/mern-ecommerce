const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    mockPayment
} = require("../controllers/paymentController");

router.post("/checkout", protect, mockPayment);

module.exports = router;