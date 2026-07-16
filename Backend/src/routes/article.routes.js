const express = require("express");
const articleController = require("../controllers/article.controller");
const articleRouter = express.Router();
const { authUser } = require("../middlewares/auth.middleware");

articleRouter.get("/", articleController.getAllArticles);
articleRouter.get("/my", authUser, articleController.getMyArticles);
articleRouter.get("/my/:id",authUser,articleController.getMyArticleById);

articleRouter.get("/:id", articleController.getArticleById);

articleRouter.post("/create", authUser, articleController.createArticle);
articleRouter.put("/:id", authUser, articleController.updateArticle);
articleRouter.delete("/:id", authUser, articleController.deleteArticle);

module.exports = articleRouter;
