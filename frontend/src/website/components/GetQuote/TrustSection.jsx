import { motion } from "framer-motion";
import { Factory, Clock, MessageCircle, Truck } from "lucide-react";
import Container from "../common/Container";

const points = [
  {
    icon: Factory,
    title: "Own Manufacturing Unit",
    desc: "Every piece is crafted in-house, giving us full control over quality.",
  },
  {
    icon: Clock,
    title: "24-Hour Response",
    desc: "We review your requirement and get back to you within a day.",
  },
  {
    icon: MessageCircle,
    title: "Free Consultation",
    desc: "Discuss your design and budget directly with our team, no pressure.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Your custom order is safely dispatched wherever you are.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function TrustSection() {
  return (
    <section className="w-full bg-[#faf6ee] py-10 sm:py-12 md:py-16">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {points.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-center sm:text-left shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mx-auto sm:mx-0 flex h-11 w-11 items-center justify-center rounded-xl bg-[#5C2A2A]/10 text-[#5C2A2A]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3.5 font-serif text-stone-900 text-sm sm:text-base">
                {title}
              </h3>
              <p className="mt-1.5 text-stone-500 text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
