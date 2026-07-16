import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

import {
  updateArticle,
  getMyArticleById,
} from "../services/Article.api";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const data = await getMyArticleById(id);

      if (!data?.article) {
        toast.error("Article not found");
        navigate("/my-articles");
        return;
      }

      const article = data.article;

      setTitle(article.title);
      setCategory(article.category);
      setDescription(article.description);
      setImage(article.image);
      setContent(article.content);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load article");
      navigate("/my-articles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm(
      "Are you sure you want to save these changes?"
    );

    if (!confirmUpdate) return;

    try {
      await updateArticle(id, {
        title,
        category,
        description,
        image,
        content,
      });

      toast.success("Article updated successfully.");

      navigate("/my-articles");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Failed to update article."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <main className="flex h-full w-full items-center justify-center dark:bg-gray-900">
      <div className="w-[95%] lg:h-[95%]">

        <div className="p-1">
          <div className="flex pt-2">
            <h1 className="font-[font2] text-4xl text-[#007a06b8] dark:text-green-700">
              Edit Article
            </h1>

            <img
              src="/branch.jpg"
              alt=""
              className="-mt-7 h-23 w-27 rotate-175 mix-blend-multiply"
            />
          </div>

          <p className="-mt-7 font-[font1] dark:text-white">
            Update your article and submit it again for admin review.
          </p>
        </div>

        <div className="mb-5 w-full rounded-2xl border-2 border-[#aba69ca7] dark:bg-gray-800 dark:text-white">

          <form
            onSubmit={handleSubmit}
            className="w-full p-5"
          >

            <label className="font-[font2]">
              Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border-2 border-gray-400 p-2"
            />

            <div className="mt-4 flex flex-col gap-5 lg:flex-row">

              <div className="flex-1">

                <label className="font-[font2]">
                  Image URL
                </label>

                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="mt-1 w-full rounded border-2 border-gray-400 p-2"
                />

              </div>

              <div>

                <label className="font-[font2]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 rounded border-2 border-gray-400 p-2 dark:bg-gray-700"
                >
                  <option value="">Select</option>
                  <option value="Truth">Truth</option>
                  <option value="Non-Violence">Non-Violence</option>
                  <option value="Simplicity">Simplicity</option>
                  <option value="Service">Service</option>
                </select>

              </div>

            </div>

            <div className="mt-4">

              <label className="font-[font2]">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded border-2 border-gray-400 p-2"
              />

            </div>

            <div className="mt-4">

              <label className="font-[font2]">
                Content
              </label>

              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 w-full rounded border-2 border-gray-400 p-2"
              />

            </div>

            <button
              type="submit"
              className="mt-6 flex items-center rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
            >
              <Send size={20} className="mr-2" />
              Save & Resubmit
            </button>

          </form>

        </div>
      </div>
    </main>
  );
};

export default EditForm;