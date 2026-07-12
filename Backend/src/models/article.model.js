const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Changes Requested",
      ],
      default: "Pending",
    },
    feedback: {
      type: String,
      default: "",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// export default mongoose.model("Article",articleSchama);
const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;
