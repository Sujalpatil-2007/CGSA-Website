import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function createArticle({
  title,
  category,
  description,
  image,
  content,
  author,
}) {
  try {
    const response = await api.post("/api/articles/create", {
      title,
      category,
      description,
      image,
      content,
      author,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllArticles() {
  try {
    const response = await api.get("/api/articles");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getArticleById(id) {
  try {
    const response = await api.get(`/api/articles/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteArticle(id) {
  try {
    const response = await api.delete(`/api/articles/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateArticle(id, articleData) {
  try {
    const response = await api.put(`/api/articles/${id}`, articleData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMyArticles() {
  try {
    const response = await api.get("/api/articles/my");
    return response.data;
  } catch(err){
    console.log(err);
  }
}
