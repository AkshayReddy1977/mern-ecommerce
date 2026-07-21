const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

// Place Order
const placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user.id }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalPrice = 0;

        const products = cartItems.map(item => {
            totalPrice += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };
        });

        const order = await Order.create({
            user: req.user.id,
            products,
            totalPrice
        });

        await Cart.deleteMany({ user: req.user.id });

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get My Orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
    router.get(
    "/all",
    protect,
    adminOnly,
    getAllOrders
);

};
module.exports = {
    placeOrder,
    getMyOrders,
    updateOrderStatus,
    getAllOrders
};