import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    subtitle: "Artisanal Woodcraft Collection",
    heading: "Traditional, Handcrafted Solid Wood Bedroom Sets",
    buttonLabel: "Explore Bedroom Collection",
    href: "/category/bed",
    image:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    subtitle: "Imperial Dining Heritage",
    heading: "Warm, Rustic & Imperial Solid Wood Dining Suites",
    buttonLabel: "Explore Dining Collection",
    href: "/category/dining-set",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    subtitle: "Living Room Luxury",
    heading: "Comfortable, Timeless Solid Wood Living Room Sets",
    buttonLabel: "Explore Living Collection",
    href: "/category/sofa",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function PromoBannerCarousel() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#170e0a]"
    >
      <style>{`
        .wd-slide-img {
          transform: scale(1.08);
          transition: transform 5.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .swiper-slide-active .wd-slide-img {
          transform: scale(1);
        }

        .wd-eyebrow,
        .wd-heading,
        .wd-cta {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .swiper-slide-active .wd-eyebrow {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        .swiper-slide-active .wd-heading {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }
        .swiper-slide-active .wd-cta {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .wd-carousel .swiper-pagination {
          bottom: 18px !important;
        }
        .wd-carousel .swiper-pagination-bullet {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: rgba(247, 240, 226, 0.4);
          opacity: 1;
          transition: background 0.3s ease, width 0.3s ease;
        }
        .wd-carousel .swiper-pagination-bullet-active {
          background: #d4af6a;
          width: 38px;
        }
      `}</style>

      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="wd-carousel h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.heading}>
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="wd-slide-img absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#170e0a] via-[#170e0a]/35 to-[#170e0a]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#170e0a]/60 via-transparent to-[#170e0a]/20" />

                <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 sm:px-12 sm:pb-24 md:px-16 lg:px-24 lg:pb-28">
                  <div className="max-w-2xl">
                    <p className="wd-eyebrow mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af6a]">
                      {slide.subtitle}
                    </p>

                    <h2 className="wd-heading font-serif text-[26px] font-semibold leading-[1.15] text-[#f7f0e2] sm:text-4xl md:text-[42px] lg:text-5xl">
                      {slide.heading}
                    </h2>

                    <div className="wd-cta mt-7">
                      <Link
                        to={slide.href}
                        className="group inline-flex items-center gap-2.5 rounded-sm bg-[#d4af6a] px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1c120d] transition-colors duration-300 hover:bg-[#e0bd7c]"
                      >
                        {slide.buttonLabel}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
