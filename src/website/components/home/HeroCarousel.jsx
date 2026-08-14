import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80",
    alt: "Cozy wooden living room with brown sectional sofa",
  },
  {
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1600&q=80",
    alt: "Dining room with rustic wooden table and chairs",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    alt: "Wooden interior furniture setup",
  },
];

export default function HeroCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        navigation={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="group absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition-all duration-300 hover:scale-110 hover:bg-amber-800 sm:h-10 sm:w-10 sm:left-4"
      >
        <ChevronLeft
          className="h-5 w-5 transition-colors duration-300 group-hover:text-white"
          strokeWidth={2}
        />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="group absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition-all duration-300 hover:scale-110 hover:bg-amber-800 sm:h-10 sm:w-10 sm:right-4"
      >
        <ChevronRight
          className="h-5 w-5 transition-colors duration-300 group-hover:text-white"
          strokeWidth={2}
        />
      </button>
    </section>
  );
}
