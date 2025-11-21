import React from "react";
import { useState } from "react";
import useReveal from "../components/HomeComponents/UseReveal";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Cards from "../components/HomeComponents/Cards";
import StartHome from "../components/HomeComponents/StartHome";
import { Target } from "lucide-react";

const Home = () => {
  const [hoveredSide, setHoveredSide] = useState(null);
  // const ref=useReveal();
  const user = null;
  return (
    <div className="scroll-smooth">
      {/* animated home content */}
      <StartHome />
      {/* information content */}
      <Cards />

      {/* why choose taskopia */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#8D5F8C]">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            ref={useReveal()}
            className="reveal text-3xl font-semibold mb-6 text-[#6B3F69]"
          >
            Why Choose Taskopia?
          </h2>
          <p ref={useReveal()} className="reveal text-[#131D4F] mb-10">
            Taskopia bridges the gap between opportunity and talent. It’s the
            easiest way for students to find flexible work...
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[#292fa6]">
            {[
              {
                text: "Quick Jobs Work when you’re free",
                from: "#0D1164",
                to: "#292fa6",
              },
              {
                text: "No Long Commitments One-day tasks only",
                from: "#641B2E",
                to: "#c14c6b",
              },
              {
                text: "Flexible Timings You decide when to work",
                from: "#3D365C",
                to: "#645a90",
              },
              {
                text: "Trusted Network Verified local users",
                from: "#3F72AF",
                to: "#5a8cc9",
              },
            ].map((text, index) => (
              <div
                key={index}
                ref={useReveal()}
                className="reveal p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                style={{
                  background: `linear-gradient(135deg, ${text.from} 0%, ${text.to} 100%)`,
                }}
              >
                <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
                <p className="text-gray-100">{text.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our mission */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#8D5F8C] to-[#6B3F69] text-white text-center">
        <div ref={useReveal()} className="reveal flex flex-col items-center">
          <Target className="w-12 h-12 mb-4 text-emerald-100" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-3xl text-sky-100">
            To empower students with real-world earning opportunities...
          </p>
        </div>
      </section>

      {/* What our users saying  */}
      <section className="py-20 px-6 bg-white text-center">
        <h2
          ref={useReveal()}
          className="reveal text-3xl font-semibold mb-10 text-sky-700"
        >
          What Our Users Say 💬
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Taskopia helped me earn extra money during weekends! So easy to use.",
              name: "Aisha, Student",
            },
            {
              quote:
                "I found a worker in 10 minutes when my staff didn’t show up. Brilliant idea!",
              name: "Rajesh, Shop Owner",
            },
            {
              quote:
                "It’s the perfect bridge between students and local jobs. Great UX too!",
              name: "Meena, College Student",
            },
          ].map((t, i) => (
            <div
              key={i}
              ref={useReveal()}
              className="reveal p-6 bg-sky-50 rounded-2xl shadow border border-sky-100"
            >
              <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
              <p className="text-emerald-700 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ready to experince */}
      <section className="relative py-24 bg-[#0B0F19] overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-0 -left-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] transition-opacity duration-700 ${
              hoveredSide === "business" ? "opacity-10" : "opacity-40"
            }`}
          />
          <div
            className={`absolute bottom-0 -right-[10%] w-[60%] h-[60%] bg-pink-600/20 rounded-full blur-[120px] transition-opacity duration-700 ${
              hoveredSide === "student" ? "opacity-10" : "opacity-40"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header Area */}
          <div className="text-center mb-16">
            <div width="100%">
              {/*  */}

              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                Choose Your Path
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                Whether you're looking to earn or looking to hire, Taskopia is
                your gateway to opportunity.
              </p>
            </div>
          </div>

          {/* Interactive Split Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Student Card */}
            <div className="h-full">
              <div
                onMouseEnter={() => setHoveredSide("student")}
                onMouseLeave={() => setHoveredSide(null)}
                className={`group relative h-full min-h-[400px] rounded-3xl border p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
                  hoveredSide === "student"
                    ? "bg-indigo-900/20 border-indigo-500/50  translate-y-[-4px]"
                    : "bg-slate-800/40 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:border-indigo-400 transition-all duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    I want to Earn
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Turn your free hours into cash. Access hundreds of local
                    micro-tasks instantly. No resumes, just results.
                  </p>

                  <ul className="mt-8 space-y-3">
                    <li className="flex items-center text-slate-300 text-sm">
                      <Sparkles className="w-4 h-4 text-indigo-400 mr-2" />{" "}
                      Instant Payouts
                    </li>
                    <li className="flex items-center text-slate-300 text-sm">
                      <TrendingUp className="w-4 h-4 text-indigo-400 mr-2" />{" "}
                      Build your Reputation
                    </li>
                  </ul>
                </div>

                <div className="relative z-10 mt-10">
                  <button className="w-full py-4 rounded-xl bg-white text-indigo-900 font-bold text-sm tracking-wide hover:bg-indigo-50 transition-colors flex items-center justify-center group-hover:shadow-lg">
                    Join as Student{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Business Card */}
            <div className="h-full">
              <div
                onMouseEnter={() => setHoveredSide("business")}
                onMouseLeave={() => setHoveredSide(null)}
                className={`group relative h-full min-h-[400px] rounded-3xl border p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
                  hoveredSide === "business"
                    ? "bg-cyan-900/30 border-cyan-500/50 translate-y-[-4px]"
                    : "bg-slate-800/40 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:border-cyan-400 transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    I want to Hire
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Find reliable student help for one-off tasks. From delivery
                    to data entry, get it done today.
                  </p>

                  <ul className="mt-8 space-y-3">
                    <li className="flex items-center text-slate-300 text-sm">
                      <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />{" "}
                      Verified Local Talent
                    </li>
                    <li className="flex items-center text-slate-300 text-sm">
                      <TrendingUp className="w-4 h-4 text-cyan-400 mr-2" /> Pay
                      Per Task
                    </li>
                  </ul>
                </div>

                <div className="relative z-10 mt-10">
                  <button className="w-full py-4 rounded-xl bg-transparent border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-colors flex items-center justify-center group-hover:border-cyan-500/50">
                    Post a Task{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
                Join 10,000+ users building the future of flexible work.
            </p>
        </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
