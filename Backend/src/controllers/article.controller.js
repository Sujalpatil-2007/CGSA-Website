const Article = require("../models/article.model");
const userModel = require("../models/user.model");

/**
 * @name createArticle
 * @description create a article
 * @access Public
 */

const createArticle = async (req, res) => {
  const { title, category, description, image, content } = req.body;

  if (!title || !category || !description || !image || !content) {
    return res.status(400).json({
      message: "Please provide title, category, description,image and content",
    });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const article = await Article.create({
      title,
      category,
      description,
      image,
      content,
      author: req.user.id,
    });
    res.status(201).json({
      message: "Article submitted successfully",
      article,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @name getAllArticles
 * @description get the all articles
 * @access Public
 */

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      status: "Approved",
    })
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      articles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * @name getOneArticles
 * @description get the single article
 * @access Public
 */

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      status: "Approved",
    }).populate("author", "username email");

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @name getMyOneArticles
 * @description get the My single article
 * @access Public
 */

const getMyArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user.id,
    })
      .populate("author", "username email")
      .populate("reviewedBy", "username");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * @name updateArticle
 * @description update an article
 * @access private
 */

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (article.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const allowedUpdates = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      content: req.body.content,
    };

    // Send back for review if it was rejected or changes requested
    if (
      article.status === "Rejected" ||
      article.status === "Changes Requested"
    ) {
      allowedUpdates.status = "Pending";
      allowedUpdates.feedback = "";
      allowedUpdates.reviewedBy = null;
      allowedUpdates.reviewedAt = null;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: allowedUpdates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * @name deleteArticle
 * @description delete  article
 * @access private
 */

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    const user = await userModel.findById(req.user.id);

    // Allow if author OR super admin
    const isAuthor = article.author.toString() === req.user.id;

    const isAdmin = user.isSuperAdmin;

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this article",
      });
    }

    await article.deleteOne();

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * @name getMyArticles
 * @description get all the articles of loged in user.
 * @access private
 */
const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate("author", "username email");

    return res.status(200).json({
      success: true,
      articles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
  getMyArticleById,
};
