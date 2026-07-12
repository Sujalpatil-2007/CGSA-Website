const userModel = require("../models/user.model");
const articleModel = require("../models/article.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const totalArticles = await articleModel.countDocuments();

    const pendingArticles = await articleModel.countDocuments({
      status: "Pending",
    });

    const approveArticles = await articleModel.countDocuments({
      status: "Approved",
    });

    const rejectedArticles = await articleModel.countDocuments({
      status: "Rejected",
    });

    const changesRequestedArticles = await articleModel.countDocuments({
      status: "Changes Requested",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalArticles,
        pendingArticles,
        approveArticles,
        rejectedArticles,
        changesRequestedArticles,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getPendingArticles = async (req, res) => {
  try {
    const pendingArticles = await articleModel
      .find({ status: "Pending" })
      .select("title category description image status createdAt author")
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: pendingArticles.length,
      articles: pendingArticles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const approveArticle = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        success: false,
      });
    }

    if (article.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending articles can be approved.",
      });
    }

    article.status = "Approved";
    article.reviewedBy = req.user.id;
    article.reviewedAt = new Date();
    article.feedback = "";

    await article.save();

    return res.status(200).json({
      success: true,
      message: "Article approved successfully",
      article,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectArticle = async (req, res) => {
  try {
    const { feedback } = req.body;

    const article = await articleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.status !== "Pending") {
      return res.status(400).json({
        success: false,

        message: "Only pending articles can be rejected.",
      });
    }

    if (!feedback) {
      return res.status(400).json({
        success: false,

        message: "Regect message is required.",
      });
    }

    article.status = "Rejected";
    article.feedback = feedback;
    article.reviewedBy = req.user.id;
    article.reviewedAt = new Date();

    await article.save();

    return res.status(200).json({
      success: true,
      message: "Article rejected successfully",
      article,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const requestChangesArticle = async (req, res) => {
  try {
    const { feedback } = req.body;
    const article = await articleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        success: false,
      });
    }

    if (article.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending articles can be marked for changes.",
      });
    }

    if (!feedback) {
      return res.status(400).json({
        success: false,
        message: "Review message is required.",
      });
    }

    article.status = "Changes Requested";
    article.reviewMessage = reviewMessage;

    await article.save();

    return res.status(200).json({
      success: true,
      message: "Changes requested successfully",
      article,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search?.trim();
    const sort = req.query.sort || "newest";

    const skip = (page - 1) * limit;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption.createdAt = 1;
        break;

      case "title":
        sortOption.title = 1;
        break;

      case "newest":
      default:
        sortOption.createdAt = -1;
    }

    const totalArticles = await articleModel.countDocuments(filter);

    const articles = await articleModel
      .find(filter)
      .populate("author", "username email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalArticles / limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalArticles,
      articles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await articleModel
      .findById(req.params.id)
      .populate("author", "username email")
      .populate("approvedBy", "username email");

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
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getPendingArticles,
  approveArticle,
  rejectArticle,
  requestChangesArticle,
  getAllArticles,
  getArticleById,
};
