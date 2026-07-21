const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const getDashboard = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );

        res.json({
            totalProducts,
            totalUsers,
            totalOrders,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};