import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

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

// Cool, calm, light ice-blue/gray-blue theme palette
const COLORS = {
  bg: "#F0F4F8",       // Soft, airy ice-blue / calm gray-blue
  cardBg: "#FFFFFF",   // Crisp clean white paper card
  ink: "#1E293B",      // Deep slate ink
  muted: "#64748B",    // Soft cool slate gray
  accent: "#0284C7",   // Calm sky blue highlight
  star: "#EAB308",     // Warm gold star
  border: "#CBD5E1",   // Delicate cool border
};

const reviews = [
  {
    name: 'Lokesh',
    rating: 5,
    text: 'Found someone to help with my furniture assembly in under 10 minutes. Amazing service!',
  },
  {
    name: 'Mohan',
    rating: 5,
    text: 'The helpers are professional and verified. I feel safe using this platform.',
  },
  {
    name: 'Pallavi',
    rating: 5,
    text: 'Quick responses and fair pricing. This is my go-to for any task I need help with.',
  },
  {
    name: 'Sai',
    rating: 5,
    text: 'Super easy to use. Posted my task and had multiple offers within minutes.',
  },
];

export default function UserSay() {
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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
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
        {/* Section header */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl tracking-tight mb-4 font-semibold"
            style={{ fontFamily: displayFont, color: COLORS.ink, letterSpacing: "-0.02em" }}
          >
            What Our Users Say
          </h2>
          <div
            className="w-16 h-1 mx-auto my-6 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          ></div>
          <p
            className="text-base md:text-lg max-w-xl mx-auto font-normal"
            style={{ fontFamily: bodyFont, color: COLORS.muted }}
          >
            Real feedback from hosts who found the help they needed.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-medium text-lg shadow-sm"
                  style={{ backgroundColor: "#E2E8F0", color: COLORS.ink, fontFamily: displayFont }}
                >
                  {review.name.charAt(0)}
                </div>

                {/* Name & rating */}
                <div>
                  <h3
                    className="text-lg font-medium tracking-wide"
                    style={{ fontFamily: displayFont, color: COLORS.ink }}
                  >
                    {review.name}
                  </h3>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        strokeWidth={2}
                        style={{ fill: COLORS.star, color: COLORS.star }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p
                className="text-sm md:text-base leading-relaxed font-normal relative z-10"
                style={{ fontFamily: bodyFont, color: COLORS.muted }}
              >
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}