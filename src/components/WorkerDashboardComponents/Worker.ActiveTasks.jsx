import React from "react";
import {CalendarDays } from 'lucide-react'
const WorkerActiveTasks = () => {
  const activeTasks = [
    {
      id: "TSK-2024-1",
      title: "Fix Front Door Lock",
      location: "Hyderabad",
      date: "21 Nov 2025",
      price: 650,
      status: "In Progress",
    },
    {
      id: "TSK-2024-2",
      title: "Install Ceiling Fan",
      location: "Gachibowli",
      date: "19 Nov 2025",
      price: 450,
      status: "Pending",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Active Tasks</h2>

      {/* Tasks List */}
      <div className="flex flex-col gap-4">
        {activeTasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{task.title}</h3>
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
              <p>📍 {task.location}</p>
              <p className="flex flex-row justify-center items-center gap-1"><CalendarDays size={16} /> {task.date}</p>
            </div>

            {/* Bottom Row */}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-800">
                ₹{task.price}
              </p>
              <button className="px-4 cursor-pointer py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerActiveTasks;
