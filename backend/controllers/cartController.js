const Cart = require("../models/cartModel");

// Add Product to Cart
const addToCart = async (req, res) => {
    try {

        const { product, quantity } = req.body;

        let cartItem = await Cart.findOne({
            user: req.user.id,
            product,
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();

            return res.json({
                success: true,
                data: cartItem,
            });
        }

        cartItem = await Cart.create({
            user: req.user.id,
            product,
            quantity,
        });

        res.status(201).json({
            success: true,
            data: cartItem,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.json({
            success: true,
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const removeFromCart = async (req, res) => {
    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        await cartItem.deleteOne();

        res.json({
            success: true,
            message: "Item removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    addToCart,
    getCart,
    removeFromCart
};
