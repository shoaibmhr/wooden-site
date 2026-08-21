import { useEffect, useState, useRef } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 400;
const SCROLL_DURATION = 600; // ms

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startY = window.scrollY;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY * (1 - eased));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full
                  bg-[#2b1710] text-[#f0d9a8] shadow-[0_8px_24px_-6px_rgba(28,18,13,0.55)]
                  ring-1 ring-[#d4af6a]/40 transition-all duration-500 ease-out
                  hover:bg-gradient-to-br hover:from-[#3e2723] hover:via-[#2b1710] hover:to-[#170e0a]
                  hover:ring-[#d4af6a]/70 active:scale-90
                  sm:bottom-8 sm:left-8
                  ${
                    isVisible
                      ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                      : "translate-y-4 scale-75 opacity-0 pointer-events-none"
                  }`}
    >
      {isVisible && (
        <span className="absolute inset-0 rounded-full ring-1 ring-[#d4af6a]/50 animate-ping" />
      )}
      <ArrowUp
        className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </button>
  );
}
