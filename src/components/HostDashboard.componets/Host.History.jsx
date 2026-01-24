import React from "react";
import { CircleCheckBig } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// get the tasks
const getTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/all/tasks`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
    throw err;
  }
};

// date formating
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const HostCompletedTasks = () => {
  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["hostTasksData"],
    queryFn: getTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  // console.log(tasks);
  return (
    <>
      {/* laoding */}
      {(isPending || isFetching) && (
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">History...</p>
        </div>
      )}

      {/* if the tasks are not completed or cancelled they are related to the history */}
      {!isPending &&
        !isFetching &&
        tasks.every(
          (t) => t.status !== "completed" || t.status !== "cancelled"
        ) && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
              Nothing here yet, check back soon!
            </p>

            {/* <Link
              to="/post/job"
              className="text-sm w-fit mt-6 cursor-pointer px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
            >
              Post Task
            </Link> */}
          </div>
        )}

      {/* if the tasks are completed or cancelled then only they realted to the history */}
      {!isPending &&
        !isFetching &&
        tasks?.some(
          (t) => t.status === "completed" && t.status === "cancelled"
        ) && (
          <>
            <div className="mt-10 flex flex-col gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex border justify-between  p-6 rounded-xl border-gray-200 shadow-md hover:shadow-lg bg-white transition"
                >
                  <div className="flex gap-6 items-center">
                    <CircleCheckBig color="green" />
                    <div className="">
                      <p>{task.taskTitle}</p>
                      <p className="text-sm text-gray-400">{task.status}</p>
                    </div>
                  </div>
                  <div>
                    <p>₹{task.budget}</p>
                    <p className="text-sm text-gray-400">
                      {formatDate(task.startingDate.split("T")[0])}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
    </>
  );
};

export default HostCompletedTasks;
