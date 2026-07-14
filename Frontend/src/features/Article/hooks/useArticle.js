import {
  createArticle,
  deleteArticle,
  getArticleById,
  updateArticle,
} from "../services/Article.api";

import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useArticle = () => {
  const context = useContext(AuthContext);

  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // Create Article
  const handleCreateArticle = async ({
    title,
    category,
    description,
    image,
    content,
    author,
  }) => {
    setLoading(true);

    try {
      // ✅ Basic validation (frontend safety)
      if (!title || !category || !description || !image || !content) {
        toast.error("Please fill all required fields ❗");
        return;
      }

      const data = await createArticle({
        title,
        category,
        description,
        image,
        content,
        author,
      });

      toast.success("Article is sended to admin 🎉");

      return data; // useful for navigation or UI update
    } catch (err) {
      console.log("CREATE ERROR:", err);

      toast.error(err.response?.data?.message || "Article is Not sended to admin  ❌");
    } finally {
      setLoading(false);
    }
  };

  // Get Article By Id
  const handleGetArticleById = async (id) => {
    setLoading(true);

    try {
      const data = await getArticleById(id);

      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(id);

      toast.success("Article Deleted Successfully");
      navigate("/admin");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed To Delete Article");
    }
  };

  // Update Article
  const handleUpdateArticle = async (id, articleData) => {
    setLoading(true);

    try {
      const data = await updateArticle(id, articleData);

      toast.success("Article Updated Successfully ✨");

      return data;
    } catch (err) {
      console.log(err);
      toast.error("Failed To Update Article ❌");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateArticle,
    handleGetArticleById,
    handleDeleteArticle,
    handleUpdateArticle,
  };
};

export default useArticle;
