import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, DollarSign, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get offers within minutes and complete tasks quickly.",
  },
  {
    icon: Shield,
    title: "Verified Users",
    description: "All helpers are verified for your peace of mind.",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Choose offers that fit your budget perfectly.",
  },
  {
    icon: Clock,
    title: "Quick Responses",
    description: "Helpers respond fast so you never wait long.",
  },
];

export default function WhyChoose() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-24 md:py-32 px-8 bg-gradient-to-b from-white to-[#D9EAFD]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Why Choose Taskopia
          </h2>
          <div className="w-32 h-0.5 bg-stone-800 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-stone-700 max-w-2xl mx-auto">
            Experience the benefits of a platform built for speed, trust, and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white rounded-3xl border-2 border-transparent p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-ivory-100 via-cream-200 to-sand-200 opacity-20 pointer-events-none"></div>

                <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-r from-cream-400 via-sand-300 to-ivory-300 flex items-center justify-center">
                  <Icon size={36} className="text-stone-900" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
