import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";

const RecentPending = () => {
  const [articles, setArticles] = useState([]);

  const { handlePendingArticles } = useAdmin();

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const data = await handlePendingArticles();

    if (data?.success) {
      setArticles(data.articles || []);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Pending Articles
      </h2>

      {articles.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No pending articles found.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium">
                  {article.title}
                </td>

                <td>
                  {article.author?.username || "Unknown"}
                </td>

                <td>{article.category}</td>

                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    {article.status}
                  </span>
                </td>

                <td>
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentPending;