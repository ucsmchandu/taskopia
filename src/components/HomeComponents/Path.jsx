import React, { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Path = () => {
  const [hoveredSide, setHoveredSide] = useState(null);

  return (
    <section className="relative py-24 bg-[#0B0F19] overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#2563EB]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            Whether you're looking to earn or looking to hire, Taskopia is your
            gateway to opportunity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Student */}
          <div
            onMouseEnter={() => setHoveredSide("student")}
            onMouseLeave={() => setHoveredSide(null)}
            className={`group relative min-h-[420px] rounded-3xl border p-8
              flex flex-col justify-between transition-all duration-300
              ${
                hoveredSide === "student"
                  ? "bg-[#111827] border-[#2563EB]/50 -translate-y-1"
                  : "bg-[#0F172A] border-[#1E293B]"
              }`}
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#111827]
                              border border-[#1E293B]
                              flex items-center justify-center mb-8
                              group-hover:bg-[#2563EB]/20 transition">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-3">
                I want to Earn
              </h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Turn your free hours into cash. Access local micro-tasks
                instantly. No resumes, just results.
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-center text-[#CBD5F5] text-sm">
                  <Sparkles className="w-4 h-4 text-[#2563EB] mr-2" />
                  Instant payouts
                </li>
                <li className="flex items-center text-[#CBD5F5] text-sm">
                  <TrendingUp className="w-4 h-4 text-[#2563EB] mr-2" />
                  Build reputation
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="mt-10 w-full py-4 rounded-xl bg-white text-black
                         font-semibold text-sm flex items-center
                         justify-center hover:bg-gray-200 transition"
            >
              Join as Student
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Business */}
          <div
            onMouseEnter={() => setHoveredSide("business")}
            onMouseLeave={() => setHoveredSide(null)}
            className={`group relative min-h-[420px] rounded-3xl border p-8
              flex flex-col justify-between transition-all duration-300
              ${
                hoveredSide === "business"
                  ? "bg-[#111827] border-[#2563EB]/50 -translate-y-1"
                  : "bg-[#0F172A] border-[#1E293B]"
              }`}
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#111827]
                              border border-[#1E293B]
                              flex items-center justify-center mb-8
                              group-hover:bg-[#2563EB]/20 transition">
                <Briefcase className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-3">
                I want to Hire
              </h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Find reliable student help for one-off tasks. Get it done
                quickly, locally, and affordably.
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-center text-[#CBD5F5] text-sm">
                  <Sparkles className="w-4 h-4 text-[#2563EB] mr-2" />
                  Verified local talent
                </li>
                <li className="flex items-center text-[#CBD5F5] text-sm">
                  <TrendingUp className="w-4 h-4 text-[#2563EB] mr-2" />
                  Pay per task
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="mt-10 w-full py-4 rounded-xl
                         border border-[#1E293B] text-white
                         font-semibold text-sm flex items-center
                         justify-center hover:bg-[#111827] transition"
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
