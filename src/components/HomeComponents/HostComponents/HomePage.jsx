import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Button from "../../styles/button/Button";

/**
 * Loads the two display/body fonts once, on mount, so the typography
 * renders identically across every browser/OS (no reliance on system fonts).
 */
function useFonts() {
  useEffect(() => {
    const id = "gf-anton-worksans";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const displayFont = '"Anton", "Arial Narrow", sans-serif';
const bodyFont = '"Work Sans", Arial, sans-serif';

const COLORS = {
  paper: "#FFF8EC",
  paperDark: "#FCE7B8",
  ink: "#4A2F1C",
  rust: "#E8502B",
  mustard: "#F4B400",
  clay: "#F2903D",
};

function Pushpin({ color }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-md" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))" }}>
      <circle cx="12" cy="9" r="7" fill={color} stroke={COLORS.ink} strokeWidth="1" />
      <circle cx="9.5" cy="6.5" r="2" fill="#FFFFFF" opacity="0.35" />
      <path d="M12 15 L12 22" stroke={COLORS.ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NoticeCard({ cardRef, rotate, tapeColor, pinColor, accentColor, title, description, svgContent }) {
  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center p-6 pt-10 rounded-2xl"
      style={{
        backgroundColor: COLORS.paper,
        border: `2.5px solid ${accentColor}`,
        boxShadow: `6px 6px 0px ${accentColor}33`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* Tape strip */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-sm opacity-90"
        style={{
          backgroundColor: tapeColor,
          transform: "rotate(-2deg)",
          boxShadow: "0 2px 4px rgba(74,47,28,0.25)",
        }}
      />
      {/* Pushpin */}
      <div className="absolute -top-4 right-6">
        <Pushpin color={pinColor} />
      </div>

      <div
        className="w-40 h-40 mb-5 flex items-center justify-center rounded-xl"
        style={{ backgroundColor: COLORS.paperDark, border: `2px dashed ${accentColor}` }}
      >
        <svg viewBox="0 0 240 280" className="w-32 h-36" fontFamily={bodyFont}>
          {svgContent}
        </svg>
      </div>

      <h3
        className="text-2xl mb-2 uppercase tracking-wide"
        style={{ fontFamily: displayFont, color: COLORS.ink }}
      >
        {title}
      </h3>
      <p className="text-base" style={{ fontFamily: bodyFont, color: "#5A4A3A" }}>
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
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 30 });
      gsap.set([char1Ref.current, char2Ref.current, char3Ref.current], {
        opacity: 0,
        scale: 0.6,
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 })
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
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: COLORS.paperDark }}
    >
      {/* Cork-board texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(43,33,25,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* Soft warm frame — a thin rust line instead of a heavy black border */}
      <div
        className="absolute inset-4 sm:inset-8 pointer-events-none rounded-2xl"
        style={{ border: `3px solid ${COLORS.rust}`, opacity: 0.5 }}
      />

      <main className="relative z-10 pt-20 px-6 mt-6 lg:px-20 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-20 lg:mb-24">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mb-6 uppercase"
              style={{ fontFamily: displayFont, color: COLORS.ink, letterSpacing: "0.01em" }}
            >
              Post Tasks,
              <br />
              <span className="relative inline-block" style={{ color: COLORS.rust }}>
                Get Help Fast
                <svg
                  className="absolute -bottom-3 left-0 w-full h-6"
                  viewBox="0 0 400 30"
                  preserveAspectRatio="none"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d="M 5 20 Q 100 10 200 18 Q 300 8 395 22"
                    stroke={COLORS.mustard}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              ref={descRef}
              className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: bodyFont, color: "#5A4A3A" }}
            >
              Post short-term tasks and find reliable workers near you. No
              hiring, no paperwork. Get your work done today with trusted
              local helpers.
            </p>
          </div>

          {/* Notice board cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 mb-16 lg:mb-20 px-2">
            <NoticeCard
              cardRef={char1Ref}
              rotate={-2}
              tapeColor={COLORS.mustard}
              pinColor={COLORS.rust}
              accentColor={COLORS.rust}
              title="Post Tasks Easily"
              description="Create short-term tasks in just a few simple steps."
              svgContent={
                <>
                  <rect x="60" y="40" width="120" height="160" rx="8" fill="none" stroke={COLORS.rust} strokeWidth="3" />
                  <rect x="65" y="50" width="110" height="15" rx="3" fill={COLORS.rust} opacity="0.6" />
                  <line x1="75" y1="75" x2="185" y2="75" stroke={COLORS.rust} strokeWidth="2" />
                  <line x1="75" y1="90" x2="185" y2="90" stroke={COLORS.rust} strokeWidth="2" />
                  <line x1="75" y1="105" x2="150" y2="105" stroke={COLORS.rust} strokeWidth="2" />
                  <rect x="75" y="130" width="16" height="16" rx="2" fill="none" stroke={COLORS.rust} strokeWidth="2" />
                  <polyline points="80,140 85,145 95,135" fill="none" stroke={COLORS.rust} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="100" y="148" fontSize="12" fill={COLORS.rust} fontWeight="bold">Task Details</text>
                  <g transform="rotate(-45 180 60)">
                    <rect x="175" y="50" width="10" height="40" rx="5" fill={COLORS.ink} />
                    <polygon points="175,45 180,35 185,45" fill={COLORS.ink} />
                  </g>
                  <circle cx="200" cy="200" r="8" fill={COLORS.mustard} opacity="0.6" />
                  <circle cx="60" cy="220" r="6" fill={COLORS.mustard} opacity="0.5" />
                </>
              }
            />

            <NoticeCard
              cardRef={char2Ref}
              rotate={1.5}
              tapeColor={COLORS.rust}
              pinColor={COLORS.mustard}
              accentColor={COLORS.clay}
              title="Find Local Helpers"
              description="Connect with verified people ready to help near you."
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
              rotate={-1}
              tapeColor={COLORS.clay}
              pinColor={COLORS.rust}
              accentColor={COLORS.mustard}
              title="Instant Payments"
              description="Get paid fast for completed tasks. No waiting, no hassle."
              svgContent={
                <>
                  <rect x="45" y="60" width="150" height="110" rx="10" fill="none" stroke={COLORS.mustard} strokeWidth="3" />
                  <rect x="50" y="55" width="140" height="35" rx="6" fill={COLORS.mustard} opacity="0.7" />
                  <rect x="70" y="110" width="100" height="40" rx="4" fill={COLORS.rust} />
                  <text x="85" y="137" fontSize="10" fontWeight="bold" fill="#F1E6D2">₹500</text>
                  <rect x="75" y="100" width="100" height="40" rx="4" fill={COLORS.clay} />
                  <text x="90" y="127" fontSize="10" fontWeight="bold" fill="#F1E6D2">₹500</text>
                  <rect x="80" y="90" width="100" height="40" rx="4" fill={COLORS.mustard} />
                  <text x="95" y="117" fontSize="10" fontWeight="bold" fill={COLORS.ink}>₹500</text>
                  <circle cx="165" cy="75" r="16" fill={COLORS.ink} />
                  <polyline points="158,73 162,77 172,67" fill="none" stroke={COLORS.paper} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="55" y="175" width="35" height="22" rx="2" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <line x1="60" y1="182" x2="85" y2="182" stroke={COLORS.ink} strokeWidth="1" />
                  <rect x="100" y="175" width="25" height="40" rx="2" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <circle cx="112" cy="210" r="3" fill={COLORS.ink} />
                  <circle cx="150" cy="195" r="12" fill="none" stroke={COLORS.ink} strokeWidth="1.5" />
                  <text x="146" y="200" fontSize="12" fontWeight="bold" fill={COLORS.ink}>₹</text>
                </>
              }
            />
          </div>

          {/* Call to action — styled like a rubber ink stamp */}
          <div className="text-center">
            <div className="inline-block" style={{ transform: "rotate(-1.5deg)" }}>
              <div
                className="p-1"
                style={{ border: `3px solid ${COLORS.rust}`, borderRadius: "6px" }}
              >
                <Link to="/post/job">
                  <Button text="Post Task" />
                </Link>
              </div>
            </div>
            <p
              className="font-semibold mt-6 uppercase text-sm tracking-wider"
              style={{ fontFamily: bodyFont, color: COLORS.ink }}
            >
              No contracts &nbsp;·&nbsp; Verified workers &nbsp;·&nbsp; Pay only after work is done
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}