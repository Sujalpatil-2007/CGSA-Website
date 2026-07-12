import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";

const RecentPending = () => {
  const [articles, setArticles] = useState([]);

  const { handlePendingArticles, handleApproveArticle, handleRejectArticle } = useAdmin();

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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Pending Articles
      </h2>

      <table className="w-full">
        <thead>
  <tr className="border-b">
    <th className="py-3 text-left">Title</th>
    <th className="text-left">Author</th>
    <th className="text-left">Status</th>
    <th className="text-left">Actions</th>
  </tr>
</thead>

        <tbody>
  {articles.map((article) => (
    <tr key={article._id} className="border-b">
      <td className="py-4">{article.title}</td>

      <td>{article.author?.username || "Unknown"}</td>

      <td>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
          {article.status}
        </span>
      </td>

      <td className="space-x-2 py-4">
        <button
          onClick={async () => {
            await handleApproveArticle(article._id);
            fetchPending();
          }}
          className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
        >
          Approve
        </button>

        <button
          onClick={async () => {
            await handleRejectArticle(article._id);
            fetchPending();
          }}
          className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
        >
          Reject
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default RecentPending;