import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Button from "../../styles/button/Button";

/**
 * Loads Plus Jakarta Sans and Playfair Display Google fonts for an elegant, warm, and sophisticated palette.
 */
function useFonts() {
  useEffect(() => {
    const id = "gf-playfair-jakarta";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const displayFont = '"Playfair Display", serif';
const bodyFont = '"Plus Jakarta Sans", sans-serif';

// Warm, sophisticated, earthy terracotta and cream palette
const COLORS = {
  bg: "#FBF9F5",         // Warm, creamy off-white background
  paper: "#FFFFFF",      // Clean white paper card
  ink: "#2C221E",        // Deep warm espresso/charcoal
  terracotta: "#C86D51", // Warm, welcoming terracotta accent
  sand: "#E6D5C3",       // Soft sandy beige accent
  clay: "#A3523B",       // Rich deeper clay tone
  cardShadow: "rgba(44, 34, 30, 0.05)",
  border: "#EADCCF",     // Warm subtle border
};

function Pushpin({ color }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-xl" style={{ filter: "drop-shadow(0 3px 3px rgba(44,34,30,0.15))" }}>
      <circle cx="12" cy="9" r="7" fill={color} stroke={COLORS.ink} strokeWidth="1.2" />
      <circle cx="9.5" cy="6.5" r="2" fill="#FFFFFF" opacity="0.45" />
      <path d="M12 16 L12 23" stroke={COLORS.ink} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function NoticeCard({ cardRef, rotate, tapeColor, pinColor, accentColor, title, description, svgContent }) {
  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center p-7 pt-12 rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: COLORS.paper,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 10px 30px -10px ${COLORS.cardShadow}`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* Semi-transparent Washi Tape */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 rounded-sm opacity-85 backdrop-blur-[1px]"
        style={{
          backgroundColor: tapeColor,
          transform: "rotate(-1.5deg)",
          boxShadow: "0 2px 5px rgba(44,34,30,0.08)",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3), rgba(0,0,0,0.03))",
        }}
      />
      
      {/* Realistic Pushpin */}
      <div className="absolute -top-4 right-7 z-20">
        <Pushpin color={pinColor} />
      </div>

      <div
        className="w-44 h-44 mb-6 flex items-center justify-center rounded-2xl transition-colors duration-300"
        style={{ backgroundColor: "#F7F4EE", border: `1.5px dashed ${COLORS.border}` }}
      >
        <svg viewBox="0 0 240 280" className="w-36 h-40" fontFamily={bodyFont}>
          {svgContent}
        </svg>
      </div>

      <h3
        className="text-xl mb-3 font-semibold tracking-wide"
        style={{ fontFamily: displayFont, color: COLORS.ink }}
      >
        {title}
      </h3>
      
      <p className="text-base leading-relaxed font-normal" style={{ fontFamily: bodyFont, color: "#7A6B63" }}>
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  useFonts();

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const char1Ref = useRef(null);
  const char2Ref = useRef(null);
  const char3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 35 });
      gsap.set([char1Ref.current, char2Ref.current, char3Ref.current], {
        opacity: 0,
        scale: 0.85,
        y: 20,
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(char1Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(char2Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(char3Ref.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, "-=0.45");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Warm, minimalist subtle dot/grid pattern */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.border} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.border} 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />

      <main className="relative z-10 pt-24 px-6 mt-4 lg:px-20 pb-32">
        <div className="max-w-6xl mx-auto">
          
          {/* Header section */}
          <div className="text-center mb-24 lg:mb-28">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl leading-tight mb-8 font-bold tracking-tight"
              style={{ fontFamily: displayFont, color: COLORS.ink, letterSpacing: "-0.02em" }}
            >
              Post Tasks,
              <br />
              <span className="relative inline-block text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.terracotta}, ${COLORS.clay})` }}>
                Get Help Fast
                <svg
                  className="absolute -bottom-4 left-0 w-full h-8"
                  viewBox="0 0 400 30"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d="M 5 22 Q 100 6 200 18 Q 300 4 395 24"
                    stroke={COLORS.sand}
                    strokeWidth="5.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              ref={descRef}
              className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
              style={{ fontFamily: bodyFont, color: "#7A6B63" }}
            >
              Post short-term tasks and find reliable workers near you. No
              hiring friction, no heavy paperwork. Get your work done today with trusted
              local helpers.
            </p>
          </div>

          {/* Notice board cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-20 mb-20 lg:mb-24 px-2">
            <NoticeCard
              cardRef={char1Ref}
              rotate={-2.5}
              tapeColor={COLORS.sand}
              pinColor={COLORS.terracotta}
              accentColor={COLORS.terracotta}
              title="Post Tasks Easily"
              description="Create short-term community tasks in just a few straightforward steps."
              svgContent={
                <>
                  <rect x="60" y="40" width="120" height="160" rx="8" fill="none" stroke={COLORS.terracotta} strokeWidth="3" />
                  <rect x="65" y="50" width="110" height="15" rx="3" fill={COLORS.terracotta} opacity="0.6" />
                  <line x1="75" y1="75" x2="185" y2="75" stroke={COLORS.terracotta} strokeWidth="2" />
                  <line x1="75" y1="90" x2="185" y2="90" stroke={COLORS.terracotta} strokeWidth="2" />
                  <line x1="75" y1="105" x2="150" y2="105" stroke={COLORS.terracotta} strokeWidth="2" />
                  <rect x="75" y="130" width="16" height="16" rx="2" fill="none" stroke={COLORS.terracotta} strokeWidth="2" />
                  <polyline points="80,140 85,145 95,135" fill="none" stroke={COLORS.terracotta} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="100" y="148" fontSize="12" fill={COLORS.terracotta} fontWeight="normal">Task Details</text>
                  <g transform="rotate(-45 180 60)">
                    <rect x="175" y="50" width="10" height="40" rx="5" fill={COLORS.ink} />
                    <polygon points="175,45 180,35 185,45" fill={COLORS.ink} />
                  </g>
                  <circle cx="200" cy="200" r="8" fill={COLORS.sand} opacity="0.6" />
                  <circle cx="60" cy="220" r="6" fill={COLORS.sand} opacity="0.5" />
                </>
              }
            />

            <NoticeCard
              cardRef={char2Ref}
              rotate={1.8}
              tapeColor={COLORS.terracotta}
              pinColor={COLORS.sand}
              accentColor={COLORS.clay}
              title="Find Local Helpers"
              description="Connect smoothly with verified people ready to pitch in right around you."
              svgContent={
                <>
                  <rect x="40" y="40" width="160" height="150" rx="8" fill="none" stroke={COLORS.clay} strokeWidth="3" />
                  <line x1="60" y1="80" x2="200" y2="80" stroke={COLORS.clay} strokeWidth="1" opacity="0.4" />
                  <line x1="60" y1="120" x2="200" y2="120" stroke={COLORS.clay} strokeWidth="1" opacity="0.4" />
                  <circle cx="80" cy="80" r="4" fill={COLORS.clay} />
                  <path d="M 80 84 L 78 95 L 82 95 Z" fill={COLORS.clay} />
                  <circle cx="150" cy="100" r="4" fill={COLORS.clay} />
                  <path d="M 150 104 L 148 115 L 152 115 Z" fill={COLORS.clay} />
                  <circle cx="110" cy="130" r="4" fill={COLORS.clay} />
                  <path d="M 110 134 L 108 145 L 112 145 Z" fill={COLORS.clay} />
                  <circle cx="70" cy="170" r="6" fill={COLORS.clay} />
                  <path d="M 65 180 L 65 190 M 70 185 L 70 195 M 75 180 L 75 190" stroke={COLORS.clay} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="120" cy="170" r="6" fill={COLORS.clay} />
                  <path d="M 115 180 L 115 190 M 120 185 L 120 195 M 125 180 L 125 190" stroke={COLORS.clay} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="170" cy="170" r="6" fill={COLORS.clay} />
                  <path d="M 165 180 L 165 190 M 170 185 L 170 195 M 175 180 L 175 190" stroke={COLORS.clay} strokeWidth="2" strokeLinecap="round" />
                  <line x1="80" y1="84" x2="70" y2="164" stroke={COLORS.clay} strokeWidth="1.5" opacity="0.5" strokeDasharray="3,3" />
                  <line x1="150" y1="104" x2="170" y2="164" stroke={COLORS.clay} strokeWidth="1.5" opacity="0.5" strokeDasharray="3,3" />
                </>
              }
            />

            <NoticeCard
              cardRef={char3Ref}
              rotate={-1.2}
              tapeColor={COLORS.clay}
              pinColor={COLORS.terracotta}
              accentColor={COLORS.sand}
              title="Instant Payments"
              description="Get compensated fast upon completed work. Zero hassle, total transparency."
              svgContent={
                <>
                  <rect x="45" y="60" width="150" height="110" rx="10" fill="none" stroke={COLORS.terracotta} strokeWidth="3" />
                  <rect x="50" y="55" width="140" height="35" rx="6" fill={COLORS.terracotta} opacity="0.7" />
                  <rect x="70" y="110" width="100" height="40" rx="4" fill={COLORS.terracotta} />
                  <text x="85" y="137" fontSize="10" fontWeight="normal" fill="#FBF9F5">₹500</text>
                  <rect x="75" y="100" width="100" height="40" rx="4" fill={COLORS.clay} />
                  <text x="90" y="127" fontSize="10" fontWeight="normal" fill="#FBF9F5">₹500</text>
                  <rect x="80" y="90" width="100" height="40" rx="4" fill={COLORS.sand} />
                  <text x="95" y="117" fontSize="10" fontWeight="normal" fill={COLORS.ink}>₹500</text>
                  <circle cx="165" cy="75" r="16" fill={COLORS.ink} />
                  <polyline points="158,73 162,77 172,67" fill="none" stroke={COLORS.paper} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="55" y="175" width="35" height="22" rx="2" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <line x1="60" y1="182" x2="85" y2="182" stroke={COLORS.ink} strokeWidth="1" />
                  <rect x="100" y="175" width="25" height="40" rx="2" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <circle cx="112" cy="210" r="3" fill={COLORS.ink} />
                  <circle cx="150" cy="195" r="12" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <text x="146" y="200" fontSize="12" fontWeight="normal" fill={COLORS.ink}>₹</text>
                </>
              }
            />
          </div>

          {/* Call to action container */}
          <div className="text-center pt-4">
            <div className="inline-block transition-transform duration-300 hover:rotate-0 hover:scale-105" style={{ transform: "rotate(-1.5deg)" }}>
              <div
                className="p-1.5 shadow-sm bg-white"
                style={{ border: `2px solid ${COLORS.terracotta}`, borderRadius: "10px" }}
              >
                <Link to="/post/job">
                  <Button text="Post Task" />
                </Link>
              </div>
            </div>
            
            <p
              className="font-normal mt-8 uppercase text-xs sm:text-sm tracking-widest"
              style={{ fontFamily: bodyFont, color: "#7A6B63" }}
            >
              No contracts &nbsp;·&nbsp; Verified workers &nbsp;·&nbsp; Pay only after work is done
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}