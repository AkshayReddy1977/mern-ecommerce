const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
            success: false,
            message: "No token, access denied"
            });
        }

        const token = authHeader.split(" ")[1];
        

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token, access denied"
            });
        }

        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "please login first"
        });
    }
};
module.exports = protect;