import { useState } from "react";
import { useToast } from "../common/Toast";
import { sendContactInquiry } from "../../../services/api";

export default function ContactForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactInquiry(formData);
      showToast("Message sent — we'll get back to you soon!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      showToast("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex h-full flex-col p-6 sm:p-8 md:p-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800">
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-1 flex-col">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-xs text-neutral-500">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Your name"
                className="mt-1 w-full border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-xs text-neutral-500">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder="+92 00000 00000"
                className="mt-1 w-full border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#5c1f1f] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-xs text-neutral-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className="mt-1 w-full border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#5c1f1f] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-xs text-neutral-500">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              placeholder="Tell us what you're looking for..."
              className="mt-1 w-full resize-none border border-neutral-300 px-3 py-2.5 text-sm focus:border-[#5c1f1f] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center bg-[#5c1f1f] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929] sm:w-auto"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
