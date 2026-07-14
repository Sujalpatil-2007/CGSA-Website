import { useEffect, useState } from "react";

import { Eye, Check, X, FilePenLine } from "lucide-react";

import { useNavigate } from "react-router";

import useAdmin from "../hooks/useAdmin";

const RecentPending = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);

  const { handlePendingArticles, handleApproveArticle, handleRejectArticle } =
    useAdmin();

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const data = await handlePendingArticles();

    if (data) {
      setArticles(data.articles || []);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Pending Articles</h2>

        <button
          onClick={() => navigate("/admin/articles")}
          className="text-blue-600 hover:underline hover:cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 text-left">Title</th>

              <th className="text-left">Author</th>

              <th className="text-left">Status</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="border-b hover:bg-gray-50">
                <td className="py-5">{article.title}</td>

                <td>{article.author?.username}</td>

                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {article.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/articles/${article._id}`)}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 hover:cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(article._id)}
                      className="rounded bg-red-100 p-2 text-red-600 hover:bg-red-200 hover:cursor-pointer"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPending;
