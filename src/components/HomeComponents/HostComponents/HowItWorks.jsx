import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, MessageSquare, UserCheck, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: FileText,
    title: "Describe your task",
    description: "Tell us what you need done in a few simple words.",
  },
  {
    icon: MessageSquare,
    title: "Get quick offers",
    description: "Receive offers from verified helpers in minutes.",
  },
  {
    icon: UserCheck,
    title: "Choose your helper",
    description: "Review profiles and select the best fit for your task.",
  },
  {
    icon: CheckCircle,
    title: "Get it done fast",
    description: "Your task gets completed quickly and reliably.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    stepsRef.current.forEach((step, index) => {
      if (!step) return;

      gsap.fromTo(
        step,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );
    });
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-32 px-8 bg-gradient-to-br from-ivory-50 via-sand-100 to-cream-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl text-stone-900 mb-6">
            How It Works
          </h2>

          <div className="w-32 h-0.5 bg-stone-700 mx-auto mb-6 rounded-full"></div>

          <p className="text-lg text-stone-700/80 max-w-2xl mx-auto">
            Getting help is simple and straightforward. Follow these four easy
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 w-32 h-32 rounded-full border-2 border-stone-300 bg-cream-50 flex items-center justify-center shadow-inner">
                  <Icon size={56} className="text-stone-900" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-stone-700/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
