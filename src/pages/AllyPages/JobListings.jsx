import React from "react";
import { HouseIcon, Search, List, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    return null;
  }
};

const JobListings = () => {
  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
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

  return (
    <>
      <div className="m-6 mt-30 min-h-screen flex flex-row gap-10 ">
        {/* LEFT  */}
        <div className="w-64 hidden md:block">
          <div className="flex flex-col gap-3 sticky top-30 bg-white shadow-sm p-5 rounded-xl">
            <Link
              to="/"
              className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <HouseIcon size={20} />
              <p>Home</p>
            </Link>
            <Link
              to="/ally/dashboard"
              className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <List size={20} />
              <p>Dashboard</p>
            </Link>
            <Link
              to="/profile/ally"
              className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <UserRound size={20} />
              <p>Profile</p>
            </Link>
          </div>
        </div>

        {/* RIGHT  */}
        <div className="w-full">
          {/* SEARCH */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search tasks…"
              className="border w-full p-3 px-4 rounded-lg bg-gray-100 border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-row text-sm gap-3 mt-4 flex-wrap">
            {["Nearby", "Newest", "Highest Paying", "Urgent"].map((item) => (
              <button
                key={item}
                className="py-1.5 px-4 rounded-lg bg-indigo-100 cursor-pointer text-gray-800 hover:bg-indigo-200 transition"
              >
                {item}
              </button>
            ))}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex flex-row flex-wrap gap-4 mt-6 md:hidden">
            {/* <p>{" "}</p> */}
            <Link to="/">
              <button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">
                Home
              </button>
            </Link>
            {/* <Link to="/">
              <button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">
                My Tasks
              </button>
            </Link> */}
            <Link to="/profile/ally">
              <button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">
                Profile
              </button>
            </Link>
            <Link to="/ally/dashboard">
              <button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">
                Dashboard
              </button>
            </Link>
          </div>

          {/* LISTINGS */}
          <h1 className="text-2xl font-semibold mt-10 text-gray-600">
            Available Tasks
          </h1>

          {/* Task Cards */}
          {(isPending || isFetching) && (
            <div className="flex flex-col items-center justify-center h-40 space-y-2">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700 font-semibold">
                Loading your Tasks...
              </p>
            </div>
          )}

          {!isPending &&
            !isFetching &&
            tasks?.length > 0 &&
            tasks.every(
              (t) => t.status === "completed" || t.status === "cancelled"
            ) && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
                  Nothing here yet — change your location!
                </p>

                <Link
                  to="/post/job"
                  className="text-sm w-fit mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
                >
                  Post Task
                </Link>
              </div>
            )}

          {!isPending &&
            !isFetching &&
            tasks?.some(
              (t) => t.status !== "completed" && t.status !== "cancelled"
            ) && (
              <>
                {tasks.map((task) => (
                  <div
                    key={task?._id}
                    className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300"
                  >
                    {/* LEFT CONTENT */}
                    <div className="flex flex-col gap-3 w-full md:pr-8">
                      {/* Due Date */}
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] sm:text-xs font-medium rounded-lg border border-rose-200">
                          Due: Today, 6 PM
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        {task?.taskTitle}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {task?.description}
                      </p>

                      {/* Location */}
                      <div className="flex flex-wrap items-start gap-2 text-gray-500 text-sm">
                        <span className="mt-0.5 font-medium">Location:</span>
                        <span className="break-all">{task?.address}</span>
                      </div>

                      {/* Budget + Button */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="px-5 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-lg border border-emerald-200">
                          ₹{task?.budget}
                        </div>

                        <Link
                        to={`/task/${task?._id}`}
                        className="px-6 cursor-pointer flex justify-center sm:px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition duration-200 shadow-md hover:shadow-lg w-full sm:w-auto">
                          Details
                        </Link>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="w-full md:w-auto flex justify-center md:justify-end">
                      <img
                        src={task?.attachments}
                        alt="Task"
                        className="h-32 w-32 sm:h-36 sm:w-36 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default JobListings;
