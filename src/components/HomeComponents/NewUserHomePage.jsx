import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// Warm, tactile, print-inspired palette (Strictly no blue, green, pink, violet, or orange)
const COLORS = {
  bg: "#F4F2EC", // Soft Linen / Sand
  surface: "#FFFFFF", // Clean Paper
  ink: "#1A1A18", // Deep Charcoal
  muted: "#6B6862", // Warm Graphite
  soft: "#B3AFA6", // Light Taupe
  line: "#E3E0D8", // Subtle Grid/Border
};

export default function NewUserHomePage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const visualRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          eyebrowRef.current,
          titleRef.current,
          descriptionRef.current,
          actionsRef.current,
          visualRef.current,
          bottomRef.current,
        ],
        { opacity: 0, y: 24 }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(visualRef.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7")
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6");

      // Subtle, organic sway for the central connection elements
      gsap.to(".print-node", {
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative font-sans selection:bg-[#1A1A18] selection:text-[#F4F2EC] overflow-hidden"
      style={{ backgroundColor: COLORS.bg, color: COLORS.ink }}
    >
      {/* -------------------------------------------------------
          BACKGROUND: Architectural / Print Grid
      ------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${COLORS.line} 1px, transparent 1px),
              linear-gradient(to bottom, ${COLORS.line} 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          }}
        />
      </div>

      {/* -------------------------------------------------------
          HERO SECTION
      ------------------------------------------------------- */}
      <main
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24 lg:pt-32 pb-16"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center min-h-[600px]">
          
          {/* LEFT: EDITORIAL COPY */}
          <section className="relative z-20">
            {/* Eyebrow */}
            {/* <div ref={eyebrowRef} className="mb-8 flex items-center gap-4"> */}
              {/* <span className="w-8 h-[1px]" style={{ backgroundColor: COLORS.ink }} /> */}
              {/* <span 
                className="text-xs tracking-[0.2em] uppercase font-semibold"
                style={{ color: COLORS.ink }}
              >
                Taskopia
              </span> */}
            {/* </div> */}

            {/* Main heading */}
            <div ref={titleRef}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
                Small tasks. <br />
                <span className="italic" style={{ color: COLORS.muted }}>Real help.</span> <br />
                Right when you need it.
              </h1>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-8 text-lg sm:text-xl leading-relaxed max-w-md font-light"
              style={{ color: COLORS.muted }}
            >
              Bringing people who need a hand together with people ready to help. Post a task, find local work, and get things done without the long-term commitment.
            </p>

            {/* Actions (Restored original button design, updated colors) */}
            <div ref={actionsRef} className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
              <Link to="/login">
                <button
                  type="button"
                  className="
                    group relative px-8 py-4 text-sm font-semibold tracking-wide text-white 
                    transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
                  "
                  style={{ backgroundColor: COLORS.ink }}
                >
                  <span className="relative z-10 cursor-pointer">Start connecting</span>
                  <span
                    className="
                      absolute inset-0 translate-x-1.5 translate-y-1.5 border 
                      transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1
                    "
                    style={{ borderColor: COLORS.ink }}
                  />
                </button>
              </Link>

              <span className="text-sm font-medium tracking-wide" style={{ color: COLORS.muted }}>
                Free to join &mdash; No subscriptions
              </span>
            </div>

            {/* Subtle community trust indicator */}
            <div className="mt-16 flex items-center gap-5 pt-8 max-w-md">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-serif italic" style={{ backgroundColor: '#EBE9E2', borderColor: COLORS.bg, color: COLORS.ink }}>H</div>
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-serif italic" style={{ backgroundColor: '#DFDCD4', borderColor: COLORS.bg, color: COLORS.ink }}>A</div>
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-light" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.bg, color: COLORS.ink }}>+</div>
              </div>
              <p className="text-sm leading-relaxed font-medium" style={{ color: COLORS.muted }}>
                A simple space bridging the gap between needing help and offering it.
              </p>
            </div>
          </section>

          {/* -------------------------------------------------------
              RIGHT VISUAL (STRUCTURED EDITORIAL CARDS)
          ------------------------------------------------------- */}
          <section ref={visualRef} className="relative hidden lg:block h-full w-full">
            <div className="relative w-full max-w-[500px] h-[550px] mx-auto flex items-center justify-center">
              
              {/* Background accent block */}
              <div 
                className="absolute right-0 top-10 w-3/4 h-3/4 opacity-40 mix-blend-multiply"
                style={{ backgroundColor: COLORS.line }}
              />

              {/* Connecting line */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[1px] h-[70%] border-l border-dashed" style={{ borderColor: COLORS.muted }} />
                <div className="print-node absolute w-8 h-8 rounded-full border bg-[#F4F2EC] flex items-center justify-center" style={{ borderColor: COLORS.ink }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.ink }} />
                </div>
              </div>

              {/* TOP CARD: HOST */}
              <div
                className="absolute top-[8%] left-0 w-[70%] bg-white p-7 shadow-sm transition-transform duration-500 hover:-translate-y-1"
                style={{ 
                  border: `1px solid ${COLORS.line}`,
                  boxShadow: `6px 6px 0px 0px ${COLORS.line}` 
                }}
              >
                <div className="flex justify-between items-end border-b pb-4 mb-4" style={{ borderColor: COLORS.line }}>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: COLORS.muted }}>
                      The Host
                    </span>
                    <h3 className="font-serif text-2xl mt-1" style={{ color: COLORS.ink }}>
                      Need a hand?
                    </h3>
                  </div>
                  <span className="font-serif text-lg italic" style={{ color: COLORS.soft }}>01</span>
                </div>
                
                <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: COLORS.muted }}>
                  Write down what you need, set your terms, and let the right person find you.
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 border" style={{ borderColor: COLORS.line, backgroundColor: COLORS.bg }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.ink }} />
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: COLORS.ink }}>Task listed</span>
                </div>
              </div>

              {/* BOTTOM CARD: WORKER */}
              <div
                className="absolute bottom-[8%] right-0 w-[70%] bg-white p-7 shadow-sm transition-transform duration-500 hover:-translate-y-1"
                style={{ 
                  border: `1px solid ${COLORS.line}`,
                  boxShadow: `6px 6px 0px 0px ${COLORS.line}` 
                }}
              >
                <div className="flex justify-between items-end border-b pb-4 mb-4" style={{ borderColor: COLORS.line }}>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: COLORS.muted }}>
                      The Ally
                    </span>
                    <h3 className="font-serif text-2xl mt-1" style={{ color: COLORS.ink }}>
                      Ready to help.
                    </h3>
                  </div>
                  <span className="font-serif text-lg italic" style={{ color: COLORS.soft }}>02</span>
                </div>
                
                <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: COLORS.muted }}>
                  Browse local opportunities and turn your spare time into meaningful work.
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 border" style={{ borderColor: COLORS.line, backgroundColor: COLORS.bg }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.ink }} />
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: COLORS.ink }}>Match found</span>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* -------------------------------------------------------
            BOTTOM FEATURE STRIP
        // ------------------------------------------------------- */}
        {/* // <div */}
        {/* //   ref={bottomRef}
        //   className="mt-16 lg:mt-20 pt-12 border-t grid sm:grid-cols-3 gap-12 sm:gap-8"
        //   style={{ borderColor: COLORS.line }}
        // > */}
        {/* //   <Feature */}
        {/* //     number="I"
        //     title="Post a task"
        //     description="Clearly outline what you need done, where, and your budget."
        //   /> */}
        {/* //   <Feature */}
        {/* //     number="II"
        //     title="Find your match"
        //     description="Review local people who are ready and available to step in."
        //   /> */}
        {/* //   <Feature */}
        {/* //     number="III"
        //     title="Get it settled"
        //     description="Complete the work and handle the exchange cleanly and securely."
        //   />
        // </div> */}
      </main>
    </div>
  );
}

function Feature({ number, title, description }) {
  return (
    <div className="flex flex-col gap-3">
      <span 
        className="font-serif text-xl" 
        style={{ color: COLORS.soft }}
      >
        {number}.
      </span>
      <div>
        <h3 className="text-base font-bold tracking-wide" style={{ color: COLORS.ink }}>
          {title}
        </h3>
        <p className="text-sm mt-2 font-medium leading-relaxed max-w-sm" style={{ color: COLORS.muted }}>
          {description}
        </p>
      </div>
    </div>
  );
}