import { useState } from "react";
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

const WHATSAPP_NUMBER = "923027069093"; // apna business number yahan daalo (country code ke sath, + ke bina)

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
    "*New Custom Quote Request*",
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
    "_(Reference image will be attached in this chat)_",
  ];

  return lines.filter(Boolean).join("\n");
}

export default function QuoteForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState("");

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
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-stone-200 bg-white p-5 sm:p-7 md:p-9 shadow-sm">
      <h2 className="font-serif text-stone-900 text-xl sm:text-2xl md:text-3xl tracking-tight">
        Tell Us What You Need
      </h2>
      <p className="mt-2 text-stone-500 text-sm sm:text-base leading-relaxed">
        Fill in the details below and we'll open WhatsApp with your request
        ready to send.
      </p>

      {errorMsg && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs sm:text-sm font-semibold text-rose-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Full Name *
            </label>
            <div className="relative mt-1.5">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              WhatsApp Number *
            </label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="tel"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Email (Optional)
            </label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              City (Optional)
            </label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Sargodha"
                className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bulk Order Toggle */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="isBulkOrder"
              checked={formData.isBulkOrder}
              onChange={handleChange}
              className="h-4 w-4 rounded border-stone-300 text-[#5C2A2A] focus:ring-[#5C2A2A]/20"
            />
            <span className="text-sm font-semibold text-stone-700">
              This is a Bulk / Wholesale Order
            </span>
          </label>

          {formData.isBulkOrder && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700">
                  Business / Organization Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Grand Hotel Sargodha"
                  className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white py-2.5 px-3.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-stone-700">
                  Quantity Required
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50 chairs"
                  className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white py-2.5 px-3.5 text-sm text-stone-900 placeholder-stone-400 focus:border-[#5C2A2A] focus:ring-2 focus:ring-[#5C2A2A]/10 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Product Type *
            </label>
            <div className="relative mt-1.5">
              <Package className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <select
                name="productType"
                required
                value={formData.productType}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-800 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
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
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Material *
            </label>
            <div className="relative mt-1.5">
              <Trees className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <select
                name="material"
                required
                value={formData.material}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-800 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
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
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Finish *
            </label>
            <div className="relative mt-1.5">
              <Palette className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <select
                name="finish"
                required
                value={formData.finish}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-800 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
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
            <label className="block text-xs sm:text-sm font-semibold text-stone-700">
              Budget Range (Optional)
            </label>
            <div className="relative mt-1.5">
              <Wallet className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-800 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
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
        </div>

        {/* Dimensions */}
        <div>
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700">
            <Ruler className="h-3.5 w-3.5 text-stone-400" />
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
              className="w-full rounded-xl border border-stone-300 bg-stone-50/60 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
            />
            <input
              type="number"
              name="width"
              min="0"
              value={formData.width}
              onChange={handleChange}
              placeholder="Width"
              className="w-full rounded-xl border border-stone-300 bg-stone-50/60 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
            />
            <input
              type="number"
              name="height"
              min="0"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height"
              className="w-full rounded-xl border border-stone-300 bg-stone-50/60 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-stone-700">
            Describe Your Requirement *
          </label>
          <div className="relative mt-1.5">
            <FileText className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about the design, size, room, or any specific detail..."
              className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-10 pr-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#5C2A2A] outline-none transition-all"
            />
          </div>
        </div>

        {/* Reference Image Note */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            Have a reference photo? No problem — once WhatsApp opens with your
            details, simply attach the image directly in the chat.
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5C2A2A] hover:bg-[#4A2121] px-6 py-3.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 ease-out hover:tracking-[0.2em] active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          Send Request on WhatsApp
        </button>
      </form>
    </div>
  );
}
