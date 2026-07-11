import { toast } from "react-toastify";
import {
  getAdminArticles,
  getPendingArticles,
  getDashboardStats,
  approveArticle,
  rejectArticle,
  requestChangesArticle,
} from "../services/Admin.api";

const useAdmin = () => {
  // Dashboard Stats
  const handleDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      return data;
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to fetch dashboard stats"
      );
      return null;
    }
  };

  // All Articles
  const handleAdminArticles = async () => {
    try {
      const data = await getAdminArticles();
      return data;
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to fetch articles"
      );
      return null;
    }
  };

  // Pending Articles
  const handlePendingArticles = async () => {
    try {
      const data = await getPendingArticles();
      return data;
    } catch (err) {
  console.error("Pending Articles Error:", err);
  console.error("Status:", err.response?.status);
  console.error("Response:", err.response?.data);

  toast.error(
    err.response?.data?.message || "Failed to fetch pending articles"
  );

  return null;
}
  };

  // Approve Article
  const handleApproveArticle = async (id) => {
    try {
      const data = await approveArticle(id);
      toast.success(data.message || "Article approved");
      return data;
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to approve article"
      );
      return null;
    }
  };

  // Reject Article
  const handleRejectArticle = async (id) => {
    try {
      const data = await rejectArticle(id);
      toast.success(data.message || "Article rejected");
      return data;
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to reject article"
      );
      return null;
    }
  };

  // Request Changes
  const handleRequestChanges = async (id, feedback) => {
    try {
      const data = await requestChangesArticle(id, feedback);
      toast.success(data.message || "Changes requested");
      return data;
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to request changes"
      );
      return null;
    }
  };

  return {
    handleDashboardStats,
    handleAdminArticles,
    handlePendingArticles,
    handleApproveArticle,
    handleRejectArticle,
    handleRequestChanges,
  };
};

export default useAdmin;