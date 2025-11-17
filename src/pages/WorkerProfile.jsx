import React from "react";
import {useAuth} from '../AuthContextApi/AuthContext'
const WorkerProfile = () => {
  const {currentUser}=useAuth();
  console.log(currentUser);
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-10">
      <div className="flex flex-col md:flex-row gap-10 mt-20">
        {/* Left Section-Profile Info */}
        <div className="md:w-1/3 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={currentUser.photoURL}
            alt="profile"
            className="h-32 w-32 rounded-full shadow-md"
          />

          {/* Basic Info */}
          <div className="text-center mt-4 space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800">{currentUser.displayName}</h1>
            <p className="text-gray-500">19, Vizag</p>
            <p className="text-gray-500">B.Tech, 3rd Year</p>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-600 text-center">
            I'm a B.Tech student looking for weekend work opportunities to earn
            and gain experience.
          </p>

          {/* Skills & Interests */}
          <div className="mt-6 w-full text-center">
            <h2 className="font-semibold text-gray-800 mb-2">
              Skills & Interests
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Cashier", "Delivery", "Cleaning", "Teamwork"].map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <h2 className="font-semibold text-gray-800 mt-6 mb-2">
              Availability
            </h2>
            <p className="text-gray-600">Weekends, 4–6 PM</p>
          </div>

          {/* Edit Button */}
          <button className="mt-8 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition">
            Edit Profile
          </button>
        </div>

        {/* Right Section - Job History */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">My Profile</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Past Jobs Completed
          </h2>

          {/* Job Cards */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((job) => (
              <div
                key={job}
                className="border border-gray-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <p className="text-green-600 text-sm font-medium">Completed</p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  Cashier at Local Grocery Store
                </h3>
                <p className="text-gray-500 text-sm">Owner: Mr. Chandu</p>

                {/* Rating Placeholder */}
                <div className="flex items-center mt-2">
                  <p className="text-gray-600 text-sm">Rating:</p>
                  <div className="ml-2 flex text-yellow-400">
                    {"★★★★★".split("").map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Earnings Progress Section */}
          <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Earnings Summary
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ₹6,500 earned this month (65% of goal)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
