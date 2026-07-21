const User = require("../models/userModel");

// Get All Users
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.json({
            success: true,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getAllUsers
};