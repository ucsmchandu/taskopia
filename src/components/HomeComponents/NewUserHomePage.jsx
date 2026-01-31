import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function NewUserHomePage() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const highlightsRef = useRef(null);
  const ctaRef = useRef(null);
  const workflowRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          headlineRef.current,
          subheadlineRef.current,
          highlightsRef.current,
          ctaRef.current,
          workflowRef.current,
        ],
        { opacity: 0, y: 24 },
      );
      gsap.set(decorRef.current, { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(decorRef.current, { opacity: 1, duration: 0.5 })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(
          subheadlineRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .to(highlightsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(workflowRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden pt-24 pb-20"
    >
      {/* Decorative background */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute -top-24 -right-24 w-96 h-96 opacity-5"
          viewBox="0 0 100 100"
        >
          <path
            d="M50,10 Q90,30 90,50 Q90,80 50,90 Q10,80 10,50 Q10,30 50,10"
            fill="#64748b"
          />
        </svg>

        <svg
          className="absolute -bottom-32 -left-32 w-80 h-80 opacity-5"
          viewBox="0 0 100 100"
        >
          <path
            d="M30,20 Q70,10 80,50 Q70,90 30,80 Q10,50 30,20"
            fill="#64748b"
          />
        </svg>
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — TEXT */}
          <div className="space-y-8">
            <div ref={headlineRef}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                One Platform.
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Two Simple Ways to Work.
                </span>
              </h1>
            </div>

            <p
              ref={subheadlineRef}
              className="text-lg lg:text-xl text-slate-700 max-w-lg leading-relaxed"
            >
              Taskopia connects people who need short-term help with people
              ready to work. Post tasks or pick up work nearby - without
              contracts or long-term commitments.
            </p>

            <div ref={highlightsRef} className="space-y-4">
              {[
                {
                  title: "Short-term tasks only",
                  desc: "Hourly or one-day tasks with clear expectations",
                },
                {
                  title: "Built for hosts and workers",
                  desc: "Choose whether you want help or want to work",
                },
                {
                  title: "Simple and transparent",
                  desc: "Clear tasks, smooth flow, secure payments",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="mt-2 w-2 h-2 rounded-full bg-slate-500" />
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/login">
                <button
                  type="button"
                  className="group relative w-full max-w-xs cursor-pointer select-none rotate-[-2deg]
             flex items-center justify-center
             px-7 py-3 md:px-12
             text-base md:text-xl font-bold leading-7
             text-black bg-blue-300
             transition-all duration-200 ease-out
             hover:brightness-95 active:brightness-90
             focus:outline-none"
                >
                  <span className="relative z-10">Sign Up</span>

                  {/* Offset border effect */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute
               bottom-1 left-1
               w-[calc(100%-1px)] h-[calc(100%-1px)]
               border border-black
               transition-all duration-200 ease-out
               group-hover:bottom-0.5 group-hover:left-0.5"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT — WORKFLOW (RESPONSIVE) */}
          <div
            ref={workflowRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:mt-20"
          >
            {/* HOST */}
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-5">
                For Hosts
              </h3>
              <ol className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">01</span>
                  <p>Post a short-term task with requirements</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">02</span>
                  <p>Review applications and choose a worker</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">03</span>
                  <p>Confirm completion and release payment</p>
                </li>
              </ol>
            </div>

            {/* WORKER */}
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-5">
                For Workers
              </h3>
              <ol className="space-y-4 text-slate-700">
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">01</span>
                  <p>Browse nearby short-term tasks</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">02</span>
                  <p>Apply and get accepted by the host</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">03</span>
                  <p>Complete the task and get paid securely</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
