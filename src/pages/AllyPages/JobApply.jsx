import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const useJobApply = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/application/tasks/${id}/apply`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res)
      toast.success("Your Application Send Successfully");
      queryClient.invalidateQueries(["allyAppliedTasks"]);
      navigate("/applied-tasks");
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err?.response?.data?.message}`);
      return null;
    },
  });
};

const JobApply = () => {
  const { applyTaskId } = useParams();
  const createApplyJob = useJobApply(applyTaskId);
  const [msg, setMsg] = useState({
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg((prev) => ({ ...prev, [name]: value }));
  };

  // check the error here
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("coverMessage", msg.message);
    const data={
      coverMessage:msg.message
    }
    createApplyJob.mutate(data);
    setMsg({
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mt-30 mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Apply for Task</h2>
        {/* Optional Note */}
        <div>
          <label className="block font-medium mb-1">
            Anything you want to tell the client?
          </label>
          <textarea
            maxLength={100}
            required
            name="message"
            value={msg.message}
            onChange={handleChange}
            placeholder="Short note, up to 100 characters"
            className="w-full border rounded-lg px-3 py-2 outline-none resize-none h-24"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Max 100 characters</p>
          <p className="text-sm text-gray-500 font-medium">
            if there is nothing to tell just type{" "}
            <span className="font-bold text-black">NA</span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={createApplyJob.isPending}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {createApplyJob.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Applying...
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  );
};

export default JobApply;
