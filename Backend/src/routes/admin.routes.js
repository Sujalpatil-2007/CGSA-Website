const express = require("express");

const adminRouter = express.Router();

const { authUser } = require("../middlewares/auth.middleware");
const { superAdmin } = require("../middlewares/superAdmin.middleware");
const adminController = require("../controllers/admin.controller");

adminRouter.get(
  "/dashboard",
  authUser,
  superAdmin,
  adminController.getDashboardStats,
);

adminRouter.get(
  "/articles/pending",
  authUser,
  superAdmin,
  adminController.getPendingArticles,
);

adminRouter.get(
  "/articles/pending",
  authUser,
  superAdmin,
  adminController.getPendingArticles,
);

adminRouter.patch(
  "/articles/:id/approve",
  authUser,
  superAdmin,
  adminController.approveArticle,
);

adminRouter.patch(
  "/articles/:id/reject",
  authUser,
  superAdmin,
  adminController.rejectArticle,
);

adminRouter.patch(
  "/articles/:id/request-changes",
  authUser,
  superAdmin,
  adminController.requestChangesArticle,
);

adminRouter.get(
    "/articles",
    authUser,
    superAdmin,
    adminController.getAllArticles
);

adminRouter.get(
  "/articles/:id",
  authUser,
  superAdmin,
  adminController.getArticleById
);

module.exports = adminRouter;