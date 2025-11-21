import { useEffect, useRef } from "react";

export default function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            obs.unobserve(el); // SO IMPORTANT → removes heavy observer
          }
        });
      },
      { threshold: 0.15, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
