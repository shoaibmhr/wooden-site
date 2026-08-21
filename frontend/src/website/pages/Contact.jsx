import { useEffect, useRef, useState } from "react";
import PageHero from "../components/common/PageHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import Container from "../components/common/Container";


function useInView(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}


function MapReveal() {
  const [mapRef, mapVisible] = useInView(0.1);

  return (
    <div
      ref={mapRef}
      className={`transition-all duration-[900ms] ease-out ${
        mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: "80ms" }}
    >
      <ContactMap />
    </div>
  );
}

export default function Contact() {
  const [cardRef, cardVisible] = useInView(0.1);

  return (
    <div className="bg-[#faf6ef] min-h-screen">
      <PageHero
        image="https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80"
        title="Contact Us"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />

      <section ref={cardRef} className="w-full py-12 sm:py-16 md:py-20 overflow-hidden">
        <Container>
          <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#ecdfc4] bg-white shadow-2xl lg:grid-cols-12">
            
            <div
              className={`lg:col-span-5 transition-all duration-[900ms] ease-out ${
                cardVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <ContactInfo />
            </div>

            
            <div
              className={`lg:col-span-7 transition-all duration-700 ease-out ${
                cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <MapReveal />
    </div>
  );
}