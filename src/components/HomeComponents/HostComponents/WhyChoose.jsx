import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, DollarSign, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Loads Outfit and Plus Jakarta Sans Google fonts for a sleek, contemporary, and cool aesthetic.
 */
function useFonts() {
  useEffect(() => {
    const id = "gf-outfit-jakarta";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const displayFont = '"Outfit", sans-serif';
const bodyFont = '"Plus Jakarta Sans", sans-serif';

// Calm, cool, light ice-blue/gray-blue theme palette matching the new look
const COLORS = {
  bg: "#F0F4F8",       // Calm airy background
  paper: "#FFFFFF",    // Crisp clean white paper card
  ink: "#1E293B",      // Deep slate ink
  rust: "#0284C7",     // Calm sky blue accent
  mustard: "#38BDF8",  // Bright sky accent
  clay: "#0369A1",     // Deep blue accent
  border: "#CBD5E1",   // Delicate cool border
};

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get offers within minutes and complete tasks quickly.",
    number: "01",
  },
  {
    icon: Shield,
    title: "Verified Users",
    description: "All helpers are verified for your peace of mind.",
    number: "02",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Choose offers that fit your budget perfectly.",
    number: "03",
  },
  {
    icon: Clock,
    title: "Quick Responses",
    description: "Helpers respond fast so you never wait long.",
    number: "04",
  },
];

export default function WhyChoose() {
  useFonts();

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.12,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Calm, minimalist subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.border} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.border} 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl mb-4 tracking-tight font-semibold"
            style={{ fontFamily: displayFont, color: COLORS.ink, letterSpacing: "-0.02em" }}
          >
            Why Choose Taskopia
          </h2>

          <div
            className="w-16 h-1 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: COLORS.rust }}
          />

          <p
            className="text-base md:text-lg font-normal max-w-xl mx-auto"
            style={{ fontFamily: bodyFont, color: "#64748B" }}
          >
            Experience the benefits of a platform built for speed, trust, and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: COLORS.paper,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Number Tag */}
                <div
                  className="absolute top-4 right-4 font-mono text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: "#F1F5F9", color: COLORS.ink, fontFamily: bodyFont }}
                >
                  {benefit.number}
                </div>

                <div
                  className="mb-6 w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: "#F8FAFC", border: `1.5px dashed ${COLORS.border}` }}
                >
                  <Icon size={36} style={{ color: COLORS.rust }} strokeWidth={1.8} />
                </div>

                <h3
                  className="text-xl mb-3 font-medium tracking-wide"
                  style={{ fontFamily: displayFont, color: COLORS.ink }}
                >
                  {benefit.title}
                </h3>

                <p
                  className="text-sm md:text-base leading-relaxed font-normal"
                  style={{ fontFamily: bodyFont, color: "#64748B" }}
                >
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