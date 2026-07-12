import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getDashboardStats = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};

export const getPendingArticles = async () => {
  const res = await api.get("/api/admin/articles/pending");
  return res.data;
};

export const getAdminArticles = async () => {
  const res = await api.get("/api/admin/articles");
  return res.data;
};

export const getArticleById = async (id) => {
  const res = await api.get(`/api/admin/articles/${id}`);
  return res.data;
};

export const approveArticle = async (id) => {
  const res = await api.patch(`/api/admin/articles/${id}/approve`);
  return res.data;
};

export const rejectArticle = async (id) => {
  const res = await api.patch(`/api/admin/articles/${id}/reject`);
  return res.data;
};

export const requestChangesArticle = async (
  id,
  feedback
) => {
  const res = await api.patch(
    `/api/admin/articles/${id}/request-changes`,
    {
      feedback,
    }
  );

  return res.data;
};