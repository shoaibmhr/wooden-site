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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#17130F] py-16 sm:py-20 lg:py-24 text-white"
    >
     
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

     
      <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] via-[#17130F]/70 to-[#17130F]/90" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A468] transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Customer Satisfaction Guaranteed
          </p>
          <h2
            className={`mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F3ECDD] transition-all duration-[900ms] ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            The Best Hands In The Business
          </h2>
          <div
            className={`mx-auto mt-6 h-px bg-[#A9793C] transition-all duration-[900ms] ease-out ${
              isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          />
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 divide-y divide-[#A9793C]/15 md:divide-y-0 md:divide-x">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center py-6 md:py-0 md:px-6 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${520 + idx * 120}ms` }}
            >
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F3ECDD] tracking-tight">
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] text-[#A79A85]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}