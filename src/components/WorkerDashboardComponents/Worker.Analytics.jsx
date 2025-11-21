import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WorkerAnalytics = () => {
  const monthlyData = [
    { month: "Jan", earnings: 2400 },
    { month: "Feb", earnings: 3200 },
    { month: "Mar", earnings: 1900 },
    { month: "Apr", earnings: 4100 },
    { month: "May", earnings: 3800 },
    { month: "Jun", earnings: 4500 },
  ];

  return (
    <div className="w-full flex flex-col gap-8 animate-fadeIn">

      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">48</h3>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Completed</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">41</h3>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Cancelled</p>
          <h3 className="text-2xl font-bold text-red-500 mt-1">7</h3>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Earnings</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#1f2937" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Rating</h3>
          <p className="text-4xl font-bold text-yellow-500">4.8 ⭐</p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Most Active Area</h3>
          <p className="text-xl font-medium text-gray-600">Gachibowli</p>
        </div>

      </div>

    </div>
  );
};

export default WorkerAnalytics;
