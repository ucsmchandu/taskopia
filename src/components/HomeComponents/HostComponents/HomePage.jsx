import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Dot, Check } from "lucide-react";
import Button from "../../styles/button/Button";

export default function HomePage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const char1Ref = useRef(null);
  const char2Ref = useRef(null);
  const char3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set([char1Ref.current, char2Ref.current, char3Ref.current], {
        opacity: 0,
        scale: 0.6,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(char1Ref.current, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.5")
        .to(char2Ref.current, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4")
        .to(char3Ref.current, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-[#FFF5E1] via-[#FFECD1] to-[#FFE0B2] relative overflow-hidden"
    >
      {/* Wavy organic background shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top wave */}
        <path
          d="M0,200 Q360,100 720,150 T1440,200 L1440,0 L0,0 Z"
          fill="#D4A574"
          opacity="0.3"
        />

        {/* Middle wavy sections */}
        <path
          d="M0,350 Q360,280 720,320 T1440,350 L1440,250 Q720,300 0,250 Z"
          fill="#C89968"
          opacity="0.15"
        />

        {/* Bottom organic blob */}
        <ellipse
          cx="200"
          cy="700"
          rx="300"
          ry="150"
          fill="#E8C4A0"
          opacity="0.2"
        />
        <ellipse
          cx="1200"
          cy="650"
          rx="280"
          ry="180"
          fill="#D4A574"
          opacity="0.15"
        />

        {/* Decorative circles */}
        <circle cx="1300" cy="100" r="80" fill="#FF9800" opacity="0.1" />
        <circle cx="150" cy="600" r="120" fill="#FF9800" opacity="0.08" />
      </svg>

      {/* Content */}
      <main className="relative z-10 pt-16 px-6 mt-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-16 lg:mb-20">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-[#2C1810]"
              style={{
                fontFamily: '"Poppins", "Trebuchet MS", sans-serif',
                letterSpacing: "-0.03em",
              }}
            >
              Post Tasks,
              <br />
              <div className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FF6F00] to-[#FF9800] bg-clip-text text-transparent">
                  Get Help Fast
                </span>
                {/* Handwritten underline */}
                <svg
                  className="absolute -bottom-4 left-0 w-full h-8"
                  viewBox="0 0 400 30"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d="M 5 20 Q 100 10 200 18 Q 300 8 395 22"
                    stroke="#FF9800"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </h1>

            <p
              ref={descRef}
              className="text-lg lg:text-xl text-[#5D4037] max-w-2xl mx-auto leading-relaxed"
            >
              Post short-term tasks and find reliable workers near you. No
              hiring, no paperwork. Get your work done today with trusted local
              helpers.
            </p>
          </div>

          {/* Task-Related Illustrations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 lg:mb-16">
            {/* Task 1 - Circle - Post Task */}
            <div
              ref={char1Ref}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-[#FF9800]/20 to-[#FF9800]/40 flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all border-4 border-[#FF9800] overflow-hidden">
                <svg viewBox="0 0 240 280" className="w-56 h-64">
                  {/* Background circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    fill="#FFFFFF"
                    opacity="0.3"
                  />

                  {/* Document/Form */}
                  <rect
                    x="60"
                    y="40"
                    width="120"
                    height="160"
                    rx="8"
                    fill="none"
                    stroke="#FF9800"
                    strokeWidth="3"
                  />

                  {/* Form header */}
                  <rect
                    x="65"
                    y="50"
                    width="110"
                    height="15"
                    rx="3"
                    fill="#FF9800"
                    opacity="0.6"
                  />

                  {/* Form lines */}
                  <line
                    x1="75"
                    y1="75"
                    x2="185"
                    y2="75"
                    stroke="#FF9800"
                    strokeWidth="2"
                  />
                  <line
                    x1="75"
                    y1="90"
                    x2="185"
                    y2="90"
                    stroke="#FF9800"
                    strokeWidth="2"
                  />
                  <line
                    x1="75"
                    y1="105"
                    x2="150"
                    y2="105"
                    stroke="#FF9800"
                    strokeWidth="2"
                  />

                  {/* Checkbox - checked */}
                  <rect
                    x="75"
                    y="130"
                    width="16"
                    height="16"
                    rx="2"
                    fill="none"
                    stroke="#FF9800"
                    strokeWidth="2"
                  />
                  <polyline
                    points="80,140 85,145 95,135"
                    fill="none"
                    stroke="#FF9800"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Task items */}
                  <text
                    x="100"
                    y="148"
                    fontSize="12"
                    fill="#FF9800"
                    fontWeight="bold"
                  >
                    Task Details
                  </text>

                  {/* Pen/pencil */}
                  <g transform="rotate(-45 180 60)">
                    <rect
                      x="175"
                      y="50"
                      width="10"
                      height="40"
                      rx="5"
                      fill="#FF6F00"
                    />
                    <polygon points="175,45 180,35 185,45" fill="#FF6F00" />
                  </g>

                  {/* Decorative elements */}
                  <circle
                    cx="200"
                    cy="200"
                    r="8"
                    fill="#FF9800"
                    opacity="0.4"
                  />
                  <circle cx="60" cy="220" r="6" fill="#FF9800" opacity="0.3" />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-[#2C1810] mb-2">
                Post Tasks Easily
              </h3>
              <p className="text-[#6D4C41] text-base">
                Create short-term tasks in just a few simple steps.
              </p>
            </div>

            {/* Task 2 - Square - Find Helpers */}
            <div
              ref={char2Ref}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-[#FF6F00]/20 to-[#FF6F00]/40 flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all border-4 border-[#FF6F00] overflow-hidden">
                <svg viewBox="0 0 240 280" className="w-56 h-64">
                  {/* Map background */}
                  <rect
                    x="40"
                    y="40"
                    width="160"
                    height="150"
                    rx="8"
                    fill="#FFFFFF"
                    opacity="0.2"
                    stroke="#FF6F00"
                    strokeWidth="3"
                  />

                  {/* Map grid */}
                  <line
                    x1="60"
                    y1="80"
                    x2="200"
                    y2="80"
                    stroke="#FF6F00"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1="60"
                    y1="120"
                    x2="200"
                    y2="120"
                    stroke="#FF6F00"
                    strokeWidth="1"
                    opacity="0.3"
                  />

                  {/* Location pins */}
                  <g>
                    {/* Pin 1 */}
                    <circle cx="80" cy="80" r="4" fill="#FF6F00" />
                    <path d="M 80 84 L 78 95 L 82 95 Z" fill="#FF6F00" />

                    {/* Pin 2 */}
                    <circle cx="150" cy="100" r="4" fill="#FF6F00" />
                    <path d="M 150 104 L 148 115 L 152 115 Z" fill="#FF6F00" />

                    {/* Pin 3 */}
                    <circle cx="110" cy="130" r="4" fill="#FF6F00" />
                    <path d="M 110 134 L 108 145 L 112 145 Z" fill="#FF6F00" />
                  </g>

                  {/* People icons around map */}
                  <g>
                    {/* Person 1 */}
                    <circle cx="70" cy="170" r="6" fill="#FF6F00" />
                    <path
                      d="M 65 180 L 65 190 M 70 185 L 70 195 M 75 180 L 75 190"
                      stroke="#FF6F00"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Person 2 */}
                    <circle cx="120" cy="170" r="6" fill="#FF6F00" />
                    <path
                      d="M 115 180 L 115 190 M 120 185 L 120 195 M 125 180 L 125 190"
                      stroke="#FF6F00"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Person 3 */}
                    <circle cx="170" cy="170" r="6" fill="#FF6F00" />
                    <path
                      d="M 165 180 L 165 190 M 170 185 L 170 195 M 175 180 L 175 190"
                      stroke="#FF6F00"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Connection lines */}
                  <line
                    x1="80"
                    y1="84"
                    x2="70"
                    y2="164"
                    stroke="#FF6F00"
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="150"
                    y1="104"
                    x2="170"
                    y2="164"
                    stroke="#FF6F00"
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeDasharray="3,3"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-[#2C1810] mb-2">
                Find Local Helpers
              </h3>
              <p className="text-[#6D4C41] text-base">
                Connect with verified people ready to help near you.
              </p>
            </div>

            {/* Task 3 - Hexagon/Rounded Rectangle - Instant Payment */}
            <div
              ref={char3Ref}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-[#E65100]/20 to-[#E65100]/40 flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all border-4 border-[#E65100] overflow-hidden">
                <svg viewBox="0 0 240 280" className="w-56 h-64">
                  {/* Wallet/Payment background */}
                  <rect
                    x="45"
                    y="60"
                    width="150"
                    height="110"
                    rx="12"
                    fill="#FFFFFF"
                    opacity="0.2"
                    stroke="#E65100"
                    strokeWidth="2.5"
                  />

                  {/* Wallet flap */}
                  <rect
                    x="50"
                    y="55"
                    width="140"
                    height="35"
                    rx="8"
                    fill="#E65100"
                    opacity="0.6"
                  />

                  {/* Money bills stacked */}
                  <g>
                    {/* Bill 1 - Bottom */}
                    <rect
                      x="70"
                      y="110"
                      width="100"
                      height="40"
                      rx="4"
                      fill="#4CAF50"
                    />
                    <text
                      x="85"
                      y="137"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#FFFFFF"
                    >
                      ₹500
                    </text>

                    {/* Bill 2 - Middle */}
                    <rect
                      x="75"
                      y="100"
                      width="100"
                      height="40"
                      rx="4"
                      fill="#8BC34A"
                    />
                    <text
                      x="90"
                      y="127"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#FFFFFF"
                    >
                      ₹500
                    </text>

                    {/* Bill 3 - Top */}
                    <rect
                      x="80"
                      y="90"
                      width="100"
                      height="40"
                      rx="4"
                      fill="#CDDC39"
                    />
                    <text
                      x="95"
                      y="117"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#2C1810"
                    >
                      ₹500
                    </text>
                  </g>

                  {/* Check mark - verified */}
                  <circle cx="165" cy="75" r="16" fill="#4ECB71" />
                  <polyline
                    points="158,73 162,77 172,67"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Payment icons below */}
                  <g>
                    {/* Credit card */}
                    <rect
                      x="55"
                      y="175"
                      width="35"
                      height="22"
                      rx="2"
                      fill="none"
                      stroke="#E65100"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="60"
                      y1="182"
                      x2="85"
                      y2="182"
                      stroke="#E65100"
                      strokeWidth="1"
                    />

                    {/* Mobile payment */}
                    <rect
                      x="100"
                      y="175"
                      width="25"
                      height="40"
                      rx="2"
                      fill="none"
                      stroke="#E65100"
                      strokeWidth="1.5"
                    />
                    <circle cx="112" cy="210" r="3" fill="#E65100" />

                    {/* Rupee coin */}
                    <circle
                      cx="150"
                      cy="195"
                      r="12"
                      fill="none"
                      stroke="#E65100"
                      strokeWidth="1.5"
                    />
                    <text
                      x="146"
                      y="200"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#E65100"
                    >
                      ₹
                    </text>
                  </g>

                  {/* Speed lines - fast payment */}
                  <line
                    x1="35"
                    y1="100"
                    x2="50"
                    y2="100"
                    stroke="#E65100"
                    strokeWidth="1.5"
                    opacity="0.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="30"
                    y1="115"
                    x2="48"
                    y2="115"
                    stroke="#E65100"
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-[#2C1810] mb-2">
                Instant Payments
              </h3>
              <p className="text-[#6D4C41] text-base">
                Get paid fast for completed tasks. No waiting, no hassle.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <Link to="/post/job">
              <Button text={"Post Task"} />
            </Link>
            <p className="text-[#6D4C41] font-semibold mt-6">
              No contracts • Verified workers • Pay only after work is done
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
