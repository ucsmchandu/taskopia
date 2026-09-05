import React, { useState } from "react";
import {
  ClipboardList,
  CheckCircle,
  Coins,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import AllyActiveTasks from "../../components/AllyDashboardComponents/Ally.ActiveTasks";
import AllyAnalytics from "../../components/AllyDashboardComponents/Ally.Analytics";
import AllyEarnings from "../../components/AllyDashboardComponents/Ally.Earnings";
import AllyHistory from "../../components/AllyDashboardComponents/Ally.History";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

// shared glass tokens — kept consistent with the rest of the app
const GLASS =
  "bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_10px_36px_rgba(0,0,0,0.06)] rounded-2xl";

const TAB_BASE =
  "rounded-lg px-6 py-2 w-full text-sm transition cursor-pointer border border-transparent";

const AllyDashboard = () => {
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
    refetchOnReconnect: true,
    enabled: true,
  });
  // console.log(applications)

  const getCompletedTasks=applications?.filter(t=>t.status==="completed");
  // console.log(getCompletedTasks?.length || 0)

  const getActiveTasks=applications?.filter(t=>t.status==="accepted");
  // console.log(getActiveTasks)

  const getTotalEarnings=getCompletedTasks?.reduce(
    (sum,t)=>sum+Number(t.task.budget || 0),0
  ) ?? 0;
  // console.log(getTotalEarnings)

  const [section, setSection] = useState("active");

  return (
    <div className="relative min-h-screen bg-[#eef0f2]">
      {/* pure glass depth — soft white highlights only, no color */}
      <div className="pointer-events-none fixed -top-40 -right-32 w-[560px] h-[560px] rounded-full blur-[100px] opacity-70 bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-44 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-60 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_70%)]" />

      <div
        className={`relative mt-25 lg:mt-30 p-8 text-[#1f1f1f] m-6 lg:m-20 ${GLASS}`}
      >
        {/* Header */}
        <div className=" flex flex-col md:flex-row items-center justify-between ">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1f1f1f]">
              Ally Dashboard
            </h1>
            <p className="text-[#6b6b6b] mt-1">
              Track your tasks, earnings, performance, and history.
            </p>
          </div>

          <div className="mt-10 md:mt-0">
            <Link
              to="/job/listings"
              className="flex flex-row justify-center gap-2 items-center py-2.5 px-5 text-sm rounded-full text-white transition-all bg-[#1f1f1f] hover:bg-[#333] cursor-pointer"
            >
              Apply For Task
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Earnings */}
          <div
            className={`${GLASS} h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <Coins size={22} className="text-[#1f1f1f]" />
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold text-[#1f1f1f]">
                ₹ {getTotalEarnings}
              </p>
              <p className="text-[#6b6b6b] text-sm">Total Earnings</p>
            </div>
          </div>

          {/* Active Tasks */}
          <div
            className={`${GLASS} h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <ClipboardList size={22} className="text-[#1f1f1f]" />
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold text-[#1f1f1f]">
                {getActiveTasks?.length}
              </p>
              <p className="text-[#6b6b6b] text-sm">Active Tasks</p>
            </div>
          </div>

          {/* Completed tasks */}
          <div
            className={`${GLASS} h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <CheckCircle size={22} className="text-[#1f1f1f]" />
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold text-[#1f1f1f]">
                {getCompletedTasks?.length}
              </p>
              <p className="text-[#6b6b6b] text-sm">Completed Tasks</p>
            </div>
          </div>

          {/* Performance */}
          <div
            className={`${GLASS} h-44 w-full flex flex-col justify-center items-center gap-3 hover:bg-white/70 transition`}
          >
            <span className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
              <TrendingUp size={22} className="text-[#1f1f1f]" />
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold text-[#1f1f1f]">92%</p>
              <p className="text-[#6b6b6b] text-sm">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Switch Buttons */}
        <div className="mt-16">
          <div
            className={`${GLASS} p-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4`}
          >
            <button
              onClick={() => setSection("active")}
              className={`${TAB_BASE} ${
                section === "active"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Active Tasks
            </button>

            <button
              onClick={() => setSection("earnings")}
              className={`${TAB_BASE} ${
                section === "earnings"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Earnings
            </button>

            <button
              onClick={() => setSection("history")}
              className={`${TAB_BASE} ${
                section === "history"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Task History
            </button>

            <button
              onClick={() => setSection("analytics")}
              className={`${TAB_BASE} ${
                section === "analytics"
                  ? "bg-[#1f1f1f] text-white"
                  : "text-[#5c5c5c] hover:bg-white/60 border-black/10"
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Section Content */}
          <div className="mt-8 min-h-screen">
            {section === "active" && <AllyActiveTasks />}

            {section === "earnings" && <AllyEarnings />}

            {section === "history" && <AllyHistory />}

            {section === "analytics" && <AllyAnalytics />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllyDashboard;