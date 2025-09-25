import React from "react";
import img from "../assests/img.png";

const Home = () => {
  const user = "";
  return (
    <div className="mt-10 min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 md:py-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-lg mt-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-800">
            Earn Quick,
            <br className="hidden md:block" />
            Short-Term Gigs Near You
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Students and locals can find short-term jobs, and business owners
            can hire instantly — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {user ? (
              <>
                {" "}
                <button className="px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
                  Go to Dashboard
                </button>
              </>
            ) : (
              <button className="px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
                Login / Signup
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-0 w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Hero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>

      <div className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className=" rounded-2xl shadow-md bg-white hover:shadow-xl transition p-6 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Quick Jobs"
            />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Quick Tasks
            </p>
            <p className="text-gray-500 text-center text-sm">
              Find instant short-term jobs in your local area with just a few
              clicks.
            </p>
          </div>

          <div className=" rounded-2xl shadow-md bg-white hover:shadow-xl transition p-6 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Easy Hiring"
            />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Easy Hiring
            </p>
            <p className="text-gray-500 text-center text-sm">
              Business owners can quickly hire students and locals for gigs on
              demand.
            </p>
          </div>

          <div className=" rounded-2xl shadow-md bg-white hover:shadow-xl transition p-6 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Trusted Platform"
            />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Trusted Platform
            </p>
            <p className="text-gray-500 text-center text-sm">
              Secure, reliable, and designed for both workers and job providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
