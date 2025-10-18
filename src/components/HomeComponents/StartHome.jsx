import React from "react";
import Button from "../styles/button/Button";
import LightRays from "../../animations/LightRays";
import BlurText from "../../animations/BlurText";
const StartHome = () => {
  const user = null; // Replace with actual auth logic if needed

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white overflow-hidden">
      {/* Background Light Rays */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none select-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#E6E6FA"
          raysSpeed={3}
          lightSpread={20}
          rayLength={25}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0.1}
          distortion={0.001}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex items-center justify-center text-center min-h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center space-y-7 max-w-2xl">
          {/* Heading */}
          <h1
            className="font-extrabold tracking-tight leading-[1.1] text-center"
            style={{ lineHeight: "1.1" }}
          >
            <span
              className="block text-[#FFE100] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
            >
              Find Quick
            </span>
            <div className="text-4xl sm:text-7xl md:text-7xl lg:text-7xl" >
              <BlurText
                text="Local Gigs Now"
                delay={300}
                animateBy="words"
                direction="top"
                className="mb-8"
              />
            </div>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md italic">
            Students and locals can find instant short-term jobs, and business
            owners can hire on demand all on one secure, simple platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
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
    </div>
  );
};

export default StartHome;
