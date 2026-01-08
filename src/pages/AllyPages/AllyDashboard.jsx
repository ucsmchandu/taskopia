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
    retry: 2,
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
    <div className="mt-25 lg:mt-30 p-8 text-gray-800 m-6 lg:m-20 border-2 border-dashed rounded-2xl shadow-lg border-gray-200">
      {/* Header */}
      <div className=" flex flex-col md:flex-row items-center justify-between ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Ally Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Track your tasks, earnings, performance, and history.
          </p>
        </div>

        <div className="mt-10 md:mt-0">
          <Link
            to="/job/listings"
            className="border px-4 p-1 flex flex-row justify-center gap-2 items-center py-2 text-sm rounded-2xl text-white shadow-md hover:shadow-lg hover:bg-lime-900 hover:scale-105 ease-in-out transition-all bg-lime-800 cursor-pointer"
          >
            Apply For Task
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Earnings */}
        <div className="  bg-gradient-to-r from-[#6B3F69] to-[#A376A2] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <Coins size={28} className="text-white" />
          <div className="text-center">
            <p className="text-xl text-green-300 font-semibold">₹ {getTotalEarnings}</p>
            <p className="text-white text-sm">Total Earnings</p>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-gradient-to-r from-[#6B3F69] to-[#A376A2] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <ClipboardList size={28} className="text-white" />
          <div className="text-center">
            <p className="text-xl text-green-300 font-semibold">{getActiveTasks?.length}</p>
            <p className="text-white text-sm">Active Tasks</p>
          </div>
        </div>

        {/* Completed tasks */}
        <div className="bg-gradient-to-r from-[#6B3F69] to-[#A376A2] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <CheckCircle size={28} className="text-white" />
          <div className="text-center">
            <p className="text-xl text-green-300 font-semibold">{getCompletedTasks?.length}</p>
            <p className="text-white text-sm">Completed Tasks</p>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-gradient-to-r from-[#6B3F69] to-[#A376A2] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <TrendingUp size={28} className="text-white" />
          <div className="text-center">
            <p className="text-xl text-green-300 font-semibold">92%</p>
            <p className="text-white text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Switch Buttons */}
      <div className="mt-16">
        <div className="border border-gray-200 p-2 bg-white rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => setSection("active")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${
              section === "active"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Active Tasks
          </button>

          <button
            onClick={() => setSection("earnings")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${
              section === "earnings"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Earnings
          </button>

          <button
            onClick={() => setSection("history")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${
              section === "history"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Task History
          </button>

          <button
            onClick={() => setSection("analytics")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${
              section === "analytics"
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
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
  );
};

export default AllyDashboard;
