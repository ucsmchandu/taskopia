import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { ClockArrowUp, ChevronRight } from "lucide-react";
import { Star } from "lucide-react";
import { useAuth } from "../../AuthContextApi/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// importing the active task, completed tasks, analytics components
import HostActiveTask from "../../components/HostDashboard.componets/Host.ActiveTask";
import HostAnalytics from "../../components/HostDashboard.componets/Host.Analytics";
import HostCompletedTasks from "../../components/HostDashboard.componets/Host.History";
import axios from "axios";
import DeletedTasks from "../../components/HostDashboard.componets/DeletedTasks";

// get the host profile
const getProfileData = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/host-profile/get/profile`,
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      // console.log(err.response?.status)
      return null;
    }
    throw err;
  }
};

// get the tasks
const getActiveTasks = async () => {
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
    if (err.response?.status === 404) return null;
    throw err;
  }
};

const HostDashboard = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser)
  const [components, setComponents] = useState("activeTasks");

  const {
    data: profileData,
    isPending: profilePending,
    isFetching: profileFetching,
    isError: profileError,
  } = useQuery({
    queryKey: ["hostProfileData"],
    queryFn: getProfileData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    keepPreviousData: true,
    placeholderData: null,
  });

  const {
    data: tasks,
    isPending: taskPending,
    isFetching: taskFetching,
    isError: taskError,
  } = useQuery({
    queryKey: ["hostTasksData"],
    queryFn: getActiveTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  // console.log("tasks :",tasks)

  // filter the active tasks count
  const activeTasks =
    tasks?.filter((t) => t.status !== "completed" && t.status !== "cancelled")
      .length ?? 0;

  // get the total budget from all tasks
  const totalInvestment =
    tasks?.reduce((sum, t) => sum + Number(t.budget || 0), 0) ?? 0;

  // console.log("profile :",profileData)

  return (
    <div className="mt-20 lg:mt-30 p-8 text-gray-800 lg:m-30">
      {/* for the top bar section heading */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        {/* left heading */}
        <div>
          <h1 className="text-4xl font-semibold">Host Dashboard</h1>
          <h2 className="text-gray-500">
            Welcome back! Here's your performance overview
          </h2>
        </div>

        {/* right buttons */}
        <div className="">
          <Link
            to="/post/job"
            className="text-sm shadow-lg flex flex-row items-center justify-center text-white gap-1 bg-gradient-to-r from-[#257180] to-[#85cfca] hover:scale-105 rounded-2xl mt-4 md:mt-0 py-2 px-4 cursor-pointer transition"
          >
            Post New Task <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      {/* boxes for the different activities */}
      <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
        <div className=" text-white bg-gradient-to-l from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <TrendingUp className=" text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">₹{totalInvestment}</p>
            <p className="text-white text-sm">Total Investment</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <SquareCheckBig className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">{tasks?.length || 0}</p>
            <p className="text-white text-sm">Tasks Posted</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <ClockArrowUp className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">{activeTasks}</p>
            <p className="text-white text-sm">Active Tasks</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <Star className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">
              {profileData?.rating?.average || 0}
            </p>
            <p className="text-white text-sm">Average Rating</p>
          </div>
        </div>
      </div>

      {/* placing different components at single place */}
      <div className="mt-16">
        {/* buttons */}
        <div
          className="
  border border-gray-300 p-2 bg-white rounded-xl shadow-sm
  flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4
"
        >
          <button
            onClick={() => {
              setComponents("activeTasks");
            }}
            className={`border border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer
    ${
      components === "activeTasks" ? "bg-black text-white" : "hover:bg-gray-100"
    }
  `}
          >
            Active Task
          </button>

          <button
            onClick={() => {
              setComponents("completedTasks");
            }}
            className={`border border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer
    ${
      components === "completedTasks"
        ? "bg-black text-white"
        : "hover:bg-gray-100"
    }
  `}
          >
            History
          </button>

          <button
            onClick={() => {
              setComponents("analytics");
            }}
            className={`border border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer
    ${components === "analytics" ? "bg-black text-white" : "hover:bg-gray-100"}
  `}
          >
            Analytics
          </button>

          <button
            onClick={() => {
              setComponents("deletedTasks");
            }}
            className={`border border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer
    ${components === "deletedTasks" ? "bg-black text-white" : "hover:bg-gray-100"}
  `}
          >
            Deleted tasks
          </button>
        </div>

        {/* here comes the three diff components  */}

        <div>
          {(components === "activeTasks" && <HostActiveTask />) ||
            (components === "completedTasks" && <HostCompletedTasks />) ||
            (components === "analytics" && <HostAnalytics />) ||
            (components === "deletedTasks" && <DeletedTasks />) || (
              <HostActiveTask />
            )}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
