import axios from "axios";

const api = axios.create({
  baseURL: "https://cgsa-backend.vercel.app/api/admin",
  withCredentials: true,
});

// Dashboard Stats
export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

// All Articles
export const getAdminArticles = async () => {
  const { data } = await api.get("/articles");
  return data;
};

// Pending Articles
export const getPendingArticles = async () => {
  const { data } = await api.get("/articles/pending");
  return data;
};

// Single Article
export const getAdminArticleById = async (id) => {
  const { data } = await api.get(`/articles/${id}`);
  return data;
};

// Approve Article
export const approveArticle = async (id) => {
  const { data } = await api.patch(`/articles/${id}/approve`);
  return data;
};

// Reject Article
export const rejectArticle = async (id) => {
  const { data } = await api.patch(`/articles/${id}/reject`);
  return data;
};

// Request Changes
export const requestChangesArticle = async (id, feedback) => {
  const { data } = await api.patch(
    `/articles/${id}/request-changes`,
    { feedback }
  );
  return data;
};