import React from "react";
import { Radar, CheckCheck, Coins, UserRoundPen } from "lucide-react";

const OwnerActiveTasks = () => {
  return (
    <div className="mt-10 text-gray-800">
      {/* heading */}
      <div className="mt-10">
        <h1 className="text-2xl font-semibold">Current Task</h1>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full flex flex-col gap-6">
          {/* card 1 */}
          <div className="border border-gray-300 p-8 w-full bg-white rounded-xl shadow-sm hover:shadow-md transition">
            {/* for the top elements */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3 text-sm h-fit">
                <p className="border border-gray-400 rounded-2xl px-4 py-1">
                  Design
                </p>
                <p className="border border-gray-400 rounded-2xl px-3 py-1">
                  in progress
                </p>
              </div>
              <div className="text-sm text-right">
                <p className="text-lg font-semibold">$250</p>
                <p className="text-gray-500">Due: 1/1/2020</p>
              </div>
            </div>

            {/* for the down elements */}
            <div className="mt-4">
              <p className="text-lg font-medium">Logo Design for Coffee Shop</p>
              <p className="text-sm text-gray-500">Posted by Sarah Johnson</p>
            </div>

            <div className="flex justify-center mt-8">
              <button className="border border-gray-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                View Details
              </button>
            </div>
          </div>

          {/* card 2 */}
          <div className="border border-gray-300 p-8 w-full bg-white rounded-xl shadow-sm hover:shadow-md transition">
            {/* for the top elements */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3 text-sm h-fit">
                <p className="border border-gray-400 rounded-2xl px-4 py-1">
                  Design
                </p>
                <p className="border border-gray-400 rounded-2xl px-3 py-1">
                  in progress
                </p>
              </div>
              <div className="text-sm text-right">
                <p className="text-lg font-semibold">$250</p>
                <p className="text-gray-500">Due: 1/1/2020</p>
              </div>
            </div>

            {/* for the down elements */}
            <div className="mt-4">
              <p className="text-lg font-medium">Logo Design for Coffee Shop</p>
              <p className="text-sm text-gray-500">Posted by Sarah Johnson</p>
            </div>

            <div className="flex justify-center mt-8">
              <button className="border border-gray-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                View Details
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-64 w-full border border-gray-300 p-6 bg-white h-fit rounded-xl shadow-sm">
          <h1 className="text-2xl font-semibold">Quick Actions</h1>

          <div className="flex flex-col mt-4 gap-3">
            <button className="flex gap-3 items-center border border-gray-400 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <Radar size={18} /> Find New Tasks
            </button>

            <button className="flex gap-3 items-center border border-gray-400 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <CheckCheck size={18} /> Post a Task
            </button>

            <button className="flex gap-3 items-center border border-gray-400 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <Coins size={18} /> View Earnings
            </button>

            <button className="flex gap-3 items-center border border-gray-400 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <UserRoundPen size={18} /> Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerActiveTasks;
