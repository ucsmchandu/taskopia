import React, { useEffect, useState } from "react";
import Button from "../styles/button/Button";
import FloatingLines from "../../animations/HomeBackground";
import BlurText from "../../animations/BlurText";
import { Link } from "react-router-dom";
const StartHome = ({ user, isLoading }) => {
  return (
    <div className="scroll-smooth relative w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white overflow-hidden">
      {/* Background Light Rays */}
      <div className="absolute top-0 left-0 h-screen w-screen ">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[8, 4, 6]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[280, 50, 280]}
          bendRadius={1.0}
          bendStrength={-0.3}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 pointer-events-none flex items-center justify-center text-center min-h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center space-y-7 max-w-2xl">
          {/* Heading */}
          <h1
            className="font-extrabold tracking-tight leading-[1.1] text-center"
            style={{ lineHeight: "1.1" }}
          >
            <span
              className="block text-[#FFE31A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
            >
              Find Quick
            </span>
            <div className=" text-[#D9EAFD] font-extrabold text-4xl sm:text-7xl md:text-7xl lg:text-7xl">
              <BlurText
                text="Local Gigs Now"
                delay={120}
                animateBy="letters"
                direction="top"
                className="mb-8"
              />
            </div>
          </h1>

          {/* Description */}
          <p className=" lg:w-2xl sm:text-lg md:text-xl text-white italic">
            Students and locals can find instant short-term jobs, and business
            owners can hire on demand all on one secure, simple platform.
          </p>

          {/* Buttons */}
          <div className="relative pointer-events-auto mt-10">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                  <span className="text-sm font-medium">Loading...</span>
                </div>
              </div>
            )}

            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {!user && (
                <Link to="/login">
                  <Button text="Sign Up / Login" />
                </Link>
              )}

              {user && user.userType === "worker" && (
                <>
                  <Link to="/worker/dashboard">
                    <Button text="Go to Dashboard" />
                  </Link>
                  <Link to="/job/listings">
                    <Button text="Apply a Job" />
                  </Link>
                </>
              )}

              {user && user.userType === "owner" && (
                <>
                  <Link to="/owner/dashboard">
                    <Button text="Go to Dashboard" />
                  </Link>
                  <Link to="/post/job">
                    <Button text="Post a Job" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
    </div>
  );
};

export default StartHome;
