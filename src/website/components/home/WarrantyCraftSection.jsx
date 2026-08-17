import Container from "../common/Container";

const mover1 = "https://images.unsplash.com/photo-1769972557854-7eae6f95585b?w=800&q=80&auto=format&fit=crop";
const mover2 = "https://images.unsplash.com/photo-1758523671071-4e3c43d055e6?w=800&q=80&auto=format&fit=crop";
const mover3 = "https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?w=800&q=80&auto=format&fit=crop";
const mover4 = "https://images.unsplash.com/photo-1758523670969-dd1b1254062d?w=800&q=80&auto=format&fit=crop";

const craft1 = "https://images.unsplash.com/photo-1646119955125-7ef8819c813a?w=1200&q=80&auto=format&fit=crop";
const craft2 = "https://images.unsplash.com/photo-1520372561567-bac27b0e5fa1?w=1200&q=80&auto=format&fit=crop";
const craft3 = "https://images.unsplash.com/photo-1779031242515-205111711b23?w=1200&q=80&auto=format&fit=crop";

const movers = [
  { src: mover1, alt: "Team member carrying a mattress carefully" },
  { src: mover2, alt: "Team members carrying a box and plant" },
  { src: mover3, alt: "Team members carrying boxes into a home" },
  { src: mover4, alt: "Team members carrying boxes with care" },
];

const process = [
  {
    step: "01",
    src: craft1,
    alt: "Precision measuring tools used in our workshop",
    caption: "Tell Us Your Specifics",
  },
  {
    step: "02",
    src: craft2,
    alt: "Hand-finishing a piece with a hammer",
    caption: "We Customise It For You",
  },
  {
    step: "03",
    src: craft3,
    alt: "Craftsman in a workshop apron",
    caption: "Crafted In Our Own Workshop",
  },
];

export default function WarrantyCraftSection() {
  return (
    <>
      {/* Warranty & Delivery Care */}
      <section className="w-full bg-white py-10 sm:py-12 md:py-16">
        <Container>
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <h2 className="text-xl font-bold tracking-wide text-amber-900 sm:text-2xl md:text-3xl">
              Warranty Against Manufacturing Defects &amp; Transit Damage
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
              Every piece is handled with care, from our workshop to your doorstep
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {movers.map((mover) => (
              <div
                key={mover.alt}
                className="group aspect-square w-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <img
                  src={mover.src}
                  alt={mover.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Craft It */}
      <section className="w-full bg-[#faf1e0] py-10 sm:py-12 md:py-16">
        <Container>
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <h2 className="text-xl font-bold tracking-wide text-amber-900 sm:text-2xl md:text-3xl">
              How We Craft Your Furniture
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
              From your specifications to a finished piece, made in-house
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
            {process.map((item) => (
              <div
                key={item.caption}
                className="group relative h-72 w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-80"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-amber-900 sm:h-10 sm:w-10">
                  {item.step}
                </span>

                <p className="absolute inset-x-0 bottom-0 p-5 text-lg font-semibold text-white sm:p-6 sm:text-xl">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
