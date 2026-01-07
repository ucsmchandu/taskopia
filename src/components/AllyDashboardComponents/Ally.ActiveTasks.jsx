import React from "react";
import { CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

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

const AllyActiveTasks = () => {
  const {
    data: applications,
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
  });
  // console.log(applications);

   const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* laoding */}
      {(isPending || isFetching) && (
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your Tasks...</p>
        </div>
      )}

      {!isPending &&
        !isFetching &&
        (applications?.length === 0 || !applications) &&
        applications?.every(
          (t) => t.status === "completed" || t.status === "cancelled"
        ) && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
              Nothing here yet — check back soon!
            </p>

            <Link
              to="/job/listings"
              className="text-sm w-fit mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
            >
              Apply Task
            </Link>
          </div>
        )}
      {!isPending &&
        !isFetching &&
        applications?.some(
          (t) => t.status !== "completed" && t.status !== "cancelled"
        ) && (
          <div className="w-full flex flex-col gap-6 animate-fadeIn">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">
              Active Tasks
            </h2>

            {/* Tasks List */}
            <div className="flex flex-col gap-4">
              {applications?.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{task.task.taskTitle}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium 
                  ${
                    task.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Details Row */}
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <p>Location: {task.host.address}</p>
                    <p className="flex flex-row justify-center items-center gap-1">
                      <CalendarDays size={16} /> {formatDate(task.createdAt.split("T")[0])}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{task.task.budget}
                    </p>
                    <Link
                    to={`/view/applied/task/details/${task.task._id}`}
                    className="px-4 cursor-pointer py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default AllyActiveTasks;
