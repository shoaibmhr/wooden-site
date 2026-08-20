import Container from "../common/Container";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const services = [
  {
    title: "Bespoke Custom Furniture",
    description:
      "We design and build custom furniture to your exact room dimensions and wood preference — solid Teak, Sheesham, and Oak dining sets, beds, & wardrobes.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Carved Main Doors & Frames",
    description:
      "Solid wooden entrance doors, carved panels, pivot doors, and jamb frames built with seasoned weather-resistant timber for villas and modern homes.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Interior Wood Paneling & Fluted Walls",
    description:
      "Transform interior living spaces with floor-to-ceiling wooden accent walls, fluted timber panels, acoustic louvers, and bespoke ceiling beams.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Wooden Windows & Glass Casements",
    description:
      "Traditional sash windows, modern casements, and sliding patio doors built with precision weather seals and high-durability wood polishes.",
    image:
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Artisan Polish & Antique Lacquer",
    description:
      "Bring old heirloom wood back to life with our re-polishing service — natural teak oil, dark walnut stain, matt black, and lacquer finishes.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial & Villa Fitting Services",
    description:
      "Full turnkey installation by our master carpentry team. We measure, deliver, align, and fit all wooden elements at your site.",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function ServicesGrid() {
  return (
    <section className="w-full bg-[#faf6ef] py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
            Artisanal Capability
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#2b1710]">
            Bespoke Woodwork & Interior Services
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-20 bg-[#d4af6a]" />
          <p className="mt-4 text-sm sm:text-base text-neutral-600">
            From single custom furniture items to full luxury villa architectural wood projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const waMsg = encodeURIComponent(
              `Salam Ashtech Wooden! Mujhe *${service.title}* ke baare mein consult karna hai.`
            );
            const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

            return (
              <div
                key={service.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#ecdfc4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2b1710]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#5c4a3b] flex-1">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#ecdfc4] pt-4">
                    <Link
                      to="/get-quote"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#2b1710] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] transition-colors hover:bg-[#3e2723]"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-lg bg-emerald-600 p-2.5 text-white transition-colors hover:bg-emerald-500"
                      title="Consult on WhatsApp"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
