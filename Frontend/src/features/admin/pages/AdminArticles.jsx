import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  CheckCircle2,
  XCircle,
  FilePenLine,
  Search,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useArticle from "../../Article/hooks/useArticle";

const AdminArticles = () => {
  const navigate = useNavigate();
  const { handleDeleteArticle } = useArticle();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?",
    );

    if (!confirmDelete) return;

    await handleDeleteArticle(id);

    fetchArticles();
  };

  const { handleAdminArticles, handleApproveArticle, handleRejectArticle } =
    useAdmin();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");

  const currentPage = 1;
  const perPage = 10;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);

    const data = await handleAdminArticles();

    if (data) {
      setArticles(data.articles || []);
    }

    setLoading(false);
  };

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (search) {
      result = result.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (status !== "All") {
      result = result.filter((article) => article.status === status);
    }

    result.sort((a, b) => {
      if (sort === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return result;
  }, [articles, search, status, sort]);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const getBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Changes Requested":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow hover:cursor-default">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>

        <div className="flex gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border hover:cursor-pointer px-4"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Changes Requested</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-4 hover:cursor-pointer"
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-left">Title</th>

                <th className="text-left">Author</th>

                <th className="text-left">Category</th>

                <th className="text-left">Status</th>

                <th className="text-left">Date</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedArticles.map((article) => (
                <tr key={article._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-medium">{article.title}</td>

                  <td>{article.author?.username}</td>

                  <td>{article.category}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${getBadge(
                        article.status,
                      )}`}
                    >
                      {article.status}
                    </span>
                  </td>

                  <td>{new Date(article.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          console.log(article._id);
                          navigate(`/admin/articles/${article._id}`);
                        }}
                        className="rounded bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 hover:cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>

                      {/* delete */}
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
      )}

      {!loading && filteredArticles.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          No articles found.
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
