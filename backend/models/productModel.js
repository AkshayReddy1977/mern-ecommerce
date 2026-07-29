const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    brand: {
        type: String,
        required: [true, "Brand is required"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            name: String,
            rating: Number,
            comment: String,
        },
    ],
    numReviews: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
    type: String,
    default: ""
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;