import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroimage1  from "../../../assets/image/heroimage1.jpg";
import heroimage2 from "../../../assets/image/heroimage2.jpg";
import heroimage3 from "../../../assets/image/heroimage3.jpg";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    image:heroimage1,
    alt: "Cozy wooden living room with brown sectional sofa",
  },
  {
    image:heroimage2,
    alt: "Dining room with rustic wooden table and chairs",
  },
  {
    image:heroimage3,
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
