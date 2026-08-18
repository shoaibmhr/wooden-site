import Container from "../common/Container";

const services = [
  {
    title: "Custom Furniture Making",
    description:
      "We manufacture furniture ourselves, built to your exact measurements and design preference. Share your requirements on WhatsApp and we'll craft it from solid wood.",
    image:
      "https://images.unsplash.com/photo-1497219055242-93359eeed651?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Standard Ready-Made Furniture",
    description:
      "Prefer to order right away? Browse our catalogue of ready-made sizes, handcrafted in-house and available to order directly.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Polish, Repair & Restoration",
    description:
      "Bring your existing wooden furniture back to life — re-polishing, repairs, and restoration work carried out by our craftsmen.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Assembly & Installation",
    description:
      "Every order is delivered and installed at your home by our team, so your furniture is ready to use from day one.",
    image:
      "https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function ServicesGrid() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Everything you need for solid wood furniture, from making to your door
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
