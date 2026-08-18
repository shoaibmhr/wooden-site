import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    heading: "Traditional, Handcrafted, Solid Wood Bedroom Sets",
    buttonLabel: "Browse Bed",
    href: "/products/wooden-bed",
    image:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    heading: "Warm, Rustic, Solid Wood Dining Sets",
    buttonLabel: "Browse Dining",
    href: "/products/dining-set",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    heading: "Comfortable, Timeless, Solid Wood Living Room Sets",
    buttonLabel: "Browse Sofa",
    href: "/products/sofa",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function PromoBannerCarousel() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        style={{
          "--swiper-pagination-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
        className="h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.heading}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.heading}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center  sm:px-10 s md:px-16 lg:px-24">
                <h2 className="max-w-2xl font-serif text-xl font-medium leading-snug text-white sm:text-2xl md:text-3xl">
                  {slide.heading}
                </h2>
                <Link
                  to={slide.href}
                  className="mt-6 inline-flex items-center bg-white px-7 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-amber-800 hover:text-white sm:px-8 sm:py-3.5 sm:text-sm"
                >
                  {slide.buttonLabel}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
