import React, { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const submitRating = async ({ taskId, rating, review }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/ratings/tasks/${taskId}`,
    { rating, review },
    { withCredentials: true },
  );

  return res.data;
};

const RatingForm = ({ taskId, title = "Rate this task partner" }) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingMutation = useMutation({
    mutationFn: submitRating,
    onSuccess: (res) => {
      setSubmitted(true);
      toast.success(res?.message || "Rating submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["hostProfileData"] });
      queryClient.invalidateQueries({ queryKey: ["allyProfile"] });
      queryClient.invalidateQueries({ queryKey: ["hostTasksData"] });
      queryClient.invalidateQueries({ queryKey: ["allyAppliedTasks"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Unable to submit rating");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    ratingMutation.mutate({
      taskId,
      rating,
      review: review.trim(),
    });
  };

  if (submitted) {
    return (
      <div className="mt-6 border border-green-200 bg-green-50 rounded-lg p-4">
        <p className="text-sm font-medium text-green-700">
          Thanks, your rating has been submitted.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border border-gray-200 rounded-lg p-4 sm:p-5 bg-white"
    >
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        {title}
      </h3>
       <h3 className="text-sm text-red-700 font-medium mb-3">
        Ignore, if you already rated!
      </h3>

      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="cursor-pointer"
            aria-label={`${value} star rating`}
          >
            <Star
              size={24}
              className={
                value <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
        <span className="text-sm text-gray-600">{rating || 0}/5</span>
      </div>

      <textarea
        value={review}
        onChange={(event) => setReview(event.target.value)}
        maxLength={300}
        rows={3}
        placeholder="Write a short review"
        className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
      />

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-gray-500">{review.length}/300</p>
        <button
          type="submit"
          disabled={ratingMutation.isPending}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium cursor-pointer disabled:opacity-60"
        >
          {ratingMutation.isPending ? "Submitting..." : "Submit rating"}
        </button>
      </div>
    </form>
  );
};

export default RatingForm;
