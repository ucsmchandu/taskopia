import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get tasks
const getActiveTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/host/tasks`,
      { withCredentials: true },
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
    throw err;
  }
};

const HostSuggestions = () => {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["hostTasksData"],
    queryFn: getActiveTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  const tasks = data
    ? data.filter(
        (t) =>
          t.isDeleted === false &&
          t.status !== "completed" &&
          t.status !== "cancelled",
      )
    : [];
  // console.log(tasks);

  return (
    <div className="mt-20 px-4">
      <div
        className="max-w-5xl mx-auto rounded-2xl 
               bg-[#0B1220] border border-[#1E293B] 
               shadow-xl p-6 md:p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Welcome back
          </h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Quick access to your recent tasks.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            to="/post/job"
            className="px-5 py-2 rounded-lg text-sm font-medium
                   bg-white text-black
                   hover:bg-gray-200 transition"
          >
            + Post a Task
          </Link>

          <Link
            to="/host/dashboard"
            className="px-5 py-2 rounded-lg text-sm font-medium
                   border border-[#1E293B] text-white
                   hover:bg-[#111827] transition"
          >
            View Posted Tasks
          </Link>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {isPending || isFetching ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <div className="w-10 h-10 border-4 border-[#60A5FA] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#94A3B8] text-sm">Loading tasks...</p>
            </div>
          ) : isError ? (
            <p className="text-red-400 text-sm">Failed to load tasks</p>
          ) : tasks && tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between 
                       rounded-xl border border-[#1E293B]
                       bg-[#0F172A] p-4
                       hover:bg-[#111827] transition"
              >
                <div>
                  <p className="text-white font-medium">{task?.taskTitle}</p>
                  <p className="text-[#94A3B8] text-sm">
                    {task?.applicationsCount || 0} applicants
                  </p>
                </div>

                <Link
                  to={`/task/details/${task._id}`}
                  className="text-sm text-[#60A5FA] hover:underline"
                >
                  Manage
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[#94A3B8] text-sm text-center">
              No tasks posted yet.
            </p>
          )}
        </div>

        {/* Footer */}
        {tasks?.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/host/dashboard"
              className="inline-block px-6 py-2 rounded-full
                   border border-[#1E293B]
                   text-white text-sm
                   hover:bg-[#111827] transition"
            >
              View All My Tasks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostSuggestions;
