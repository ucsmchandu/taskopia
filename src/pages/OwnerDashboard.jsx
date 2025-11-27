import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { ClockArrowUp,ChevronRight  } from "lucide-react";
import { Star } from "lucide-react";
// importing the active task, completed tasks, analytics components
import OwnerActiveTask from "../components/OwnerDashboard.componets/Owner.ActiveTask";
import OwnerAnalytics from "../components/OwnerDashboard.componets/Owner.Analytics";
import OwnerCompletedTasks from "../components/OwnerDashboard.componets/Owner.History";
const OwnerDashboard = () => {
  const [components, setComponents] = useState("activeTasks");
  return (
    <div className="mt-20 lg:mt-30 p-8 text-gray-800 lg:m-30">
      {/* for the top bar section heading */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        {/* left heading */}
        <div>
          <h1 className="text-4xl font-semibold">Owner Dashboard</h1>
          <h2 className="text-gray-500">
            Welcome back! Here's your performance overview
          </h2>
        </div>

        {/* right buttons */}
        <div>
          <button className="text-sm flex flex-row items-center justify-center gap-1 bg-[#257180] text-white hover:scale-105 rounded-2xl mt-4 md:mt-0 py-2 px-4 cursor-pointer transition">
            Post New Task <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* boxes for the different activities */}
      <div className="grid gap-6 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-items-center">
        <div className=" text-white bg-gradient-to-l from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <TrendingUp className=" text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">$200</p>
            <p className="text-white text-sm">Total Investment</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <SquareCheckBig className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">23</p>
            <p className="text-white text-sm">Tasks Posted</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <ClockArrowUp className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">5</p>
            <p className="text-white text-sm">Active Tasks</p>
          </div>
        </div>

        <div className=" bg-gradient-to-l text-white from-[#AA5486] to-[#e69dc7] rounded-2xl h-44 w-full shadow-sm flex flex-col justify-center items-center gap-3 hover:shadow-md transition">
          <Star className="text-white" size={28} />
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">4.8</p>
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
        </div>

        {/* here comes the three diff components  */}

        <div>
          {(components === "activeTasks" && <OwnerActiveTask />) ||
            (components === "completedTasks" && <OwnerCompletedTasks />) ||
            (components === "analytics" && <OwnerAnalytics />) || (
              <OwnerActiveTask />
            )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
