import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const WHATSAPP_NUMBER = "923008543635";

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3.9A10 10 0 0 0 3.6 16.4L2 22l5.7-1.5A10 10 0 1 0 20 3.9Zm-8 16.6a8.4 8.4 0 0 1-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3A8.5 8.5 0 1 1 12 20.5Zm4.6-6.4c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1a6.9 6.9 0 0 1-3.5-3c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5L8.6 7.3c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const NAME_REGEX = /^[A-Za-z\s.'-]{3,50}$/;
const PHONE_REGEX = /^[+]?[\d\s-]{10,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Custom Wooden Furniture",
    location: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const buildWhatsAppMsg = () => {
    let msg = `NEW PROJECT INQUIRY - Art By Adeel\n`;
    msg += `------------------------------------------\n`;
    if (formData.name) msg += `Client Name: ${formData.name}\n`;
    if (formData.phone) msg += `Phone: ${formData.phone}\n`;
    if (formData.email) msg += `Email: ${formData.email}\n`;
    msg += `Project Type: ${formData.projectType}\n`;
    if (formData.location)
      msg += `City / Site Location: ${formData.location}\n`;
    if (formData.message) msg += `Requirements: ${formData.message}\n`;
    msg += `------------------------------------------\n`;
    msg += `Hello Art By Adeel, kindly review my project details and share the estimated budget and timeline.`;
    return encodeURIComponent(msg);
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) {
      return "Please enter your full name.";
    }
    if (!NAME_REGEX.test(name)) {
      return "Please enter a valid full name (at least 3 letters, no numbers).";
    }

    if (!phone) {
      return "Please enter your phone number.";
    }
    const digitsOnly = phone.replace(/[^\d]/g, "");
    if (!PHONE_REGEX.test(phone) || digitsOnly.length < 10) {
      return "Please enter a valid phone number (at least 10 digits).";
    }

    if (email && !EMAIL_REGEX.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!message) {
      return "Please describe your project details.";
    }
    if (message.length < 10) {
      return "Please provide a bit more detail about your project (at least 10 characters).";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg()}`;
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex h-full flex-col p-6 sm:p-8 md:p-10 transition-colors duration-300 ${
      isDarkMode ? "bg-[#1a1410]" : "bg-white"
    }`}>
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        isDarkMode ? "text-[#c9974a]" : "text-[#b8863f]"
      }`}>
        Direct Project Consultation
      </span>
      <h2 className={`mt-1 font-serif text-2xl font-bold sm:text-3xl ${
        isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
      }`}>
        Request Custom Quote
      </h2>
      <p className={`mt-2 text-xs sm:text-sm ${
        isDarkMode ? "text-[#a89888]" : "text-neutral-600"
      }`}>
        Fill out your room specifications or project requirements below to
        consult with our master woodworkers.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-1 flex-col justify-between"
      >
        <div className="space-y-4">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
                }`}
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="e.g. Muhammad Ali"
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                    : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 placeholder-neutral-400 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
                }`}
              >
                Phone / WhatsApp *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder="+92 300 0000000"
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                    : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 placeholder-neutral-400 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
                }`}
              />
            </div>
          </div>

          {/* Email & Project Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="you@domain.com"
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                    : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 placeholder-neutral-400 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="projectType"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
                }`}
              >
                Project Type
              </label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={handleChange("projectType")}
                className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                    : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
                }`}
              >
                <option value="Custom Wooden Furniture">
                  Custom Wooden Furniture
                </option>
                <option value="Carved Entrance Doors & Frames">
                  Carved Doors & Entrance Frames
                </option>
                <option value="Interior Wood Paneling & Fluted Walls">
                  Interior Paneling & Accent Walls
                </option>
                <option value="Wooden Windows & Glazing">
                  Wooden Windows & Glazing
                </option>
                <option value="Full Villa Architectural Woodwork">
                  Full Villa Architectural Woodwork
                </option>
                <option value="Polish & Antique Restoration">
                  Polish & Antique Restoration
                </option>
              </select>
            </div>
          </div>

          {/* Location / City */}
          <div>
            <label
              htmlFor="location"
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
              }`}
            >
              City / Project Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={handleChange("location")}
              placeholder="e.g. Lahore, Islamabad, Karachi"
              className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                  : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 placeholder-neutral-400 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
              }`}
            />
          </div>

          {/* Requirements Message */}
          <div>
            <label
              htmlFor="message"
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? "text-[#e8ddd0]" : "text-[#2b1710]"
              }`}
            >
              Project Details & Dimensions *
            </label>
            <textarea
              id="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange("message")}
              placeholder="Specify dimensions (Length x Width), preferred wood type (Teak, Sheesham, Oak), or polish details..."
              className={`mt-1.5 w-full resize-none rounded-lg border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 transition-colors duration-300 ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#c9974a] focus:bg-[#2a1f18] focus:ring-[#c9974a]"
                  : "border-[#ecdfc4] bg-[#faf6ef] text-neutral-900 placeholder-neutral-400 focus:border-[#b8863f] focus:bg-white focus:ring-[#b8863f]"
              }`}
            />
          </div>

          {/* Inline error message */}
          {errorMessage && (
            <div className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-300 ${
              isDarkMode
                ? "border-red-800/50 bg-red-900/20 text-red-400"
                : "border-red-200 bg-red-50 text-red-700"
            }`}>
              <svg
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10v-3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="flex-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-emerald-500 active:scale-[0.99]"
          >
            <WhatsappIcon className="h-4 w-4 shrink-0" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}