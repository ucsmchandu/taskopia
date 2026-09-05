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

// shared glass tokens — kept consistent with the rest of the app
const GLASS =
  "bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_10px_36px_rgba(0,0,0,0.06)] rounded-2xl";

const TAB_BASE =
  "rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer border border-transparent";

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
    <div className="relative min-h-screen bg-[#eef0f2]">
      {/* pure glass depth — soft white highlights only, no color */}
      <div className="pointer-events-none fixed -top-40 -right-32 w-[560px] h-[560px] rounded-full blur-[100px] opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-44 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)]" />

      <div className="relative mt-20 lg:mt-30 p-8 text-[#1f1f1f] lg:m-30">
        {/* for the top bar section heading */}
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          {/* left heading */}
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-[#1f1f1f]">
              Host Dashboard
            </h1>
            <h2 className="text-[#6b6b6b]">
              Welcome back! Here's your performance overview
            </h2>
          </div>

          {/* right buttons */}
          <div className="">
            <Link
              to="/post/job"
              className="text-sm flex flex-row items-center justify-center text-white gap-1 bg-[#1f1f1f] hover:bg-[#333] rounded-full mt-4 md:mt-0 py-2.5 px-5 cursor-pointer transition"
            >
              Post New Task <ChevronRight size={15} />
            </Link>
          </div>
        </div>

        {/* boxes for the different activities */}
        <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
          <div
            className={`${GLASS} text-[#1f1f1f] h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <TrendingUp className="text-[#1f1f1f]" size={22} />
            </span>
            <div className="flex flex-col text-center">
              <p className="text-xl font-semibold">₹{totalInvestment}</p>
              <p className="text-[#6b6b6b] text-sm">Total Investment</p>
            </div>
          </div>

          <div
            className={`${GLASS} text-[#1f1f1f] h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <SquareCheckBig className="text-[#1f1f1f]" size={22} />
            </span>
            <div className="flex flex-col text-center">
              <p className="text-xl font-semibold">{tasks?.length || 0}</p>
              <p className="text-[#6b6b6b] text-sm">Tasks Posted</p>
            </div>
          </div>

          <div
            className={`${GLASS} text-[#1f1f1f] h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <ClockArrowUp className="text-[#1f1f1f]" size={22} />
            </span>
            <div className="flex flex-col text-center">
              <p className="text-xl font-semibold">{activeTasks}</p>
              <p className="text-[#6b6b6b] text-sm">Active Tasks</p>
            </div>
          </div>

          <div
            className={`${GLASS} text-[#1f1f1f] h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <Star className="text-[#1f1f1f]" size={22} />
            </span>
            <div className="flex flex-col text-center">
              <p className="text-xl font-semibold">
                {profileData?.rating?.average || 0}
              </p>
              <p className="text-[#6b6b6b] text-sm">Average Rating</p>
            </div>
          </div>
        </div>

        {/* placing different components at single place */}
        <div className="mt-16">
          {/* buttons */}
          <div
            className={`${GLASS} p-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4`}
          >
            <button
              onClick={() => {
                setComponents("activeTasks");
              }}
              className={`${TAB_BASE} ${
                components === "activeTasks"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Active Task
            </button>

            <button
              onClick={() => {
                setComponents("completedTasks");
              }}
              className={`${TAB_BASE} ${
                components === "completedTasks"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              History
            </button>

            <button
              onClick={() => {
                setComponents("analytics");
              }}
              className={`${TAB_BASE} ${
                components === "analytics"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Analytics
            </button>

            <button
              onClick={() => {
                setComponents("deletedTasks");
              }}
              className={`${TAB_BASE} ${
                components === "deletedTasks"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Deleted tasks
            </button>
          </div>

          {/* here comes the three diff components  */}

          <div className="mt-6">
            {(components === "activeTasks" && <HostActiveTask />) ||
              (components === "completedTasks" && <HostCompletedTasks />) ||
              (components === "analytics" && <HostAnalytics />) ||
              (components === "deletedTasks" && <DeletedTasks />) || (
                <HostActiveTask />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;