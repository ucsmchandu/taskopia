import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../styles/button/Button";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

export default function StartHome({ user }) {
  // console.log(user)
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const ctaRef = useRef(null);
  const navRef = useRef(null);
  const illustrationRef = useRef(null);
  const statsRef = useRef(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { opacity: 0, y: -20 });
      gsap.set([headlineRef.current, subheadRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(illustrationRef.current, { opacity: 0, x: 50 });
      gsap.set(statsRef.current, { opacity: 0, y: 20 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(navRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(illustrationRef.current, { opacity: 1, x: 0, duration: 1 }, "-=0.8")
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-[#F8F6F3] flex flex-col relative overflow-hidden"
    >
      {/* dotted background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(45,49,66,0.10) 1px, transparent 3px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* SUBTLE TEXTURE (EXISTING) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* HERO */}
      <main className="relative mt-20 z-20 flex-1 px-6 lg:px-20 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center max-w-[1600px] mx-auto">
          <div className="space-y-10 order-first lg:order-last">
            {/* MAIN HERO TEXT — HANDWRITTEN STYLE */}
            {/* only visible when less than large screens */}
            <div
              ref={headlineRef}
              className="relative lg:hidden flex justify-center"
            >
              <h1 className="leading-[1.1]">
                <div className="flex flex-col items-center lg:items-start">
                  {/* Line 1: Earn */}
                  <div className="relative inline-block mb-6">
                    <span
                      className="block text-[6rem] sm:text-[8rem] lg:text-[13rem] xl:text-[15rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily:
                          '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      Earn
                    </span>
                    {/* Handwritten underline for Earn */}
                    <svg
                      className="absolute -bottom-4 left-0 w-full h-8"
                      viewBox="0 0 400 30"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <path
                        d="M 5 15 Q 100 8 200 18 Q 300 12 395 20"
                        stroke="#E8A75C"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Line 2: with */}
                  <div className="mb-6">
                    <span
                      className="block text-[4rem] sm:text-[5rem] lg:text-[8rem] xl:text-[9rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily:
                          '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      with
                    </span>
                  </div>

                  {/* Line 3: Purpose */}
                  <div className="relative inline-block mb-8">
                    <span
                      className="block text-[6rem] sm:text-[8rem] lg:text-[13rem] xl:text-[15rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily:
                          '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      Purpose
                    </span>
                    {/* Handwritten underline for Purpose */}
                    <svg
                      className="absolute -bottom-4 left-0 w-full h-8"
                      viewBox="0 0 500 30"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <path
                        d="M 5 18 Q 125 10 250 20 Q 375 8 495 16"
                        stroke="#5B8C9E"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="flex flex-wrap gap-3 items-center text-lg sm:text-xl lg:text-2xl font-medium text-[#2D3142]/70 mt-10">
                  <span>Short tasks</span>
                  <span><Dot/></span>
                  <span>Real money</span>
                  <span><Dot/></span>
                  <span>No contracts</span>
                </div>
                <div className="mt-8 flex flex-row flex-wrap gap-4 justify-center">
                    <Link to="/ally/dashboard">
                       <Button text={"Dashboard"} />
                    </Link>
                    <Link to="/job/listings">
                      <Button text={"Apply Task"} />
                    </Link>
                  </div>
              </h1>
            </div>

            {/* MAIN HERO TEXT — HANDWRITTEN STYLE (LG SCREENS) */}
            <div ref={headlineRef} className="relative hidden lg:flex">
              <h1 className="leading-[1.1]">
                <div className="flex flex-col items-center lg:items-start">
                  {/* Line 1: Earn */}
                  <div className="relative inline-block mb-6">
                    <span
                      className="block text-[8rem] sm:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily: '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      Earn
                    </span>
                    {/* Handwritten underline for Earn */}
                    <svg
                      className="absolute -bottom-4 left-0 w-full h-8"
                      viewBox="0 0 400 30"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <path
                        d="M 5 15 Q 100 8 200 18 Q 300 12 395 20"
                        stroke="#E8A75C"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Line 2: with */}
                  <div className="mb-6">
                    <span
                      className="block text-[5rem] sm:text-[6rem] lg:text-[8rem] xl:text-[9rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily: '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      with
                    </span>
                  </div>

                  {/* Line 3: Purpose */}
                  <div className="relative inline-block mb-8">
                    <span
                      className="block text-[8rem] sm:text-[10rem] lg:text-[13rem] xl:text-[15rem] font-light text-[#2D3142]"
                      style={{
                        fontFamily: '"Brush Script MT", cursive, Georgia, serif',
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        lineHeight: 0.9,
                      }}
                    >
                      Purpose
                    </span>
                    {/* Handwritten underline for Purpose */}
                    <svg
                      className="absolute -bottom-4 left-0 w-full h-8"
                      viewBox="0 0 500 30"
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      <path
                        d="M 5 18 Q 125 10 250 20 Q 375 8 495 16"
                        stroke="#5B8C9E"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="flex flex-wrap gap-3 items-center text-xl sm:text-2xl lg:text-2xl font-medium text-[#2D3142]/70 mt-10">
                  <span>Short tasks</span>
                  <span><Dot/></span>
                  <span>Real money</span>
                  <span><Dot/></span>
                  <span>No contracts</span>
                </div>
              </h1>
            </div>

            <div ref={subheadRef}>
              <p className="text-lg sm:text-xl text-[#2D3142]/70 max-w-xl leading-relaxed">
                Choose tasks that fit your life.
                <span className="text-[#2D3142] font-semibold">
                  {" "}
                  Work freely. Get paid fast.
                </span>
              </p>
            </div>

            <div ref={ctaRef} className="space-y-5 flex justify-center">
              <div className="flex flex-wrap gap-5 text-sm text-[#2D3142]/60 font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8A75C]"></span>
                  Free to join
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B8C9E]"></span>
                  Flexible work
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D3142]"></span>
                  Instant payouts
                </span>
              </div>
            </div>
          </div>

          {/* ILLUSTRATION SECTION - RESPONSIVE */}
          <div
            ref={illustrationRef}
            className="relative w-full flex items-center justify-center order-last lg:order-first"
          >
            {/* Container for illustration elements */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex items-center justify-center">
              {/* Decorative star - top left */}
              <svg
                className="absolute top-0 left-2 sm:left-4 w-6 sm:w-10 h-6 sm:h-10 text-[#E8A75C] z-20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>

              {/* Decorative star - bottom center right */}
              <svg
                className="absolute bottom-12 right-8 sm:right-16 w-5 sm:w-8 h-5 sm:h-8 text-[#5B8C9E] z-20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>

              {/* Decorative dots - bottom left */}
              <div className="absolute bottom-8 left-6 sm:left-12 flex gap-2 z-20">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E8A75C]"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#5B8C9E]"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#2D3142]"></div>
              </div>

              {/* LEFT TASK - Shopping Bag */}
              <div className="absolute left-0 sm:left-8 top-1/2 transform -translate-y-1/2 z-10">
                <div className="relative w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 flex items-center justify-center">
                  {/* Circular background - yellow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFC700] shadow-lg"></div>

                  {/* Shopping Bag Icon */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-28 sm:w-36 lg:w-44 h-28 sm:h-36 lg:h-44 relative z-10"
                  >
                    {/* Handle */}
                    <path
                      d="M 50 60 Q 50 30 80 30 Q 110 30 110 60"
                      stroke="#2D3142"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Bag body */}
                    <rect x="40" y="60" width="80" height="70" rx="8" fill="#E8A75C" stroke="#2D3142" strokeWidth="2" />

                    {/* Bag inner shadow */}
                    <rect x="45" y="65" width="70" height="60" rx="6" fill="#F5B876" opacity="0.6" />

                    {/* Items inside - circles representing products */}
                    <circle cx="65" cy="85" r="8" fill="#FF6B6B" />
                    <circle cx="95" cy="85" r="8" fill="#4ECDC4" />
                    <circle cx="80" cy="105" r="8" fill="#95E1D3" />
                    <circle cx="60" cy="115" r="8" fill="#FFE66D" />
                    <circle cx="100" cy="115" r="8" fill="#C7CEEA" />

                    {/* Shine effect */}
                    <ellipse cx="60" cy="75" rx="12" ry="6" fill="#FFFFFF" opacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* CENTER TASK - Delivery Box with Checkmark */}
              <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-40 sm:w-48 lg:w-56 h-40 sm:h-48 lg:h-56 flex items-center justify-center">
                  {/* Circular background - blue */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#5B8C9E] shadow-lg"></div>

                  {/* Delivery Box Icon */}
                  <svg
                    viewBox="0 0 180 180"
                    className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 relative z-10"
                  >
                    {/* Main box */}
                    <rect x="40" y="55" width="100" height="75" rx="6" fill="#2D3142" stroke="#2D3142" strokeWidth="2" />

                    {/* Box top panel (open) */}
                    <path
                      d="M 40 55 L 30 35 L 150 35 L 160 55"
                      fill="#3D4152"
                      stroke="#2D3142"
                      strokeWidth="2"
                    />

                    {/* Tape on box */}
                    <rect x="85" y="50" width="10" height="70" fill="#E8A75C" opacity="0.8" />

                    {/* Large checkmark inside box */}
                    <path
                      d="M 60 90 L 80 105 L 120 70"
                      stroke="#4ECB71"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Side flaps */}
                    <path
                      d="M 40 55 L 35 70"
                      stroke="#2D3142"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 140 55 L 145 70"
                      stroke="#2D3142"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              {/* RIGHT TASK - Clipboard with Checklist */}
              <div className="absolute right-0 sm:right-8 top-1/2 transform -translate-y-1/2 z-10">
                <div className="relative w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 flex items-center justify-center">
                  {/* Circular background - pink/magenta */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E6A8D7] to-[#D68FBF] shadow-lg"></div>

                  {/* Clipboard Icon */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-28 sm:w-36 lg:w-44 h-28 sm:h-36 lg:h-44 relative z-10"
                  >
                    {/* Clip at top */}
                    <rect x="65" y="20" width="30" height="15" rx="4" fill="#2D3142" stroke="#2D3142" strokeWidth="1" />
                    <circle cx="72" cy="32" r="3" fill="#FFFFFF" />
                    <circle cx="88" cy="32" r="3" fill="#FFFFFF" />

                    {/* Clipboard body */}
                    <rect x="35" y="35" width="90" height="100" rx="6" fill="#F5E6D3" stroke="#2D3142" strokeWidth="2" />

                    {/* Inner content area */}
                    <rect x="45" y="50" width="70" height="75" fill="#FFFFFF" rx="4" />

                    {/* Checklist items */}
                    {/* Item 1 */}
                    <rect x="55" y="62" width="5" height="5" rx="1" stroke="#2D3142" strokeWidth="1.5" fill="none" />
                    <path
                      d="M 56 64 L 58 66 L 62 62"
                      stroke="#4ECB71"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="68" y1="65" x2="90" y2="65" stroke="#2D3142" strokeWidth="1" />

                    {/* Item 2 */}
                    <rect x="55" y="80" width="5" height="5" rx="1" stroke="#2D3142" strokeWidth="1.5" fill="none" />
                    <path
                      d="M 56 82 L 58 84 L 62 80"
                      stroke="#4ECB71"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="68" y1="83" x2="90" y2="83" stroke="#2D3142" strokeWidth="1" />

                    {/* Item 3 */}
                    <rect x="55" y="98" width="5" height="5" rx="1" stroke="#2D3142" strokeWidth="1.5" fill="none" />
                    <line x1="68" y1="101" x2="90" y2="101" stroke="#2D3142" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Pen on the side */}
                    <line x1="120" y1="50" x2="130" y2="110" stroke="#E8A75C" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="130" cy="112" r="2" fill="#E8A75C" />
                  </svg>
                </div>
              </div>

              {/* Handwritten text element - "all" */}
              <div className="absolute top-20 right-4 sm:right-8 lg:right-12 z-30">
                <svg
                  viewBox="0 0 100 50"
                  className="w-16 sm:w-20 lg:w-24 h-10 sm:h-12 lg:h-14"
                >
                  <path
                    d="M 5 35 Q 20 15 40 30 Q 60 45 95 20"
                    stroke="#5B8C9E"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Apply Task Button */}
              <div className="absolute bottom-8 lg:flex hidden left-1/2 transform -translate-x-1/2 z-30">
                <Link to="/job/listings">
                  <Button text={"Apply Task"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}