import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../AuthContextApi/AuthContext";
const getTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/all/tasks`,
      { withCredentials: true },
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
    throw err;
  }
};
const AllySuggestions = () => {
  const { currentUser, loading } = useAuth();
  // console.log(currentUser)
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyTasks"],
    queryFn: getTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  // console.log(tasks);
  // console.log(data);

  const tasks = data
    ? data.filter((t) => t.isDeleted === false && t.assignedAlly === null)
    : [];

  return (
    <div className="w-full  p-6 bg-gradient-to-b from-[#406882] to-[#1A374D]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white">
            Welcome back, {currentUser?.userType.toUpperCase()} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here are tasks available for you today.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {isPending || isFetching ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-2">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700 font-semibold">Loading ...</p>
            </div>
          ) : isError ? (
            <p className="text-red-400">Failed to load tasks</p>
          ) : tasks && tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task._id}
                className="flex justify-between bg-white/10 border border-white/10 p-4 rounded-xl shadow-sm hover:bg-white/20 transition"
              >
                {/* Left */}
                <div>
                  <p className="text-lg font-medium text-white">
                    {task?.taskTitle}
                  </p>
                  <p className="text-gray-400 text-sm">{task?.address}</p>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
                    ₹{task?.budget}
                  </p>
                  <p className="text-gray-400 text-sm">{task?.workingHours}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">
              <p className="text-gray-300 text-2xl font-medium">No Tasks Available Near You</p>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="mt-8 text-center">
          <Link
            to="/job/listings"
            className="bg-white cursor-pointer text-black font-medium px-6 py-2 rounded-full shadow hover:bg-gray-200 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllySuggestions;
