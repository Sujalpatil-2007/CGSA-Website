const express = require("express");

const adminRouter = express.Router();

const { authUser } = require("../middlewares/auth.middleware");
const { superAdmin } = require("../middlewares/superAdmin.middleware");

// Temporary route to test access
adminRouter.get("/dashboard", authUser, superAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome Super Admin!",
  });
});

module.exports = adminRouter;
