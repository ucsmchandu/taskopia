import React, { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// Warm, print-inspired editorial palette matching the rest of the application
const COLORS = {
  bg: "#F5F3EC", // Classic warm linen background
  surface: "#FCFBFA", // Crisp paper white card surface
  ink: "#141413", // Rich charcoal text
  muted: "#5A5752", // Warm reading grey
  soft: "#A39F98", // Architectural taupe
  line: "#DCD8CE", // Fine crease/border line
};

const Path = () => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <section 
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: COLORS.bg, color: COLORS.ink }}
    >
      {/* Background Grid Pattern (Plain lines only, no blur/noise) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.line} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.line} 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 max-w-[85rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span 
            className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6 px-4 py-1.5 border"
            style={{ color: COLORS.ink, borderColor: COLORS.ink }}
          >
            Direction
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance mb-6">
            Choose Your Path
          </h2>
          <div className="w-16 h-px mb-6" style={{ backgroundColor: COLORS.muted }}></div>
          <p className="text-lg font-medium max-w-xl mx-auto leading-relaxed" style={{ color: COLORS.muted }}>
            Whether you're looking to earn or looking to hire, Taskopia is your
            gateway to opportunity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          
          {/* Student / Earn */}
          <div
            onMouseEnter={() => setHoveredSide("student")}
            onMouseLeave={() => setHoveredSide(null)}
            className="group relative min-h-[440px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.line}`,
              boxShadow: `6px 6px 0px 0px ${COLORS.line}`,
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-10 border-b pb-6" style={{ borderColor: COLORS.line }}>
                <div 
                  className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:bg-[#141413] group-hover:text-[#FCFBFA]"
                  style={{ borderColor: COLORS.line, color: COLORS.ink, backgroundColor: COLORS.bg }}
                >
                  <GraduationCap className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-2xl italic" style={{ color: COLORS.soft }}>
                  01
                </span>
              </div>

              <h3 className="font-serif text-3xl mb-4 leading-tight">
                I want to Earn
              </h3>
              <p className="text-sm font-medium leading-[1.7] mb-8" style={{ color: COLORS.muted }}>
                Turn your free hours into cash. Access local micro-tasks
                instantly. No resumes, just results.
              </p>

              <ul className="space-y-3 border-t pt-6" style={{ borderColor: COLORS.line }}>
                <li className="flex items-center text-sm font-medium" style={{ color: COLORS.ink }}>
                  <Sparkles className="w-4 h-4 mr-3" style={{ color: COLORS.muted }} />
                  Instant payouts
                </li>
                <li className="flex items-center text-sm font-medium" style={{ color: COLORS.ink }}>
                  <TrendingUp className="w-4 h-4 mr-3" style={{ color: COLORS.muted }} />
                  Build reputation
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="mt-10 w-full py-4 px-6 bg-[#141413] text-white
                       font-bold text-xs tracking-widest uppercase flex items-center
                       justify-center transition-all hover:bg-[#2A2824]"
            >
              Join as Student
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Business / Hire */}
          <div
            onMouseEnter={() => setHoveredSide("business")}
            onMouseLeave={() => setHoveredSide(null)}
            className="group relative min-h-[440px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.line}`,
              boxShadow: `6px 6px 0px 0px ${COLORS.line}`,
            }}
          >
            <div>
              <div className="flex justify-between items-start mb-10 border-b pb-6" style={{ borderColor: COLORS.line }}>
                <div 
                  className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:bg-[#141413] group-hover:text-[#FCFBFA]"
                  style={{ borderColor: COLORS.line, color: COLORS.ink, backgroundColor: COLORS.bg }}
                >
                  <Briefcase className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-2xl italic" style={{ color: COLORS.soft }}>
                  02
                </span>
              </div>

              <h3 className="font-serif text-3xl mb-4 leading-tight">
                I want to Hire
              </h3>
              <p className="text-sm font-medium leading-[1.7] mb-8" style={{ color: COLORS.muted }}>
                Find reliable student help for one-off tasks. Get it done
                quickly, locally, and affordably.
              </p>

              <ul className="space-y-3 border-t pt-6" style={{ borderColor: COLORS.line }}>
                <li className="flex items-center text-sm font-medium" style={{ color: COLORS.ink }}>
                  <Sparkles className="w-4 h-4 mr-3" style={{ color: COLORS.muted }} />
                  Verified local talent
                </li>
                <li className="flex items-center text-sm font-medium" style={{ color: COLORS.ink }}>
                  <TrendingUp className="w-4 h-4 mr-3" style={{ color: COLORS.muted }} />
                  Pay per task
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="mt-10 w-full py-4 px-6 border-2 border-[#141413] text-[#141413]
                       font-bold text-xs tracking-widest uppercase flex items-center
                       justify-center transition-all hover:bg-[#141413] hover:text-white"
            >
              Post a Task
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Path;