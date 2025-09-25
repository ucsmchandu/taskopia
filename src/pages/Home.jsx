import React from "react";
import img from "../assests/img.png";

const Home = () => {
  const user = "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-24">
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-lg mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-gray-100">
            Earn Quick,
            <br className="hidden md:block" />
            Short-Term Gigs Near You
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Students and locals can find short-term jobs, and business owners
            can hire instantly — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {user ? (
              <button className="px-6 py-3 cursor-pointer bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl shadow-md hover:from-[#4f46e5] hover:to-[#7c3aed] transition">
                Go to Dashboard
              </button>
            ) : (
              <button className="px-6 py-3 cursor-pointer bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl shadow-md hover:from-[#4f46e5] hover:to-[#7c3aed] transition">
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Hero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 md:px-20 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-100 mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="rounded-2xl shadow-md bg-white/10 backdrop-blur-lg border border-white/20 hover:shadow-xl transition p-8 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Quick Jobs"
            />
            <p className="text-lg font-semibold text-gray-100 mb-2">
              Quick Tasks
            </p>
            <p className="text-gray-300 text-center text-sm">
              Find instant short-term jobs in your local area with just a few
              clicks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl shadow-md bg-white/10 backdrop-blur-lg border border-white/20 hover:shadow-xl transition p-8 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Easy Hiring"
            />
            <p className="text-lg font-semibold text-gray-100 mb-2">
              Easy Hiring
            </p>
            <p className="text-gray-300 text-center text-sm">
              Business owners can quickly hire students and locals for gigs on
              demand.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl shadow-md bg-white/10 backdrop-blur-lg border border-white/20 hover:shadow-xl transition p-8 flex flex-col items-center">
            <img
              src={img}
              className="w-16 h-16 mb-4 object-contain"
              alt="Trusted Platform"
            />
            <p className="text-lg font-semibold text-gray-100 mb-2">
              Trusted Platform
            </p>
            <p className="text-gray-300 text-center text-sm">
              Secure, reliable, and designed for both workers and job providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
