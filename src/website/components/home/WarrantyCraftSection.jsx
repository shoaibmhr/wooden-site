import Container from "../common/Container";

// Free-to-use Unsplash photos (Unsplash License — no attribution required).
// Swap these for your own once ready.
const mover1 = "https://images.unsplash.com/photo-1769972557854-7eae6f95585b?w=800&q=80&auto=format&fit=crop"; // Rosa Jakobi
const mover2 = "https://images.unsplash.com/photo-1758523671071-4e3c43d055e6?w=800&q=80&auto=format&fit=crop"; // Vitaly Gariev
const mover3 = "https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?w=800&q=80&auto=format&fit=crop"; // Vitaly Gariev
const mover4 = "https://images.unsplash.com/photo-1758523670969-dd1b1254062d?w=800&q=80&auto=format&fit=crop"; // Vitaly Gariev

const craft1 = "https://images.unsplash.com/photo-1646119955125-7ef8819c813a?w=1200&q=80&auto=format&fit=crop"; // Jimmy Nilsson Masth
const craft2 = "https://images.unsplash.com/photo-1520372561567-bac27b0e5fa1?w=1200&q=80&auto=format&fit=crop"; // Alexander Andrews
const craft3 = "https://images.unsplash.com/photo-1779031242515-205111711b23?w=1200&q=80&auto=format&fit=crop"; // Minh Đức

const movers = [
  { src: mover1, alt: "Team member carrying a mattress carefully" },
  { src: mover2, alt: "Team members carrying a box and plant" },
  { src: mover3, alt: "Team members carrying boxes into a home" },
  { src: mover4, alt: "Team members carrying boxes with care" },
];

const craftImages = [
  { src: craft1, alt: "Precision measuring tools used in our workshop" },
  { src: craft2, alt: "Hand-finishing a piece with a hammer" },
  { src: craft3, alt: "Craftsman in a workshop apron" },
];

export default function WarrantyCraftSection() {
  return (
    <section className="w-full bg-white border-t border-b border-neutral-200">
      {/* Warranty statement + delivery care photos */}
      <Container>
        <div className="py-10 sm:py-12 md:py-16 text-center">
          <h2 className="font-serif text-[#5C2A2A] tracking-tight leading-snug text-xl sm:text-2xl md:text-3xl max-w-2xl mx-auto">
            Warranty against manufacturing defects or damage during transit
          </h2>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {movers.map((mover) => (
              <div
                key={mover.alt}
                className="relative w-full aspect-square rounded-xl overflow-hidden border border-stone-200"
              >
                <img
                  src={mover.src}
                  alt={mover.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Craftsmanship photo strip — full-bleed, no Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
        {craftImages.map((img) => (
          <div key={img.alt} className="relative w-full aspect-[4/3] sm:aspect-square">
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
