const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        discount: {
            type: Number,
            required: true
        },

        type: {
            type: String,
            enum: ["percentage", "fixed"],
            default: "percentage"
        },

        minOrderAmount: {
            type: Number,
            default: 0
        },

        expiryDate: {
            type: Date,
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Coupon", couponSchema);