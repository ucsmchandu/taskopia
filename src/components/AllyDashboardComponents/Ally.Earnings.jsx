import React from "react";
import { Wallet, ArrowDownCircle, Clock, CheckCircle } from "lucide-react";

const AllyEarnings = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 text-gray-800 max-w-full">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold mb-1">Earnings Overview</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
        Track your earnings, withdrawals, and pending payments.
      </p>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {/* Total Earnings */}
        <div className="bg-gradient-to-l from-[#5A9690] to-[#2F5755] rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
          <Wallet size={28} className="text-white" />
          <div>
            <p className="text-lg sm:text-2xl text-yellow-400 font-semibold">$450</p>
            <p className="text-white text-xs sm:text-sm">Total Earnings</p>
          </div>
        </div>

        {/* Withdrawable */}
        <div className="bg-gradient-to-l from-[#5A9690] to-[#2F5755] rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
          <ArrowDownCircle size={28} className="text-white" />
          <div>
            <p className="text-lg sm:text-2xl text-yellow-400 font-semibold">$120</p>
            <p className="text-white text-xs sm:text-sm">Withdrawable</p>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-gradient-to-l from-[#5A9690] to-[#2F5755] rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition">
          <Clock size={28} className="text-white" />
          <div>
            <p className="text-lg sm:text-2xl text-yellow-400 font-semibold">$80</p>
            <p className="text-white text-xs sm:text-sm">Pending Payments</p>
          </div>
        </div>
      </div>

      {/* Recent Earnings */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Recent Payments</h3>

        {/* Desktop / tablet: table with horizontal scroll fallback */}
        <div className="hidden sm:block border-2 border-gray-300 rounded-xl overflow-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-sm text-gray-600">Task</th>
                <th className="py-3 px-4 text-sm text-gray-600">Amount</th>
                <th className="py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="py-3 px-4 text-sm text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-300">
                <td className="py-3 px-4">Website Fix</td>
                <td className="py-3 px-4">$40</td>
                <td className="py-3 px-4 flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} /> <span>Paid</span>
                </td>
                <td className="py-3 px-4">12 Nov 2025</td>
              </tr>

              <tr className="border-t border-gray-300">
                <td className="py-3 px-4">Logo Redesign</td>
                <td className="py-3 px-4">$60</td>
                <td className="py-3 px-4 flex items-center gap-2 text-yellow-500">
                  <Clock size={16} /> <span>Pending</span>
                </td>
                <td className="py-3 px-4">09 Nov 2025</td>
              </tr>

              <tr className="border-t border-gray-300">
                <td className="py-3 px-4">Data Entry</td>
                <td className="py-3 px-4">$20</td>
                <td className="py-3 px-4 flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} /> <span>Paid</span>
                </td>
                <td className="py-3 px-4">05 Nov 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="sm:hidden space-y-3">
          <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Website Fix</div>
                <div className="text-base font-semibold mt-1">$40</div>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <div className="text-xs text-gray-500">12 Nov 2025</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Logo Redesign</div>
                <div className="text-base font-semibold mt-1">$60</div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Clock size={16} />
                <div className="text-xs text-gray-500">09 Nov 2025</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Data Entry</div>
                <div className="text-base font-semibold mt-1">$20</div>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <div className="text-xs text-gray-500">05 Nov 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllyEarnings;