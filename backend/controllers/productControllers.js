const Product = require("../models/productModel");

// CREATE PRODUCT
const createProduct = async (req,res)=>{
    try{

        const {
            name,
            description,
            price,
            brand,
            stock,
            category
        } = req.body;


        const product = await Product.create({
            name,
            description,
            price,
            brand,
            stock,
            category,
            image:req.body.image

        });


        res.status(201).json({
            success:true,
            data:product
        });


    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }
};
const getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// GET PRODUCTS
const getProducts = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }
            : {};

        const category = req.query.category
            ? {
                category: req.query.category
            }
            : {};

        const minPrice = req.query.min
            ? Number(req.query.min)
            : 0;

        const maxPrice = req.query.max
            ? Number(req.query.max)
            : Number.MAX_SAFE_INTEGER;

        const products = await Product.find({
            ...keyword,
            ...category,
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("category");

        const totalProducts = await Product.countDocuments({
            ...keyword,
            ...category,
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        });

        res.json({
            success: true,
            page,
            pages: Math.ceil(totalProducts / limit),
            totalProducts,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const searchProducts = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";

        const products = await Product.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        }).populate("category");

        res.json({
            success: true,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const filterProducts = async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate("category");

        res.json({
            success: true,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user.id
        );

        if (alreadyReviewed) {
            alreadyReviewed.rating = Number(rating);
            alreadyReviewed.comment = comment;
        } else {
            product.reviews.push(review);
        }

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Review submitted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    createProductReview,
};