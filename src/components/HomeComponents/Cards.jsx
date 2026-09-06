import React from "react";
import useReveal from "./UseReveal";
import { Briefcase, Users, CheckCircle } from "lucide-react";

// Continuing the warm print/editorial palette
const COLORS = {
  bg: "#F5F3EC",
  surface: "#FCFBFA",
  ink: "#141413",
  muted: "#5A5752",
  soft: "#A39F98",
  line: "#DCD8CE",
};

const Cards = () => {
  const steps = [
    {
      icon: <Briefcase strokeWidth={1.2} className="w-7 h-7" />,
      title: "Post a Task",
      desc: "Hosts post one-day or short-term jobs when they need an extra set of hands.",
      number: "01",
    },
    {
      icon: <Users strokeWidth={1.2} className="w-7 h-7" />,
      title: "Ally Applies",
      desc: "Local individuals view available opportunities and connect instantly.",
      number: "02",
    },
    {
      icon: <CheckCircle strokeWidth={1.2} className="w-7 h-7" />,
      title: "Work & Get Paid",
      desc: "Complete the task, provide real help, and handle the exchange cleanly.",
      number: "03",
    },
  ];

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden scroll-smooth" 
      style={{ backgroundColor: COLORS.bg, color: COLORS.ink }}
    >
      {/* Subtle architectural grid to tie into the hero section */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.line} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.line} 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage: "linear-gradient(to top, black 5%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black 5%, transparent 80%)",
        }} 
      />

      <div className="max-w-[85rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="w-12 h-px mb-8" style={{ backgroundColor: COLORS.ink }} />
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-balance">
            How Taskopia Works
          </h2>
        </div>
        
        {/* Cards Grid with the requested individual background wrapper boxes */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Extracted into a sub-component with individual background box wrappers
function StepCard({ step }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal group relative transition-all duration-500 hover:-translate-y-1"
      style={{
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.line}`,
        boxShadow: `8px 8px 0px 0px ${COLORS.line}`
      }}
    >
      {/* Individual background box wrapper for the internal content */}
      <div 
        className="p-8 lg:p-10 relative overflow-hidden h-full flex flex-col justify-between"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.line} 0.5px, transparent 0.5px),
            linear-gradient(to bottom, ${COLORS.line} 0.5px, transparent 0.5px)
          `,
          backgroundSize: "2rem 2rem",
          backgroundColor: COLORS.surface,
        }}
      >
        {/* Subtle inner container overlay for clean readability */}
        <div className="absolute inset-0 bg-[#FCFBFA]/90 pointer-events-none" />

        <div className="relative z-10">
          {/* Top row: Icon and Number */}
          <div 
            className="flex justify-between items-start mb-10 border-b pb-6" 
            style={{ borderColor: COLORS.line }}
          >
            <div 
              className="p-3 border rounded-full transition-colors duration-500 group-hover:bg-[#141413] group-hover:text-[#FCFBFA]" 
              style={{ borderColor: COLORS.line, color: COLORS.ink, backgroundColor: COLORS.surface }}
            >
              {step.icon}
            </div>
            <span 
              className="font-serif text-3xl italic leading-none" 
              style={{ color: COLORS.soft }}
            >
              {step.number}
            </span>
          </div>
          
          {/* Content */}
          <h3 
            className="text-xl font-bold tracking-wide mb-4" 
            style={{ color: COLORS.ink }}
          >
            {step.title}
          </h3>
          <p 
            className="text-sm font-medium leading-[1.7]" 
            style={{ color: COLORS.muted }}
          >
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;