import React, { useState } from "react";
import { useAuth } from "../AuthContextApi/AuthContext";

const ReportProblem = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.userType;
  
  const [formData, setFormData] = useState({
    issueType: "",
    taskName: "",
    otherName: "",
    profileUrl: "",
    taskId: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Todo: add separate page for this
    console.log("Report submitted:", formData);
    setFormData({
      issueType: "",
      taskName: "",
      otherName: "",
      profileUrl: "",
      taskId: "",
      description: ""
    });
  };

  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="h-1"></div>

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="max-w-3xl mb-20">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Report a Problem
              </h1>
              <p className="text-base text-gray-700 leading-relaxed max-w-2xl font-light">
                Report issues related to tasks, communication, or platform rule violations. Your account role is detected automatically to help us review your report in the correct context.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20">

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Submit a Report</h2>
              <div className="w-12 h-1 bg-gray-900 mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Issue Type
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-white">Select an issue type</option>
                  <option value="chat" className="bg-white">Inappropriate chat messages</option>
                  <option value="harassment" className="bg-white">Harassment or abuse</option>
                  <option value="false-info" className="bg-white">False or misleading task information</option>
                  <option value="no-show" className="bg-white">No-show or task-related issue</option>
                  <option value="violation" className="bg-white">Violation of platform rules</option>
                  <option value="other" className="bg-white">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Task Name (optional)
                </label>
                <input
                  type="text"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  placeholder="Enter the task name"
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>

              {role === "host" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Task Doer Name (optional)
                    </label>
                    <input
                      type="text"
                      name="otherName"
                      value={formData.otherName}
                      onChange={handleChange}
                      placeholder="Enter the task doer's name"
                      className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Task Doer Profile URL (optional)
                    </label>
                    <input
                      type="url"
                      name="profileUrl"
                      value={formData.profileUrl}
                      onChange={handleChange}
                      placeholder="https://taskopia.com/profile/username"
                      className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </>
              )}

              {role === "ally" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Task Poster Name (optional)
                    </label>
                    <input
                      type="text"
                      name="otherName"
                      value={formData.otherName}
                      onChange={handleChange}
                      placeholder="Enter the task poster's name"
                      className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Task Poster Profile URL (optional)
                    </label>
                    <input
                      type="url"
                      name="profileUrl"
                      value={formData.profileUrl}
                      onChange={handleChange}
                      placeholder="https://taskopia.com/profile/username"
                      className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Task ID (optional)
                </label>
                <input
                  type="text"
                  name="taskId"
                  value={formData.taskId}
                  onChange={handleChange}
                  placeholder="Enter task ID if available"
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe the issue clearly and factually. Include relevant details and timestamps if possible."
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-8 cursor-pointer px-8 py-3 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200"
              >
                Submit Report
              </button>
            </form>
          </div>

          <div className="space-y-12">
            
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Role Detected Automatically
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Your account type ({role === "host" ? "Task Poster" : role === "ally" ? "Task Doer" : "unknown"}) is detected from your login. This helps ensure the report is reviewed in the correct context.
              </p>
            </div>

            <div className="border-l-4 border-gray-700 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What Happens Next
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Reports are reviewed for potential violations of platform rules. Appropriate action may be taken where necessary based on the nature and severity of the report.
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Important Guidelines
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-gray-900 font-bold mt-0.5">–</span>
                  <span>Provide factual information without exaggeration</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-gray-900 font-bold mt-0.5">–</span>
                  <span>Include dates, times, and specific details when possible</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-gray-900 font-bold mt-0.5">–</span>
                  <span>Do not include personal information beyond what's necessary</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm">
                  <span className="text-gray-900 font-bold mt-0.5">–</span>
                  <span>False or abusive reports may result in account action</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t-2 border-gray-300 mt-12">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Response Timeline
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most reports are reviewed within 24-48 hours. Complex cases may take longer. You will not receive a direct response, but action will be taken if the report is substantiated.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="h-1 mt-24"></div>
    </div>
  );
};

export default ReportProblem;