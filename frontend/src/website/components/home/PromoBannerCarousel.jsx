import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    subtitle: "Artisanal Woodcraft Collection",
    heading: "Traditional, Handcrafted, Solid Wood Bedroom Sets",
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
    heading: "Comfortable, Timeless, Solid Wood Living Room Sets",
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#17130F]">
      <style>{`
        .slide-img-zoom {
          transform: scale(1.12);
          transition: transform 1.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .swiper-slide-active .slide-img-zoom {
          transform: scale(1.0);
        }

        .slide-text-content {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s ease-out 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .swiper-slide-active .slide-text-content {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          style={{
            "--swiper-pagination-color": "#A9793C",
            "--swiper-pagination-bullet-inactive-color": "#F3ECDD",
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
                  className="slide-img-zoom absolute inset-0 h-full w-full object-cover"
                />

                {/* Single, quiet overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] via-[#17130F]/55 to-[#17130F]/25" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center sm:px-10 md:px-16 lg:px-24">
                  <div className="slide-text-content flex flex-col items-center">
                    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A468] mb-4">
                      {slide.subtitle}
                    </span>

                    <h2 className="max-w-3xl font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-[#F3ECDD] tracking-tight">
                      {slide.heading}
                    </h2>

                    <div className="my-6 h-px w-12 bg-[#A9793C]" />

                    <Link
                      to={slide.href}
                      className="group inline-flex items-center gap-2.5 bg-[#A9793C] px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#17130F] transition-colors duration-300 hover:bg-[#C9A468]"
                    >
                      <span>{slide.buttonLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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