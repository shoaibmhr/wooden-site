import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Trees,
  Palette,
  Ruler,
  Wallet,
  FileText,
  Send,
  Info,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const WHATSAPP_NUMBER = "923008543635"; // Updated WhatsApp number

const productTypes = [
  "Dining Table",
  "Wardrobe",
  "Bed",
  "Sofa",
  "Kitchen Cabinet",
  "Wooden Ceiling",
  "Wooden Flooring",
  "Other / Custom",
];

const materials = [
  "Sheesham",
  "Teak",
  "Walnut",
  "Pine",
  "Not Sure — Need Suggestion",
];

const finishes = ["Natural Wood", "Dark Walnut", "Matte", "Glossy", "Not Sure"];

const budgetRanges = [
  "Under PKR 50,000",
  "PKR 50,000 – 100,000",
  "PKR 100,000 – 200,000",
  "PKR 200,000+",
  "Not Sure Yet",
];

const initialFormData = {
  name: "",
  whatsapp: "",
  email: "",
  city: "",
  productType: "",
  material: "",
  finish: "",
  length: "",
  width: "",
  height: "",
  budget: "",
  description: "",
  isBulkOrder: false,
  businessName: "",
  quantity: "",
};

function buildWhatsAppMessage(data) {
  const lines = [
    "Hey Sir! 👋",
    "",
    "I hope you're doing well. I came across Art By Adeel and would love to inquire about your premium woodwork services.",
    "",
    "*Here are my requirements:*",
    "",
    `*Name:* ${data.name}`,
    `*WhatsApp:* ${data.whatsapp}`,
    data.email ? `*Email:* ${data.email}` : null,
    data.city ? `*City:* ${data.city}` : null,
    "",
    data.isBulkOrder ? "*Order Type:* Bulk / Wholesale Order" : null,
    data.isBulkOrder && data.businessName
      ? `*Business Name:* ${data.businessName}`
      : null,
    data.isBulkOrder && data.quantity
      ? `*Quantity Required:* ${data.quantity}`
      : null,
    "",
    `*Product Type:* ${data.productType}`,
    `*Material:* ${data.material}`,
    `*Finish:* ${data.finish}`,
    data.length || data.width || data.height
      ? `*Dimensions:* ${data.length || "-"} x ${data.width || "-"} x ${data.height || "-"} (L x W x H, inches)`
      : null,
    data.budget ? `*Budget Range:* ${data.budget}` : null,
    "",
    `*Details:* ${data.description}`,
    "",
    "I would appreciate your expert advice on this. Please let me know a suitable time for a quick consultation.",
    "",
    "_(Reference image will be attached in this chat)_",
  ];

  return lines.filter(Boolean).join("\n");
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function QuoteForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState("");
  const { isDarkMode } = useDarkMode();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setErrorMsg("Please enter your name and WhatsApp number.");
      return;
    }
    if (!formData.productType || !formData.material || !formData.finish) {
      setErrorMsg("Please select product type, material, and finish.");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg("Please describe your requirement.");
      return;
    }

    setErrorMsg("");

    const message = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`w-full max-w-3xl mx-auto rounded-2xl border p-5 sm:p-7 md:p-9 shadow-sm transition-colors duration-300 ${
        isDarkMode 
          ? "border-[#2a1f18] bg-[#1a1410]" 
          : "border-stone-200 bg-white"
      }`}
    >
      <h2 className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-tight ${
        isDarkMode ? "text-[#e8ddd0]" : "text-stone-900"
      }`}>
        Tell Us What You Need
      </h2>
      <p className={`mt-2 text-sm sm:text-base leading-relaxed ${
        isDarkMode ? "text-[#a89888]" : "text-stone-500"
      }`}>
        Fill in the details below and we'll open WhatsApp with your request
        ready to send.
      </p>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`rounded-xl border p-3.5 text-xs sm:text-sm font-semibold ${
              isDarkMode
                ? "border-rose-800/50 bg-rose-900/20 text-rose-400"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}>
              {errorMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {/* Contact Info */}
        <motion.div
          variants={fieldVariant}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Full Name *
            </label>
            <div className="relative mt-1.5">
              <User className={`absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              WhatsApp Number *
            </label>
            <div className="relative mt-1.5">
              <Phone className={`absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <input
                type="tel"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Email (Optional)
            </label>
            <div className="relative mt-1.5">
              <Mail className={`absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              City (Optional)
            </label>
            <div className="relative mt-1.5">
              <MapPin className={`absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Sargodha"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Bulk Order */}
        <motion.div
          variants={fieldVariant}
          className={`rounded-xl border p-4 transition-colors duration-300 ${
            isDarkMode 
              ? "border-[#2a1f18] bg-[#2a1f18]/30" 
              : "border-stone-200 bg-stone-50/60"
          }`}
        >
          <label className={`flex items-center gap-2.5 cursor-pointer ${
            isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
          }`}>
            <input
              type="checkbox"
              name="isBulkOrder"
              checked={formData.isBulkOrder}
              onChange={handleChange}
              className={`h-4 w-4 rounded focus:ring-2 transition-colors ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#c9974a] focus:ring-[#c9974a]/20"
                  : "border-stone-300 text-[#5C2A2A] focus:ring-[#5C2A2A]/20"
              }`}
            />
            <span className="text-sm font-semibold">
              This is a Bulk / Wholesale Order
            </span>
          </label>

          <AnimatePresence initial={false}>
            {formData.isBulkOrder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
                    }`}>
                      Business / Organization Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Grand Hotel Sargodha"
                      className={`mt-1.5 w-full rounded-xl border py-2.5 px-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                        isDarkMode
                          ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                          : "border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
                    }`}>
                      Quantity Required
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 chairs"
                      className={`mt-1.5 w-full rounded-xl border py-2.5 px-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                        isDarkMode
                          ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                          : "border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Details */}
        <motion.div
          variants={fieldVariant}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Product Type *
            </label>
            <div className="relative mt-1.5">
              <Package className={`pointer-events-none absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <select
                name="productType"
                required
                value={formData.productType}
                onChange={handleChange}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3.5 text-sm focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-800 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              >
                <option value="">Select a product</option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Material *
            </label>
            <div className="relative mt-1.5">
              <Trees className={`pointer-events-none absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <select
                name="material"
                required
                value={formData.material}
                onChange={handleChange}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3.5 text-sm focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-800 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              >
                <option value="">Select material</option>
                {materials.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Finish *
            </label>
            <div className="relative mt-1.5">
              <Palette className={`pointer-events-none absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <select
                name="finish"
                required
                value={formData.finish}
                onChange={handleChange}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3.5 text-sm focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-800 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              >
                <option value="">Select finish</option>
                {finishes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold ${
              isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
            }`}>
              Budget Range (Optional)
            </label>
            <div className="relative mt-1.5">
              <Wallet className={`pointer-events-none absolute left-3.5 top-3 h-4 w-4 ${
                isDarkMode ? "text-[#a89888]" : "text-stone-400"
              }`} />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-3.5 text-sm focus:ring-2 outline-none transition-all ${
                  isDarkMode
                    ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                    : "border-stone-300 bg-stone-50/60 text-stone-800 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
                }`}
              >
                <option value="">Select budget</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Dimensions */}
        <motion.div variants={fieldVariant}>
          <label className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold ${
            isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
          }`}>
            <Ruler className={`h-3.5 w-3.5 ${
              isDarkMode ? "text-[#a89888]" : "text-stone-400"
            }`} />
            Dimensions in inches (Optional)
          </label>
          <div className="mt-1.5 grid grid-cols-3 gap-3">
            <input
              type="number"
              name="length"
              min="0"
              value={formData.length}
              onChange={handleChange}
              placeholder="Length"
              className={`w-full rounded-xl border py-2.5 px-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                  : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
              }`}
            />
            <input
              type="number"
              name="width"
              min="0"
              value={formData.width}
              onChange={handleChange}
              placeholder="Width"
              className={`w-full rounded-xl border py-2.5 px-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                  : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
              }`}
            />
            <input
              type="number"
              name="height"
              min="0"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height"
              className={`w-full rounded-xl border py-2.5 px-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                  : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
              }`}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={fieldVariant}>
          <label className={`block text-xs sm:text-sm font-semibold ${
            isDarkMode ? "text-[#e8ddd0]" : "text-stone-700"
          }`}>
            Describe Your Requirement *
          </label>
          <div className="relative mt-1.5">
            <FileText className={`absolute left-3.5 top-3 h-4 w-4 ${
              isDarkMode ? "text-[#a89888]" : "text-stone-400"
            }`} />
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about the design, size, room, or any specific detail..."
              className={`w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-sm placeholder-stone-400 focus:ring-2 outline-none transition-all ${
                isDarkMode
                  ? "border-[#2a1f18] bg-[#1a1410] text-[#e8ddd0] placeholder-[#a89888] focus:bg-[#2a1f18] focus:border-[#c9974a] focus:ring-[#c9974a]/20"
                  : "border-stone-300 bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-[#5C2A2A]/10"
              }`}
            />
          </div>
        </motion.div>

        {/* Reference Image Note */}
        <motion.div
          variants={fieldVariant}
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 ${
            isDarkMode
              ? "border-amber-800/50 bg-amber-900/20"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <Info className={`h-4 w-4 shrink-0 mt-0.5 ${
            isDarkMode ? "text-amber-500" : "text-amber-700"
          }`} />
          <p className={`text-xs sm:text-sm leading-relaxed ${
            isDarkMode ? "text-amber-400" : "text-amber-800"
          }`}>
            Have a reference photo? No problem — once WhatsApp opens with your
            details, simply attach the image directly in the chat.
          </p>
        </motion.div>

        <motion.button
          variants={fieldVariant}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 ease-out hover:tracking-[0.2em] ${
            isDarkMode
              ? "bg-[#c9974a] hover:bg-[#b8863f]"
              : "bg-[#5C2A2A] hover:bg-[#4A2121]"
          }`}
        >
          <Send className="h-4 w-4" />
          Send Request on WhatsApp
        </motion.button>
      </motion.form>
    </motion.div>
  );
}