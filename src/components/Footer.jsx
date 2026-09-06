import React from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { Link } from "react-router-dom";

// Distinct, cohesive color palette for the footer to avoid blending into other sections
const FOOTER_COLORS = {
  bg: "#141413",       // Rich charcoal base
  surface: "#1C1B1A",  // Slightly lighter dark surface
  text: "#F5F3EC",     // Warm linen text
  muted: "#A39F98",    // Muted stone grey
  border: "#2C2A29",   // Subtle dark border
  accent: "#DCD8CE",   // Soft highlight
};

const Footer = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.userType;

  return (
    <footer 
      className="relative mt-2 border-t overflow-hidden" 
      style={{ backgroundColor: FOOTER_COLORS.bg, borderColor: FOOTER_COLORS.border, color: FOOTER_COLORS.text }}
    >
      {/* Subtle Dark Minimalist Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-35 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, ${FOOTER_COLORS.border} 1px, transparent 1px),
            linear-gradient(to bottom, ${FOOTER_COLORS.border} 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* Subtle Background Watermark Typography */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden">
        <h1
          className="
            font-serif
            italic
            select-none
            text-transparent
            bg-clip-text
            text-[clamp(100px,20vw,340px)]
            leading-none
            whitespace-nowrap
            opacity-[0.1]
          "
          style={{ backgroundImage: `linear-gradient(to top, ${FOOTER_COLORS.text}, transparent)` }}
        >
          Taskopia
        </h1>
      </div>

      <div className="relative z-10 max-w-[85rem] mx-auto px-6 sm:px-12 py-20">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            gap-12
            mb-16
            text-center
            md:text-left
          "
        >
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: FOOTER_COLORS.text }}>
              Taskopia
            </h2>
            <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0 font-normal" style={{ color: FOOTER_COLORS.muted }}>
              A clean marketplace for short-term tasks. Post, connect, and get local work done without friction.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6" style={{ color: FOOTER_COLORS.accent }}>
              Platform
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {!role && (
                <>
                  <li><Link to="/" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Home</Link></li>
                  <li><Link to="/how/it/works" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>How It Works</Link></li>
                  <li><Link to="/signup" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Sign Up</Link></li>
                </>
              )}

              {role === "ally" && (
                <>
                  <li><Link to="/job/listings" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Browse Tasks</Link></li>
                  <li><Link to="/applied-tasks" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>My Applications</Link></li>
                  <li><Link to="/ally/dashboard" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Dashboard</Link></li>
                </>
              )}

              {role === "host" && (
                <>
                  <li><Link to="/post/job" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Post a Task</Link></li>
                  <li><Link to="/host/dashboard" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Dashboard</Link></li>
                  <li><Link to="/profile/host" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Profile</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6" style={{ color: FOOTER_COLORS.accent }}>
              Company
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>About</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Contact</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6" style={{ color: FOOTER_COLORS.accent }}>
              Support
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/help-center" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Help Center</Link></li>
              <li><Link to="/how/it/works" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>How It Works</Link></li>
              <li><Link to="/safety-trust" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Safety & Trust</Link></li>
              {role && (
                <li><Link to="/report-problem" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Report a Problem</Link></li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            
            pt-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            text-center
            gap-4
          "
          style={{ borderColor: FOOTER_COLORS.border }}
        >
          <div className="text-xs font-medium space-y-1 md:space-y-0 md:flex md:gap-2" style={{ color: FOOTER_COLORS.muted }}>
            <p>© {new Date().getFullYear()} Taskopia.</p>
            <span className="hidden md:inline">•</span>
            <p>Owned and operated by UPPU CHANDRA SAI MAHESH.</p>
          </div>

          <div className="flex gap-6 text-xs font-medium">
            <Link to="/privacy-policy" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Privacy Policy</Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Terms of Service</Link>
            <Link to="/refund-policy" className="transition-colors hover:text-white hover:underline" style={{ color: FOOTER_COLORS.muted }}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;