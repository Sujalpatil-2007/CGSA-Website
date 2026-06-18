import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Navbar from "../../home/components/Navbar";
import { getArticleById } from "../services/Article.api";
import { Calendar } from "lucide-react";
import { AuthContext } from "../../auth/auth.context";
import useArticle from "../hooks/useArticle";
import  Loading  from "../../auth/pages/Loading";
import Footer from "../../home/components/Footer";

const SingleArticle = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { handleDeleteArticle } = useArticle();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getArticleById(id);

      if (data?.article) {
        setArticle(data.article);
      } else {
        setArticle(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirmDelete) {
      await handleDeleteArticle(article._id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f8f5ee]">
        <Loading/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f8f5ee]">
        <h1 className="text-2xl text-red-500">
          {error}
        </h1>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f8f5ee]">
        <h1 className="text-2xl text-red-500">
          Article Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h- dark:bg-gray-900 bg-[#f8f5ee]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Back Button */}
        <Link
          to="/articles"
          className="text-green-700 dark:text-[#868d82] font-medium hover:underline"
        >
          ← Back to Articles
        </Link>

        {/* Title & Category */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <h1 className="lg:text-3xl text-2xl md:text-5xl font-[font2] dark:text-green-600 text-green-900">
            {article.title}
          </h1>

          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-[font1]">
            {article.category}
          </span>
        </div>

        {/* Author & Date */}
        <div className="flex flex-wrap items-center gap-4 mt-4 dark:text-gray-300 text-gray-600">
          <p className="text-lg">
            By {article.author?.username || "Anonymous"}
          </p>

          <span>•</span>

          <p className="flex items-center gap-1">
            <Calendar size={18} />
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "Unknown Date"}
          </p>
        </div>

        {/* Description & Image */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 w-full lg:w-1/2 rounded-xl shadow p-6">
            <h2 className="text-2xl dark:text-gray-300 font-[font2] mb-4">
              Overview
            </h2>

            <p className="text-gray-700 dark:text-white font-[font1] leading-7">
              {article.description}
            </p>

            {user && article.author?._id === user.id && (
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() =>
                    navigate(`/articles/edit/${article._id}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Update Article
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Delete Article
                </button>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={
                article.image ||
                "https://via.placeholder.com/800x500?text=No+Image"
              }
              alt={article.title}
              className="w-full h-100 object-cover rounded-2xl  shadow-lg"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 md:p-8 mt-8">
          <h2 className="text-2xl dark:text-gray-300 font-[font2] mb-6">
            Article Content
          </h2>

          <div className="text-gray-800 dark:text-white font-[font1] leading-8 whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default SingleArticle;