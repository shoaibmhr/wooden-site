import { useEffect, useState, useRef } from "react";
import Container from "../common/Container";

const stats = [
  { value: 48, label: "Years of Experience", suffix: "" },
  { value: 1567, label: "Customers Served", suffix: "+" },
  { value: 524, label: "Returning Customers", suffix: "+" },
  { value: 12, label: "Industries Served", suffix: "" },
];

function CountUpNumber({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="inline-block">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1a1310] py-16 sm:py-20 lg:py-24 text-white">
      {/* Background Image with Dark Wood Texture Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Gradient Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-black/60 to-[#1a1310]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-[#e0bd7c]/90">
            Customer Satisfaction Guaranteed.
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#faf6ef] drop-shadow-md">
            The Best Hands In The Business
          </h2>
          <div className="mx-auto mt-6 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af6a] to-transparent" />
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#d4af6a] tracking-tight group-hover:scale-105 transition-transform duration-300">
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-[#ecdfc4]/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
