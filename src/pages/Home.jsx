import React from "react";
import img from "../assests/img.png";

const Home = () => {
  const user = null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-32">
        <div className="flex ml-6 flex-col items-center md:items-start text-center md:text-left space-y-7 max-w-xl order-2 md:order-1">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
                       font-black leading-none tracking-tight lg:mt-10 mt-6"
            style={{ lineHeight: "0.95" }}
          >
            <span className="text-gray-900">Find Quick</span>
            <br />
            <span
              className="inline-block text-teal-400 
                         hover:text-teal-300 transition-all duration-300 
                         cursor-pointer transform hover:scale-105"
              style={{
                WebkitTextStroke: "2px #000",
                textShadow: "4px 4px 0px rgba(0,0,0,0.4)",
                letterSpacing: "-2px",
              }}
            >
              Local Gigs Now
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-md">
            Students and locals can find instant short-term jobs, and business
            owners can hire on demand — all on one secure, simple platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {user ? (
              <button className="px-8 py-4 cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-red-600 transition transform hover:-translate-y-1 font-semibold text-lg">
                Go to Dashboard
              </button>
            ) : (
              <button className="px-8 py-4 cursor-pointer bg-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-teal-600 transition transform hover:-translate-y-1 font-semibold text-lg">
                Login / Signup
              </button>
            )}
            <button className="px-8 py-4 cursor-pointer border border-gray-300 bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 font-semibold text-lg">
              Post a Job
            </button>
          </div>
        </div>

        <div className="mt-16 md:mt-0 w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <img
            src={img}
            alt="Short-term Gig Hero Illustration"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain 
                       rounded-3xl shadow-2xl transition duration-500 transform hover:scale-[1.02] border-4 border-white"
          />
        </div>
      </div>

      <hr className="my-10 border-gray-200 w-3/4 mx-auto" />

      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
          The Smart Way to Work
        </h2>
        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">
          We connect local talent with local opportunity, instantly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center ">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-orange-200 text-orange-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Instant Connection
            </p>
            <p className="text-gray-700 text-center text-base">
              Find and fill open roles in real-time. No lengthy applications, no
              delays—just **quick tasks** nearby.
            </p>
          </div>

          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-teal-50 to-green-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center ">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-200 text-teal-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Seamless Hiring
            </p>
            <p className="text-gray-700 text-center text-base">
              Business owners can **post a gig in minutes** and receive
              notifications from available, qualified local workers.
            </p>
          </div>

          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-purple-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-200 text-blue-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.279a11.971 11.971 0 00-1.293-1.293c-.75-.75-1.99-.75-2.74-.0L7 10.25l-2.25-2.25-2.25 2.25L7 14.75l7.5 7.5L20 13.5l-4.279-4.279z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Built on Trust
            </p>
            <p className="text-gray-700 text-center text-base">
              Secure payments, verified profiles, and reliable ratings. We are a
              **trusted platform** for fair, local work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
