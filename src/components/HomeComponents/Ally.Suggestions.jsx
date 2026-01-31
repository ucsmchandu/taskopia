import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../AuthContextApi/AuthContext";

const getTasks = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/tasks/get/all/tasks`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (err) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

const AllySuggestions = () => {
  const { currentUser } = useAuth();

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyTasks"],
    queryFn: getTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
  });

  const tasks = data
    ? data.filter((t) => !t.isDeleted && t.assignedAlly === null)
    : [];

  return (
    <section className="mt-20 px-4 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto rounded-2xl bg-white border border-[#E2E8F0] p-6 md:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#0F172A]">
            Welcome back, {currentUser?.userType?.toUpperCase()} 👋
          </h1>
          <p className="text-[#475569] text-sm mt-1">
            Here are tasks available for you today.
          </p>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {isPending || isFetching ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <div className="w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#475569] text-sm">Loading tasks...</p>
            </div>
          ) : isError ? (
            <p className="text-red-500 text-sm">Failed to load tasks</p>
          ) : tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between
                           rounded-xl border border-[#E2E8F0]
                           bg-[#F8FAFC] p-4
                           hover:shadow-md transition"
              >
                {/* Left */}
                <div>
                  <p className="text-[#0F172A] font-medium">
                    {task.taskTitle}
                  </p>
                  <p className="text-[#475569] text-sm">
                    {task.address}
                  </p>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-[#0F172A] font-semibold">
                    ₹{task.budget}
                  </p>
                  <p className="text-[#475569] text-sm">
                    {task.workingHours}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#475569] text-center text-sm">
              No tasks available near you.
            </p>
          )}
        </div>

        {/* Button */}
        <div className="mt-10 text-center">
          <Link
            to="/job/listings"
            className="inline-block px-6 py-2 rounded-full
                       bg-[#2563EB] text-white text-sm font-medium
                       hover:bg-[#1D4ED8] transition"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllySuggestions;
