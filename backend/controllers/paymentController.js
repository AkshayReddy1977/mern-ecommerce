const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// ===============================
// Mock Online Payment
// ===============================
const mockPayment = async (req, res) => {
    try {

        const {
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const order = await Order.create({

            user: req.user.id,

            orderItems: cartItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),

            shippingAddress,

            paymentMethod,

            totalPrice,

            paymentStatus: "Paid",

            orderStatus: "Processing"

        });

        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({

            success: true,

            message: "Payment Successful",

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
    mockPayment
};