import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getArticleById, updateArticle } from "../services/Article.api";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  // const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // FETCH ARTICLE
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        const article = data?.article || data;

        if (!article) return;

        setTitle(article.title || "");
        setCategory(article.category || "");
        setDescription(article.description || "");
        setImage(article.image || "");
        setContent(article.content || "");
        // setAuthor(article.author?.username || article.author || "");
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchArticle();
  }, [id]);

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      category,
      description,
      image,
      // author,
      content,
    };

    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this article?",
      );
      if (confirmUpdate) {
        const data = await updateArticle(id, articleData);
        toast.success("Article Updated Successfully ✨");
        // IMPORTANT: triggers SingleArticle refetch
        navigate(`/articles/${id}`, {
          state: { updatedAt: Date.now() },
        });
      }
    } catch (err) {
      console.log("Update error:", err);
      toast.error("Failed To Update Article ❌");
    }
  };

  return (
    <main className="h-full w-full dark:bg-gray-900 flex justify-center items-center">
      <div className="lg:h-[95%] w-[95%]">
        {/* Header */}
        <div className="p-1">
          <div className="flex pt-2 ">
            <h1 className="font-[font2]  dark:text-green-700 text-[#007a06b8] text-4xl">
              Edit Article
            </h1>

            <img
              className="h-23 w-27 -mt-7 rotate-175 mix-blend-multiply"
              src="/branch.jpg"
              alt="Not found"
            />
          </div>

          <p className="font-[font1] dark:text-white -mt-7">
            Update your article and save changes.
          </p>
        </div>

        {/* FORM */}
        <div className="lg:h-[95%] w-full">
          <div className="h-full w-full dark:bg-gray-800 mb-5 dark:text-white rounded-2xl border-2 border-[#aba69ca7]">
            <form onSubmit={handleSubmit} className="h-full p-3 w-full">
              {/* Title */}
              <label className="font-[font2]">Title :</label>
              <input
                className="rounded w-full p-1 border-2 border-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Image + Category */}
              <div className="flex gap-10 mt-3">
                <div>
                  <label className="font-[font2]">Image : </label>
                  <input
                    className="lg:w-96 w-44 rounded p-1 border-2 border-gray-400"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-[font2]">Category : </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#cac5bb68] dark:bg-gray-700 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Truth">Truth</option>
                    <option value="Non-Violence">Non-Violence</option>
                    <option value="Simplicity">Simplicity</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>

              {/* Author */}
              {/* <div className="mt-3">
                <label className="font-[font2]">Author</label>
                <input
                  className="rounded w-full p-1 border-2 border-gray-400"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div> */}

              {/* Description */}
              <div className="mt-3">
                <label className="font-[font2]">Description : </label>
                <textarea
                  className="rounded w-full p-1 border-2 border-gray-400"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="mt-3">
                <label className="font-[font2]">Content : </label>
                <textarea
                  className="rounded w-full p-1 border-2 border-gray-400"
                  rows="9"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-red-400 mt-3 flex items-center rounded px-3 py-2 font-[font2]"
              >
                <Send size={24} className="mr-2" />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditForm;
