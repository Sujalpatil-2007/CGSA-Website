import { useEffect, useState } from "react";
import { X } from "lucide-react";

const FeedbackModal = ({
  open,
  title,
  buttonColor,
  buttonText,
  loading = false,
  defaultValue = "",
  onClose,
  onSubmit,
}) => {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (open) {
      setFeedback(defaultValue);
    }
  }, [open, defaultValue]);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    await onSubmit(feedback);

    setFeedback("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <label className="mb-2 block font-medium">
            Feedback
          </label>

          <textarea
            rows={8}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write detailed feedback for the author..."
            className="w-full resize-none rounded-xl border p-4 outline-none transition focus:border-blue-600"
          />

          <p className="mt-2 text-sm text-gray-500">
            Explain what needs to be improved before this article can be
            approved.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`rounded-xl px-6 py-2 text-white transition ${buttonColor}`}
          >
            {loading ? "Please wait..." : buttonText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default FeedbackModal;