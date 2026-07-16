import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import Navbar from "../../home/components/Navbar";
import Footer from "../../home/components/Footer";
import Loading from "../../auth/pages/Loading";
import { getArticleById } from "../services/Article.api";

const MyArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id);

      setArticle(data.article);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!article) {
    return (
      <div className="h-screen flex items-center justify-center">
        Article Not Found
      </div>
    );
  }

  const badge = () => {
    switch (article.status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Changes Requested":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5ee]">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 rounded border"
        >
          ← Back
        </button>

        <img
          src={article.image}
          className="w-full h-112.5 object-cover rounded-xl shadow"
        />

        <h1 className="text-5xl font-bold mt-8">{article.title}</h1>

        <div className="flex gap-4 mt-5">
          <span className={`px-4 py-2 rounded-full ${badge()}`}>
            {article.status}
          </span>

          <span className="px-4 py-2 rounded-full bg-gray-200">
            {article.category}
          </span>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-4">Description</h2>

          <p>{article.description}</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-4">Content</h2>

          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>

        {article.feedback && (
          <div className="mt-8 rounded-xl border-l-4 border-orange-500 bg-orange-50 p-6">
            <h2 className="font-bold text-xl text-orange-700">
              Admin Feedback
            </h2>

            <p className="mt-3">{article.feedback}</p>

            {article.reviewedBy && (
              <p className="mt-4 text-sm text-gray-600">
                Reviewed by
                <b> {article.reviewedBy.username}</b>
              </p>
            )}

            {article.reviewedAt && (
              <p className="text-sm text-gray-500">
                {new Date(article.reviewedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {article.status === "Changes Requested" && (
          <div className="mt-8">
            <Link
              to={`/articles/edit/${article._id}`}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Edit & Resubmit
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyArticleDetails;
