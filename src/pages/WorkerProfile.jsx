import React, { useState } from "react";
import { useAuth } from "../AuthContextApi/AuthContext";

const WorkerProfile = () => {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState({
    userName: "",
    age: "",
    city: "",
    study: "",
    description: "",
    skills: [],
    availability: "",
  });
  //for editing
  const [isEditing, setIsEditing] = useState(false);

  //for canceling the editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  //data handleing
  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setIsEditing(false);
  };

  return (
    <>
    {/* if editing is enabled */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/1 backdrop-blur-md animate-fadeIn p-4">
          <div className="w-full max-w-lg md:max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-700 text-xl hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Username
                  </label>
                  <input
                    name="userName"
                    value={userData.userName}
                    onChange={handleData}
                    placeholder="Username"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Age
                  </label>
                  <input
                    name="age"
                    value={userData.age}
                    onChange={handleData}
                    type="number"
                    min="15"
                    placeholder="Age"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    value={userData.city}
                    onChange={handleData}
                    placeholder="City"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Study / Course
                  </label>
                  <input
                    name="study"
                    value={userData.study}
                    onChange={handleData}
                    placeholder="Your course or study"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Short Bio
                </label>
                <textarea
                  name="description"
                  value={userData.description}
                  onChange={handleData}
                  rows={4}
                  placeholder="A short description about you"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                />
              </div>

              {/* Skills + Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={
                      Array.isArray(userData.skills)
                        ? userData.skills.join(", ")
                        : ""
                    }
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      }))
                    }
                    placeholder="e.g. Cashier, Delivery"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={userData.availability}
                    onChange={handleData}
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  >
                    <option value="">Select availability</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* if editing not enabled */}
      {!isEditing && (
        <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-10">
          <div className="flex flex-col md:flex-row gap-10 mt-20">
            {/* Left Section */}
            <div className="md:w-1/3 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
              <img
                src={currentUser.photoURL}
                alt="profile"
                className="h-32 w-32 rounded-full shadow-md"
              />

              <div className="text-center mt-4 space-y-1">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {userData.userName || currentUser.displayName}
                </h1>
                <p className="text-gray-500">{currentUser.email}</p>
                <p className="text-gray-500">19, Vizag</p>
                <p className="text-gray-500">B.Tech, 3rd Year</p>
              </div>

              <p className="mt-4 text-gray-600 text-center">
                I'm a B.Tech student looking for weekend work opportunities to
                earn and gain experience.
              </p>

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

              <button
                onClick={() => setIsEditing(true)}
                className="mt-8 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Edit Profile
              </button>
            </div>

            {/* Right Section */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                My Profile
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Past Jobs Completed
              </h2>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((job) => (
                  <div
                    key={job}
                    className="border border-gray-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-green-600 text-sm font-medium">
                      Completed
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      Cashier at Local Grocery Store
                    </h3>
                    <p className="text-gray-500 text-sm">Owner: Mr. Chandu</p>

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
      )}
    </>
  );
};

export default WorkerProfile;
