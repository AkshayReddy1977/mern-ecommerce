const Wishlist = require("../models/wishlistModel");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        const alreadyExists = await Wishlist.findOne({
            user: req.user.id,
            product: productId
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        const wishlist = await Wishlist.create({
            user: req.user.id,
            product: productId
        });

        res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            data: wishlist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({
            user: req.user.id
        }).populate("product");

        res.status(200).json({
            success: true,
            count: wishlist.length,
            data: wishlist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Remove Wishlist Item
const removeWishlistItem = async (req, res) => {
    try {

        const wishlist = await Wishlist.findById(req.params.id);

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });
        }

        await Wishlist.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Removed from wishlist"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeWishlistItem
};