import React from "react";
import useReveal from "./UseReveal";
import { Briefcase, Users, CheckCircle, Sparkles } from "lucide-react";

const Cards = () => {
  return (
    <section className="py-20 px-6 bg-white scroll-smooth ">
      <h2 className="text-3xl font-semibold text-center mb-12 text-[#0F4C75]">
        How Taskopia Works
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Briefcase className="w-10 h-10 text-white mb-4" />,
            title: "Post a Task",
            desc: "Owners post one-day or short-term jobs when they need help.",
            from: "#BBE1FA",
            to: "#4c9fd6",
          },
          {
            icon: <Users className="w-10 h-10 text-white mb-4" />,
            title: "Students Apply",
            desc: "Students nearby view available jobs and apply instantly.",
            from: "#A6B1E1",
            to: "#95a4e9",
          },
          {
            icon: <CheckCircle className="w-10 h-10 text-white mb-4" />,
            title: "Work & Get Paid",
            desc: "Complete the task, help the owner, and earn your payment easily.",
            from: "#FF9494",
            to: "#d68c8c",
          },
        ].map((step, index) => (
          <div
  key={index}
  ref={useReveal()}
  className="reveal p-6 rounded-2xl shadow hover:shadow-lg transition"
  style={{
    background: `linear-gradient(135deg, ${step.from} 0%, ${step.to} 100%)`,
  }}
>
  <div className="flex flex-col items-center text-center">
    {step.icon}
    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
    <p className="text-gray-600">{step.desc}</p>
  </div>
</div>

        ))}
      </div>
    </section>
  );
};

export default Cards;
