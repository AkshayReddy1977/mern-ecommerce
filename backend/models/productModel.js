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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;