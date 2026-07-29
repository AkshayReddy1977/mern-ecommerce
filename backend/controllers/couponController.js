const Coupon = require("../models/couponModel");

// =======================================
// Create Coupon
// =======================================
const createCoupon = async (req, res) => {
    try {

        const {
            code,
            discount,
            type,
            minOrderAmount,
            expiryDate
        } = req.body;

        const couponExists = await Coupon.findOne({
            code: code.toUpperCase()
        });

        if (couponExists) {
            return res.status(400).json({
                success: false,
                message: "Coupon already exists"
            });
        }

        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discount,
            type,
            minOrderAmount,
            expiryDate
        });

        res.status(201).json({
            success: true,
            data: coupon
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =======================================
// Get All Coupons
// =======================================
const getCoupons = async (req, res) => {
    try {

        const coupons = await Coupon.find();

        res.status(200).json({
            success: true,
            count: coupons.length,
            data: coupons
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =======================================
// Delete Coupon
// =======================================
const deleteCoupon = async (req, res) => {
    try {

        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        await Coupon.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =======================================
// Apply Coupon
// =======================================
const applyCoupon = async (req, res) => {
    try {

        const { code, cartTotal } = req.body;

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid coupon"
            });
        }

        if (new Date() > coupon.expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Coupon expired"
            });
        }

        if (cartTotal < coupon.minOrderAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum order should be ₹${coupon.minOrderAmount}`
            });
        }

        let discountAmount = 0;

        if (coupon.type === "percentage") {

            discountAmount =
                (cartTotal * coupon.discount) / 100;

        } else {

            discountAmount = coupon.discount;

        }

        const finalAmount = Math.max(cartTotal - discountAmount, 0);

        res.status(200).json({
            success: true,
            coupon: coupon.code,
            discount: discountAmount,
            finalAmount
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
};