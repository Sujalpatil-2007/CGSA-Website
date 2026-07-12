import { toast } from "react-toastify";

import {
  getDashboardStats,
  getPendingArticles,
  getAdminArticles,
  approveArticle,
  rejectArticle,
  requestChangesArticle,
  getArticleById,
} from "../services/Admin.api";

const useAdmin = () => {
  const handleDashboardStats =
    async () => {
      try {
        return await getDashboardStats();
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch dashboard."
        );
      }
    };

  const handlePendingArticles =
    async () => {
      try {
        return await getPendingArticles();
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch pending articles."
        );
      }
    };

  const handleAdminArticles =
    async () => {
      try {
        return await getAdminArticles();
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch articles."
        );
      }
    };

  const handleArticleById =
    async (id) => {
      try {
        return await getArticleById(id);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch article."
        );
      }
    };

  const handleApproveArticle =
    async (id) => {
      try {
        const data =
          await approveArticle(id);

        toast.success(
          "Article Approved"
        );

        return data;
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Approval Failed"
        );
      }
    };

  const handleRejectArticle =
    async (id) => {
      try {
        const data =
          await rejectArticle(id);

        toast.success(
          "Article Rejected"
        );

        return data;
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Reject Failed"
        );
      }
    };

  const handleRequestChanges =
    async (id, feedback) => {
      try {
        const data =
          await requestChangesArticle(
            id,
            feedback
          );

        toast.success(
          "Feedback Sent"
        );

        return data;
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed"
        );
      }
    };

  return {
    handleDashboardStats,
    handlePendingArticles,
    handleAdminArticles,
    handleArticleById,
    handleApproveArticle,
    handleRejectArticle,
    handleRequestChanges,
  };
};

export default useAdmin;