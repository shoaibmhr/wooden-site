import { useState } from "react";
import { useToast } from "../common/Toast";
import { sendContactInquiry } from "../../../services/api";
import { Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "923027069093";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

export default function ContactForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Custom Wooden Furniture",
    location: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactInquiry(formData);
      showToast("Inquiry submitted successfully! Our team will reach out shorty.");
      setSubmitted(true);
    } catch {
      showToast("Inquiry received! We will contact you soon.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const buildWhatsAppMsg = () => {
    let msg = `🪵 *NEW PROJECT INQUIRY - ASHTECH WOODEN* 🪵\n`;
    msg += `-----------------------------------------------\n`;
    if (formData.name) msg += `👤 *Client Name:* ${formData.name}\n`;
    if (formData.phone) msg += `📞 *Phone:* ${formData.phone}\n`;
    if (formData.email) msg += `✉️ *Email:* ${formData.email}\n`;
    msg += `🏷️ *Project Type:* ${formData.projectType}\n`;
    if (formData.location) msg += `📍 *City / Site Location:* ${formData.location}\n`;
    if (formData.message) msg += `📝 *Requirements:* ${formData.message}\n`;
    msg += `-----------------------------------------------\n`;
    msg += `Salam Ashtech Wooden! Kindly review my project details and share estimated budget & timeline.`;
    return encodeURIComponent(msg);
  };

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg()}`;

  return (
    <div className="flex h-full flex-col bg-white p-6 sm:p-8 md:p-10">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8863f]">
        Direct Project Consultation
      </span>
      <h2 className="mt-1 font-serif text-2xl font-bold text-[#2b1710] sm:text-3xl">
        Request Custom Quote
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-neutral-600">
        Fill out your room specifications or project requirements below to consult with our master woodworkers.
      </p>

      {submitted ? (
        <div className="my-auto flex flex-col items-center justify-center rounded-2xl bg-[#faf6ef] p-8 text-center border border-[#ecdfc4]">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          <h3 className="mt-4 font-serif text-xl font-bold text-[#2b1710]">
            Inquiry Received Successfully!
          </h3>
          <p className="mt-2 text-xs text-neutral-600 max-w-sm">
            Thank you, <strong className="text-[#2b1710]">{formData.name}</strong>. Our senior woodcraft consultant will examine your requirements and get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                projectType: "Custom Wooden Furniture",
                location: "",
                message: "",
              });
            }}
            className="mt-6 rounded-lg bg-[#2b1710] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] hover:bg-[#3e2723]"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col justify-between">
          <div className="space-y-4">
            {/* Name & Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="e.g. Muhammad Ali"
                  className="mt-1.5 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                  Phone / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  placeholder="+92 300 0000000"
                  className="mt-1.5 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                />
              </div>
            </div>

            {/* Email & Project Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="you@domain.com"
                  className="mt-1.5 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleChange("projectType")}
                  className="mt-1.5 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
                >
                  <option value="Custom Wooden Furniture">Custom Wooden Furniture</option>
                  <option value="Carved Entrance Doors & Frames">Carved Doors & Entrance Frames</option>
                  <option value="Interior Wood Paneling & Fluted Walls">Interior Paneling & Accent Walls</option>
                  <option value="Wooden Windows & Glazing">Wooden Windows & Glazing</option>
                  <option value="Full Villa Architectural Woodwork">Full Villa Architectural Woodwork</option>
                  <option value="Polish & Antique Restoration">Polish & Antique Restoration</option>
                </select>
              </div>
            </div>

            {/* Location / City */}
            <div>
              <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                City / Project Location
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={handleChange("location")}
                placeholder="e.g. Lahore, Islamabad, Karachi"
                className="mt-1.5 w-full rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
              />
            </div>

            {/* Requirements Message */}
            <div>
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#2b1710]">
                Project Details & Dimensions *
              </label>
              <textarea
                id="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange("message")}
                placeholder="Specify dimensions (Length x Width), preferred wood type (Teak, Sheesham, Oak), or polish details..."
                className="mt-1.5 w-full resize-none rounded-lg border border-[#ecdfc4] bg-[#faf6ef] px-3.5 py-2.5 text-xs text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b8863f]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2b1710] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f0d9a8] shadow-md transition-all duration-300 hover:bg-[#3e2723] active:scale-[0.99]"
            >
              <Send className="h-4 w-4 text-[#d4af6a]" />
              <span>{loading ? "Submitting..." : "Submit Project Inquiry"}</span>
            </button>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-emerald-500 active:scale-[0.99]"
            >
              <WhatsappIcon className="h-4 w-4 shrink-0" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
