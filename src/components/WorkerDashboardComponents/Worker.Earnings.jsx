import React from "react";
import { Wallet, ArrowDownCircle, Clock, CheckCircle } from "lucide-react";

const WorkerEarnings = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border text-gray-800">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2">Earnings Overview</h2>
      <p className="text-gray-500 mb-6">
        Track your earnings, withdrawals, and pending payments.
      </p>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        {/* Total Earnings */}
        <div className="border bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <Wallet size={32} className="text-gray-700" />
          <div>
            <p className="text-2xl font-semibold">$450</p>
            <p className="text-gray-500 text-sm">Total Earnings</p>
          </div>
        </div>

        {/* Withdrawable */}
        <div className="border bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <ArrowDownCircle size={32} className="text-gray-700" />
          <div>
            <p className="text-2xl font-semibold">$120</p>
            <p className="text-gray-500 text-sm">Withdrawable</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="border bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <Clock size={32} className="text-gray-700" />
          <div>
            <p className="text-2xl font-semibold">$80</p>
            <p className="text-gray-500 text-sm">Pending Payments</p>
          </div>
        </div>
      </div>

      {/* Recent Earnings Table */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Recent Payments</h3>

        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-sm text-gray-600">Task</th>
                <th className="py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="py-3 px-4 text-sm text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-4">Website Fix</td>
                <td className="py-3 px-4">$40</td>
                <td className="py-3 px-4 flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} /> Paid
                </td>
                <td className="py-3 px-4">12 Nov 2025</td>
              </tr>

              <tr className="border-t">
                <td className="py-3 px-4">Logo Redesign</td>
                <td className="py-3 px-4">$60</td>
                <td className="py-3 px-4 flex items-center gap-1 text-yellow-500">
                  <Clock size={16} /> Pending
                </td>
                <td className="py-3 px-4">09 Nov 2025</td>
              </tr>

              <tr className="border-t">
                <td className="py-3 px-4">Data Entry</td>
                <td className="py-3 px-4">$20</td>
                <td className="py-3 px-4 flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} /> Paid
                </td>
                <td className="py-3 px-4">05 Nov 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerEarnings;
