import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FeedbackModal from "../components/FeedbackModal";

import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FilePenLine,
  Calendar,
  User,
  Tag,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

const ReviewArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleApproveArticle,
    handleRejectArticle,
    handleRequestChanges,
    handleGetArticle,
  } = useAdmin();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReject, setShowReject] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    setLoading(true);

    const data = await handleGetArticle(id);

    if (data) {
      setArticle(data.article);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg font-medium">Loading Article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Top */}

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold
          ${
            article.status === "Approved"
              ? "bg-green-100 text-green-700"
              : article.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : article.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-orange-100 text-orange-700"
          }`}
        >
          {article.status}
        </span>
      </div>

      {/* Image */}

      <img
        src={article.image}
        alt={article.title}
        className="h-112.5 w-full rounded-2xl object-cover shadow"
      />

      {/* Title */}

      <div>
        <h1 className="text-5xl font-bold leading-tight">{article.title}</h1>

        <div className="mt-6 flex flex-wrap gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <User size={18} />
            {article.author?.username}
          </div>

          <div className="flex items-center gap-2">
            <Tag size={18} />
            {article.category}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Description */}

      <div className="rounded-xl bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-bold">Description</h2>

        <p className="leading-8 text-gray-700">{article.description}</p>
      </div>

      {/* Content */}

      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold">Article Content</h2>

        <div className="prose max-w-none whitespace-pre-wrap">
          {article.content}
        </div>
      </div>

      {/* Action Buttons */}

      {article.status === "Pending" && (
        <div className="flex flex-wrap gap-4">
          <button
            onClick={async () => {
              if (window.confirm("Approve this article?")) {
                setActionLoading(true);

                const success = await handleApproveArticle(article._id);

                setActionLoading(false);

                if (success) {
                  navigate("/admin/articles");
                }
              }
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            <CheckCircle2 size={20} />
            Approve
          </button>

          <button
            onClick={() => setShowChanges(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
          >
            <FilePenLine size={20} />
            Request Changes
          </button>

          <button
            onClick={() => setShowReject(true)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            <XCircle size={20} />
            Reject
          </button>

          <FeedbackModal
            open={showChanges}
            title="Request Changes"
            buttonColor="bg-orange-500 hover:bg-orange-600"
            buttonText="Send Feedback"
            loading={actionLoading}
            onClose={() => setShowChanges(false)}
            onSubmit={async (feedback) => {
              setActionLoading(true);

              const success = await handleRequestChanges(article._id, feedback);

              setActionLoading(false);

              if (success) {
                setShowChanges(false);
                navigate("/admin/articles");
              }
            }}
          />

          <FeedbackModal
            open={showReject}
            title="Reject Article"
            buttonColor="bg-red-600 hover:bg-red-700"
            buttonText="Reject Article"
            loading={actionLoading}
            onClose={() => setShowReject(false)}
            onSubmit={async (feedback) => {
              setActionLoading(true);

              const success = await handleRejectArticle(article._id, feedback);

              setActionLoading(false);

              if (success) {
                setShowReject(false);
                navigate("/admin/articles");
              }
            }}
          />
        </div>
      )}

      <FeedbackModal
        open={showChanges}
        title="Request Changes"
        buttonColor="bg-orange-500 hover:bg-orange-600"
        buttonText="Send Feedback"
        onClose={() => setShowChanges(false)}
        onSubmit={async (feedback) => {
          await handleRequestChanges(article._id, feedback);

          setShowChanges(false);

          navigate("/admin/articles");
        }}
      />

      <FeedbackModal
        open={showReject}
        title="Reject Article"
        buttonColor="bg-red-600 hover:bg-red-700"
        buttonText="Reject"
        onClose={() => setShowReject(false)}
        onSubmit={async (feedback) => {
          await handleRejectArticle(article._id, feedback);

          setShowReject(false);

          navigate("/admin/articles");
        }}
      />
    </div>
  );
};

export default ReviewArticle;
