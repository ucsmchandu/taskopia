import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Found someone to help with my furniture assembly in under 10 minutes. Amazing service!',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'The helpers are professional and verified. I feel safe using this platform.',
  },
  {
    name: 'Emily Rodriguez',
    rating: 5,
    text: 'Quick responses and fair pricing. This is my go-to for any task I need help with.',
  },
  {
    name: 'David Thompson',
    rating: 5,
    text: 'Super easy to use. Posted my task and had multiple offers within minutes.',
  },
];

export default function UserSay() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

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
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-gradient-to-br from-cream-50 via-taupe-100 to-sand-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mb-4">
            What Our Users Say
          </h2>
          <div className="w-32 h-1 bg-stone-900 mx-auto my-6 rounded-full"></div>
          <p className="text-lg text-stone-700 max-w-2xl mx-auto">
            Real feedback from hosts who found the help they needed.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col relative overflow-hidden"
            >
              {/* Gradient overlay inside card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cream-100 via-taupe-200 to-sand-100 opacity-20 pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* Avatar gradient with new colors */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-ivory-400 via-taupe-300 to-cream-300 flex items-center justify-center shadow-inner">
                  <span className="text-stone-900 font-bold text-xl">
                    {review.name.charAt(0)}
                  </span>
                </div>

                {/* Name & rating */}
                <div>
                  <h3 className="font-semibold text-lg text-stone-900">
                    {review.name}
                  </h3>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        strokeWidth={2}
                        className="fill-stone-400 text-stone-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review text */}
              <p className="text-stone-700 italic leading-relaxed text-base relative z-10">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
