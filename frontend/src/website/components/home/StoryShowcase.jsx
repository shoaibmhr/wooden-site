import { useState } from "react";
import { Play, X } from "lucide-react";
import Container from "../common/Container";

const stories = [
  {
    title: "Wood Furniture at a Reasonable Price",
    description:
      "In this competitive age, getting a piece of furniture at a great price is easy, but getting a total quality product at a good price is extraordinary — it requires experienced carpenters and good quality raw material sourcing, which is a rare combination.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/CQF2bnZ6Kqc",
  },
  {
    title: "Crafted by Skilled Hands",
    description:
      "Every piece begins as raw timber and is shaped through hours of patient, hand-guided carving — a tradition passed down through generations of skilled artisans.",
    image:
      "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/CQF2bnZ6Kqc",
  },
  {
    title: "Furniture Means Wood",
    description:
      "Here at WoodenSite, we don't use engineered wood or MDF except behind mirrors or upholstery, as we ourselves believe that wooden products are for decades to come.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/FUUq7PL_3v0",
  },
  {
    title: "Finished With Care",
    description:
      "Every surface is hand-polished to bring out the natural grain of the wood, giving each piece its own unique character and a smooth, lasting finish.",
    image:
      "https://images.unsplash.com/photo-1764076327046-fe35f955cba1?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/CQF2bnZ6Kqc",
  },
  {
    title: "Built to Last Generations",
    description:
      "We use solid, sustainably sourced wood in every build — furniture that's meant to be passed down, not replaced.",
    image:
      "https://images.unsplash.com/photo-1580479929210-07eae66cf997?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/CZGPr7v8KLc",
  },
  {
    title: "From Our Workshop to Your Home",
    description:
      "Every order is inspected, wrapped, and delivered with the same care that went into making it — from our hands to yours.",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.youtube.com/embed/nekwtNF_ijQ",
  },
];

export default function StoryShowcase() {
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20">
      <Container>
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#A9793C]">
            Behind The Craft
          </span>
          <h2 className="mt-3 font-serif text-[#17130F] tracking-tight text-2xl sm:text-3xl md:text-4xl">
            Our Craft, Our Story
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#5C5142] leading-relaxed">
            From raw timber to timeless furniture — see what goes into every
            piece we make.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {stories.map((story, index) => {
            const isPlaying = playingIndex === index;

            return (
              <div
                key={story.title}
                className="relative h-56 w-full overflow-hidden bg-[#17130F] sm:h-64 md:h-72"
              >
                {isPlaying ? (
                  <>
                    <iframe
                      src={story.video}
                      title={story.title}
                      className="h-full w-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                    <button
                      type="button"
                      onClick={() => setPlayingIndex(null)}
                      aria-label="Close video"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#F3ECDD] text-[#17130F] transition-colors hover:bg-white"
                    >
                      <X className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingIndex(index)}
                    className="group relative h-full w-full text-left"
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/90 via-[#17130F]/30 to-transparent" />

                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F3ECDD] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                      <Play
                        className="ml-0.5 h-4 w-4 text-[#A9793C] sm:h-5 sm:w-5"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-[#F3ECDD] sm:text-base">
                        {story.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#D9CFBC]/80 sm:text-sm">
                        {story.description}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}