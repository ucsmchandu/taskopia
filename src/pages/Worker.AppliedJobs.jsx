import React from "react";
import { MapPin, Calendar, Search } from "lucide-react";

const WorkerAppliedJobs = () => {
  return (
    <div className="mt-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* LEFT SIDE */}
        <div className="w-full lg:flex-1 flex flex-col gap-6">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Applied Tasks</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Track and manage all your Task applications in one place.
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-5 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applied tasks..."
                className="pl-10 w-full border outline-0 border-gray-300 rounded-lg py-2.5 px-4 text-sm shadow-sm focus:ring-2 "
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2.5 shadow-sm bg-white min-w-[160px] cursor-pointer hover:border-gray-400 transition">
              {/* <span className="text-sm text-gray-600 font-medium">Sort by:</span> */}
              <select className="outline-none text-sm bg-transparent text-gray-700 w-full cursor-pointer">
                <option value="newest">Newest</option>
                <option value="old">Oldest</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>

          {/* MOBILE QUICK ACTIONS */}
          <div className="lg:hidden flex flex-col gap-3 border border-gray-200 p-5 shadow-sm rounded-2xl bg-white">
            <h3 className="font-semibold text-gray-900 mb-1">Quick Actions</h3>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer transition shadow-sm">
              Apply New Task
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer border border-gray-200 transition">
              Dashboard
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 cursor-pointer border border-gray-200 transition">
              View Profile
            </button>
          </div>

          {/* MOBILE NOTIFICATIONS */}
          <div className="lg:hidden border border-gray-200 bg-white shadow-sm rounded-2xl p-5">
            <h2 className="font-semibold text-gray-800">Notifications</h2>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
              <p className="text-sm text-gray-500">You have no new alerts.</p>
            </div>
          </div>

          {/* Applied Task Cards */}
          <div className="flex flex-col gap-4 mt-4">

            {/* Card 1 */}
            <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">Product Designer</h1>
                <p className="flex items-center text-sm text-gray-500 gap-1.5">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-600">Innotech</span>
                  <span className="text-gray-300">•</span> Vizag, NY
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <Calendar size={15} />
                <span>Applied Oct 20, 2023</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">Frontend Developer</h1>
                <p className="flex items-center text-sm text-gray-500 gap-1.5">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-600">TechCorp</span>
                  <span className="text-gray-300">•</span> Vizag, NY
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <Calendar size={15} />
                <span>Applied Oct 22, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP ONLY) */}
        <div className="w-full lg:w-80 hidden lg:flex flex-col gap-6 sticky top-24 h-fit">

          {/* Desktop Quick Actions */}
          <div className="flex flex-col gap-3 border border-gray-200 p-5 shadow-sm rounded-2xl bg-white">
            <h3 className="font-semibold text-gray-900 mb-1">Quick Actions</h3>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">
              Apply New Task
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition">
              Dashboard
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition">
              View Profile
            </button>
          </div>

          {/* Notifications */}
          <div className="border border-gray-200 bg-white shadow-sm rounded-2xl p-5">
            <h2 className="font-semibold text-gray-800">Notifications</h2>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
              <p className="text-sm text-gray-500">You have no new alerts.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkerAppliedJobs;
