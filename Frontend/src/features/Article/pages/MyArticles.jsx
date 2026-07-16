import { useEffect, useState } from "react";
import Navbar from "../../home/components/Navbar";
import Footer from "../../home/components/Footer";
import Loading from "../../auth/pages/Loading";
import useArticle from "../hooks/useArticle";
import { Link } from "react-router";

const MyArticles = () => {
  const { handleGetMyArticles } = useArticle();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);

    const data = await handleGetMyArticles();

    if (data) {
      setArticles(data.articles);
    }

    setLoading(false);
  };

  const badge = (status) => {
    switch (status) {
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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#f8f5ee] dark:bg-gray-900">
      <Navbar />

      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-4xl font-bold">My Articles</h1>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Title</th>

                <th className="text-left">Category</th>

                <th className="text-left">Status</th>

                <th className="text-left">Date</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {articles.map((article) => (
                <tr key={article._id} className="border-b">
                  <td className="p-4">{article.title}</td>

                  <td>{article.category}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${badge(article.status)}`}
                    >
                      {article.status}
                    </span>
                  </td>

                  <td>{new Date(article.createdAt).toLocaleDateString()}</td>

                  <td className="text-center">
                    <Link
                      to={`/my-articles/${article._id}`}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyArticles;
