const userModel = require("../models/user.model");

async function superAdmin(req, res, next) {
    try {
        // req.user comes from authUser middleware
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (!user.isSuperAdmin) {
            return res.status(403).json({
                message: "Access denied. Super Admin only."
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong.",
            error: err.message
        });
    }
}

module.exports = { superAdmin };