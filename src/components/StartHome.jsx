import React from "react";
import Button from "../components/styles/button/Button";
import LightRays from "../animations/LightRays";
import BlurText from "../animations/BlurText;";
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
            className="font-extrabold tracking-tight leading-[1.1] text-center"
            style={{ lineHeight: "1.1" }}
          >
            <span
              className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
            >
              Find Quick
            </span>
            <div
              className="mt-6 text-center cursor-pointer text-transparent bg-clip-text
    bg-gradient-to-r from-[#cfd9ff] via-[#aab4ff] to-[#8c9eff] lg:w-[750px]
    text-5xl sm:text-6xl md:text-7xl lg:text-8xl
    transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110"
              style={{
                WebkitTextStroke: "0.8px #000",
                textShadow: `
      0 0 8px rgba(173, 216, 255, 0.5),
      0 0 15px rgba(138, 180, 255, 0.6),
      0 0 25px rgba(100, 149, 237, 0.7)
    `,
                letterSpacing: "-1.2px",
              }}
            >
              <BlurText
                text="Local Gigs Now"
                delay={200}
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
      <hr className="my-10 border-gray-600 w-3/4 mx-auto z-10 relative" />
    </div>
  );
};

export default StartHome;
