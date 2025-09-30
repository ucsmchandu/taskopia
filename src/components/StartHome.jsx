import React from "react";
import img from "../assests/img.png";
import Button from "../components/styles/button/Button";

const StartHome = () => {
  const user = null;
  return (
    <div className="relative w-full overflow-x-hidden text-white">
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <iframe
            src="https://my.spline.design/aidatamodelinteraction-mdTL3FktFVHgDvFr5TKtnYDV"
            frameBorder="0"
            className="w-full sm:h-full h-[1320px]" 
            allowFullScreen
            title="3D Background"
          ></iframe>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-32 md:mt-10 sm:mt-20 mt-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-7 max-w-xl order-2 md:order-1 pt-10 md:pt-0">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
              style={{ lineHeight: "0.95" }}
            >
              <span className="text-white">Find Quick</span>
              <br />
              <span
                className="inline-block text-teal-400 hover:text-teal-300 transition-all duration-300 cursor-pointer transform hover:scale-105 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  WebkitTextStroke: "3px #fff", 
                  textShadow: "6px 6px 0px rgba(100,255,255,0.4)",
                  letterSpacing: "-3px",
                }}
              >
                Local Gigs Now
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-md">
              Students and locals can find instant short-term jobs, and business
              owners can hire on demand — all on one secure, simple platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {user ? (
                <Button text="Go to Dashboard" />
              ) : (
                <Button text="Sign Up / Login" />
              )}
              <Button text="Post a Job" />
            </div>
          </div>

          <div className="w-full max-w-lg flex justify-center order-1 md:order-2">
            <img
              src={img}
              alt="Short-term Gig Hero Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-[1.02] border-4 border-white"
            />
          </div>
        </div>
      </div>
      <hr className="my-10 border-gray-600 w-3/4 mx-auto" />
    </div>
  );
};

export default StartHome;