import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// to get the applied tasks
const getAppliedTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/applications/me`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const AppliedTasks = () => {
  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["allyAppliedTasks"],
    queryFn: getAppliedTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  // const tasks=[]

  // console.log(tasks);

  const statusColors = {
    applied: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex min-h-screen flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your Tasks...</p>
        </div>
      )}
      {!isPending && !isFetching && !tasks?.length > 0 && (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
            Nothing here yet - Apply for tasks!
          </p>

          <Link
            to="/job/listings"
            className="text-sm w-fit mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
          >
            Apply Task
          </Link>
        </div>
      )}
      {!isPending && !isFetching && tasks.length > 0 && (
        <>
          <div className="max-w-3xl min-h-screen mx-auto p-5 mt-20">
            <h1 className="text-2xl font-bold mb-6">Applied Tasks</h1>

            {tasks.map((task) => (
              <div
                key={task?._id}
                className="border border-gray-300 rounded-xl p-6 mb-4 shadow-sm hover:shadow-lg transition-shadow bg-white"
              >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {task?.task?.taskTitle}
                    </h2>
                    <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {task?.task?.taskCategory}
                    </span>
                  </div>

                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      statusColors[task?.status]
                    }`}
                  >
                    {task?.status}
                  </span>
                </div>

                {/* Budget and Date Section */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Budget</p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{task?.task?.budget}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Applied on</p>
                    <p className="text-sm text-gray-700">
                      {new Date(task?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Cover Message */}
                {task?.coverMessage && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Cover Message</p>
                    <p className="text-sm text-gray-700 italic">
                      "{task?.coverMessage}"
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <Link to={`/view/applied/task/details/${task?.task?._id}`}>
                <button
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium transition-colors">
                  View Details
                </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AppliedTasks;
