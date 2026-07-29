const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// =======================================
// Dashboard Analytics
// =======================================
const getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();

        let totalRevenue = 0;

        orders.forEach(order => {
            totalRevenue += order.totalPrice;
        });

        const recentOrders = await Order.find()
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                recentOrders
            }
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