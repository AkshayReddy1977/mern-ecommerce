const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

// =======================================
// Place Order
// =======================================
const placeOrder = async (req, res) => {
    try {

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

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
            totalPrice,
            status: "Pending"
        });

        await Cart.deleteMany({
            user: req.user.id
        });

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

// =======================================
// Get Logged-in User Orders
// =======================================
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id
        })
        .populate("products.product");

        res.status(200).json({
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

// =======================================
// Get Single Order
// =======================================
const getSingleOrder = async (req, res) => {

    try {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                success:false,
                message:"Invalid Order ID"
            });
        }


        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("products.product");


        if (!order) {
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }


        res.status(200).json({
            success:true,
            data:order
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};
// =======================================
// Get All Orders (Admin)
// =======================================
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json({
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

// =======================================
// Update Order Status (Admin)
// =======================================
const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = req.body.status || order.status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus
};