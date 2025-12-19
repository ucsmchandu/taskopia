import { useState } from "react";

export default function JobApply() {
  const [canStart, setCanStart] = useState("yes");

  return (
    <div className="max-w-md mt-30 mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Apply for Task</h2>

      {/* Start Immediately */}
      <div>
        <label className="block font-medium mb-1">Can you start immediately?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="start"
              value="yes"
              checked={canStart === "yes"}
              onChange={() => setCanStart("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="start"
              value="no"
              checked={canStart === "no"}
              onChange={() => setCanStart("no")}
            />
            No
          </label>
        </div>

        {canStart === "no" && (
          <input
            type="date"
            className="mt-3 w-full border rounded-lg px-3 py-2 outline-none"
          />
        )}
      </div>

      {/* Expected Pay */}
      <div>
        <label className="block font-medium mb-1">Expected Pay (₹)</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border rounded-lg px-3 py-2 outline-none"
        />
      </div>

      {/* Optional Note */}
      <div>
        <label className="block font-medium mb-1">
          Anything you want to tell the client? (optional)
        </label>
        <textarea
          maxLength={100}
          placeholder="Short note, up to 100 characters"
          className="w-full border rounded-lg px-3 py-2 outline-none resize-none h-24"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">Max 100 characters</p>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
        Submit Application
      </button>
    </div>
  );
}
