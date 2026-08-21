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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#1a1310]">
      <style>{`
        /* Smooth Zoom-In-to-Normal Settle effect when slide becomes active */
        .slide-img-zoom {
          transform: scale(1.12);
          transition: transform 1.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .swiper-slide-active .wd-slide-img {
          transform: scale(1);
        }

        /* Smooth Center Text & Badge Fade-In Scale */
        .slide-text-content {
          opacity: 0;
          transform: translateY(18px) scale(0.95);
          transition: opacity 0.9s ease-out 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
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
          transform: translateY(0) scale(1.0);
        }
      `}</style>

      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-98"
        }`}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          style={{
            "--swiper-pagination-color": "#d4af6a",
            "--swiper-pagination-bullet-inactive-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-opacity": "0.4",
          }}
          className="h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.heading}>
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="wd-slide-img absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Luxury Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-black/50 to-[#1a1310]/70" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af6a]/10 via-transparent to-black/60" />

                {/* Animated Center Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center sm:px-10 md:px-16 lg:px-24">
                  <div className="slide-text-content flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af6a]/40 bg-[#1a1310]/80 px-4 py-1.5 backdrop-blur-md text-[#e0bd7c] text-xs font-semibold uppercase tracking-[0.2em] shadow-md mb-3">
                      <Sparkles className="h-3.5 w-3.5 text-[#d4af6a]" />
                      <span>{slide.subtitle}</span>
                    </div>

                    <h2 className="max-w-3xl font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#f7f0e2] drop-shadow-xl tracking-tight">
                      {slide.heading}
                    </h2>

                    <div className="my-5 h-0.5 w-20 bg-gradient-to-r from-transparent via-[#d4af6a] to-transparent" />

                    <Link
                      to={slide.href}
                      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af6a] via-[#b8863f] to-[#d4af6a] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#1a1310] shadow-[0_4px_25px_rgba(212,175,106,0.35)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(212,175,106,0.55)] hover:scale-105 active:scale-95"
                    >
                      <span>{slide.buttonLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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