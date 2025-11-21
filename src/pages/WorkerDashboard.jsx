import React, { useState } from "react";
import { ClipboardList, CheckCircle, Coins, TrendingUp } from "lucide-react";
import WorkerActiveTasks from "../components/WorkerDashboardComponents/Worker.ActiveTasks";
import WorkerAnalytics from "../components/WorkerDashboardComponents/Worker.Analytics";
import WorkerEarnings from "../components/WorkerDashboardComponents/Worker.Earnings";
import WorkerHistory from "../components/WorkerDashboardComponents/Worker.History";
const WorkerDashboard = () => {
  const [section, setSection] = useState("active");

  return (
    <div className="mt-20 p-8 text-gray-800 lg:m-30">

      {/* Header */}
      <div className=" flex flex-col md:flex-row items-center justify-between ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Worker Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Track your tasks, earnings, performance, and history.
          </p>
        </div>

        <div className="mt-10 md:mt-0">
          <button className="border px-4 p-1 text-sm rounded-2xl cursor-pointer">Apply For Task</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Earnings */}
        <div className="border border-gray-200 bg-white rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <Coins size={28} className="text-gray-700" />
          <div className="text-center">
            <p className="text-xl font-semibold">$450</p>
            <p className="text-gray-500 text-sm">Total Earnings</p>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="border border-gray-200 bg-white rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <ClipboardList size={28} className="text-gray-700" />
          <div className="text-center">
            <p className="text-xl font-semibold">3</p>
            <p className="text-gray-500 text-sm">Active Tasks</p>
          </div>
        </div>

        {/* Completed tasks */}
        <div className="border border-gray-200 bg-white rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <CheckCircle size={28} className="text-gray-700" />
          <div className="text-center">
            <p className="text-xl font-semibold">18</p>
            <p className="text-gray-500 text-sm">Completed Tasks</p>
          </div>
        </div>

        {/* Performance */}
        <div className="border border-gray-200 bg-white rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <TrendingUp size={28} className="text-gray-700" />
          <div className="text-center">
            <p className="text-xl font-semibold">92%</p>
            <p className="text-gray-500 text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Switch Buttons */}
      <div className="mt-16">
        <div className="border border-gray-200 p-2 bg-white rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

          <button
            onClick={() => setSection("active")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${section === "active" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
          >
            Active Tasks
          </button>

          <button
            onClick={() => setSection("earnings")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${section === "earnings" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
          >
            Earnings
          </button>

          <button
            onClick={() => setSection("history")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${section === "history" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
          >
            Task History
          </button>

          <button
            onClick={() => setSection("analytics")}
            className={`border cursor-pointer border-gray-300 rounded-lg px-6 py-2 w-full text-sm transition
            ${section === "analytics" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
          >
            Analytics
          </button>

        </div>

        {/* Section Content */}
        <div className="mt-8">

          {section === "active" && (
            <WorkerActiveTasks/>
          )}

          {section === "earnings" && (
           <WorkerEarnings/>
          )}

          {section === "history" && (
           <WorkerHistory/>
          )}

          {section === "analytics" && (
            <WorkerAnalytics/>
          )}

        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
