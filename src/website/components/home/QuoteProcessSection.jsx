import processStepsImg from "../../../assets/quote-process-steps.jpg";
import Container from "../common/Container";

const stepsSummary =
  "Our 5-step process: share your vision, get a quotation and timeline, pay a 30% advance, approve the final design, and receive your dispatched order.";

export default function QuoteProcessSection() {
  return (
    <section className="w-full bg-white border-t border-b border-neutral-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: copy + CTAs */}
          <div className="flex text-center lg:text-start  flex-col justify-center py-10 sm:py-12 md:py-16 lg:py-20 lg:pr-10 xl:pr-16">
            <h2 className="font-serif text-stone-900 tracking-tight leading-snug text-xl sm:text-2xl md:text-3xl lg:text-[2.125rem]">
              Get a quote in 24 hours by sharing your product's design,
              material, and finish.
            </h2>

            <p className="mt-3 mx-auto lg:mx-0  sm:mt-4 md:mt-5 text-stone-500 leading-relaxed text-sm sm:text-base max-w-xl">
              We have our own manufacturing unit and can offer complete
              customization for projects of any size, from small, detailed
              customizations to large-scale orders.
            </p>

            <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-[#5C2A2A] hover:bg-[#4A2121]
                           text-white tracking-[0.15em] font-medium uppercase text-center
                           text-xs sm:text-sm
                           px-6 py-3 sm:px-8 sm:py-3.5
                           transition-all duration-300 ease-out hover:tracking-[0.2em] active:scale-[0.98]"
              >
                Share Your Requirement
              </a>

              <div className="flex gap-[2px]">
                <a
                  href="/bulk-order"
                  className="flex-1 inline-flex items-center justify-center bg-[#5C2A2A] hover:bg-[#4A2121]
                             text-white tracking-[0.15em] font-medium uppercase text-center
                             text-xs sm:text-sm
                             px-4 py-3 sm:px-6 sm:py-3.5
                             transition-all duration-300 ease-out active:scale-[0.98]"
                >
                  Bulk Order
                </a>
                <a
                  href="/about"
                  className="flex-1 inline-flex items-center justify-center bg-[#5C2A2A] hover:bg-[#4A2121]
                             text-white tracking-[0.15em] font-medium uppercase text-center
                             text-xs sm:text-sm
                             px-4 py-3 sm:px-6 sm:py-3.5
                             transition-all duration-300 ease-out active:scale-[0.98]"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Right: process image — negative margins cancel Container's px-4/px-6/px-8
              exactly, so the image bleeds flush to its column edge at every breakpoint */}
          <div className="relative w-full  min-h-[240px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-0 lg:h-auto">
            <img
              src={processStepsImg}
              alt={stepsSummary}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
