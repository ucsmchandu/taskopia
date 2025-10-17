import React from "react";
import Button from "../components/styles/button/Button";
import LightRays from "../background/LightRays";

const StartHome = () => {
  const user = null; // Replace with actual auth logic if needed

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Light Rays */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none select-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#E6E6FA"
          raysSpeed={2}
          lightSpread={2}
          rayLength={20}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex items-center justify-center text-center min-h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center space-y-7 max-w-2xl">
          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
            style={{ lineHeight: "0.95" }}
          >
            <span className="text-white">Find Quick</span>
            <br />
            <span
              className="inline-block text-teal-400 hover:text-teal-300 transition-all duration-300 cursor-pointer transform hover:scale-105 text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:w-[2000px]"
              style={{
                WebkitTextStroke: "3px #fff",
                textShadow: "6px 6px 0px rgba(100,255,255,0.4)",
                letterSpacing: "-3px",
              }}
            >
              Local Gigs Now
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md">
            Students and locals can find instant short-term jobs, and business
            owners can hire on demand — all on one secure, simple platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {user ? (
              <Button text="Go to Dashboard" />
            ) : (
              <Button text="Sign Up / Login" />
            )}
            <Button text="Post a Job" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-gray-600 w-3/4 mx-auto z-10 relative" />
    </div>
  );
};

export default StartHome;
