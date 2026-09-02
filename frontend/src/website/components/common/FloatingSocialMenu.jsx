import { useState } from "react";
import {
  FaWhatsapp,
  FaTimes,
  FaRobot,
} from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const WHATSAPP_NUMBER = "923008543635";

// Chatbot response logic
const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return "Hello! 👋 Welcome to Art By Adeel. How can I assist you with our premium woodwork services?";
  }
  
  if (msg.includes("service") || msg.includes("offer")) {
    return "We offer a wide range of services including:\n• Custom Furniture Design\n• Wall & Ceiling Solutions\n• Doors & Windows\n• Space Planning & Visualisation\n• Renovation & Fit-out\n• Wood Polishing & Restoration\n\nWhich service are you interested in?";
  }
  
  if (msg.includes("wood") || msg.includes("timber") || msg.includes("material")) {
    return "We work with premium hardwoods including:\n• Burma & Plantation Teak\n• Pure Sheesham (Rosewood)\n• American Red & White Oak\n\nEach wood type is carefully selected for durability and beauty. Would you like to know more about any specific type?";
  }
  
  if (msg.includes("quote") || msg.includes("price") || msg.includes("cost")) {
    return "I'd be happy to help you with a quote! 🎯\n\nPlease visit our Quote page at https://artbyadeel.com/get-quote or WhatsApp us directly for a personalized estimate.\n\nWould you like me to connect you with a specialist?";
  }
  
  if (msg.includes("gallery") || msg.includes("project") || msg.includes("portfolio")) {
    return "You can view our stunning portfolio and gallery here:\n👉 https://artbyadeel.com/gallery\n\nWe have completed over 100+ custom projects! Would you like to see specific types of projects?";
  }
  
  if (msg.includes("door") || msg.includes("window")) {
    return "Our custom doors and windows are crafted with precision using premium hardwoods. We offer:\n• Solid wooden doors\n• Window frames & mouldings\n• Hand-carved designs\n• Weather-resistant finishing\n\nWould you like to schedule a consultation?";
  }
  
  if (msg.includes("furniture") || msg.includes("table") || msg.includes("bed")) {
    return "Our custom furniture pieces are truly one-of-a-kind! We create:\n• Dining tables\n• Bed sets\n• Custom cabinetry\n• Statement pieces\n\nWe can design and craft exactly what you have in mind. What style are you looking for?";
  }
  
  if (msg.includes("thank")) {
    return "You're most welcome! 😊 Is there anything else I can help you with?";
  }
  
  if (msg.includes("bye") || msg.includes("goodbye")) {
    return "Thank you for visiting Art By Adeel! 🎨 Feel free to reach out anytime. Have a great day!";
  }
  
  // Default response
  return "Thank you for your message! 😊 I'd love to help you with that. Could you please provide more details about what you're looking for? You can also WhatsApp us directly at +92 300 8543635 for immediate assistance.";
};

export default function FloatingSocialMenu() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hey Sir! Welcome to Art By Adeel. How can I help you today?\n\nYou can ask me about our services, wood types, request a quote, or explore our gallery.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isDarkMode } = useDarkMode();

  const toggleChatbot = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatbotOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = inputMessage.trim();
    setMessages((prev) => [...prev, { type: "user", text: userMsg }]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response after 1 second
    setTimeout(() => {
      const botResponse = getBotResponse(userMsg);
      setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickReply = (text) => {
    setInputMessage(text);
    // Auto-send after setting the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const whatsappMessage = encodeURIComponent(
    "Hey Sir!\n\nI hope you're doing well. I came across Art By Adeel and would love to inquire about your premium woodwork services. I'm interested in bespoke wooden furniture and architectural interior solutions.\n\nCould you please share more details or let me know a convenient time for a quick consultation?\n\nLooking forward to hearing from you!"
  );

  return (
    <>
      {/* Floating Icons Container */}
      <div
        className="
          fixed
          bottom-5
          right-4
          z-[100]
          flex
          flex-col
          items-center
          gap-3
          sm:bottom-6
          sm:right-6
          md:bottom-7
          md:right-7
          lg:bottom-8
          lg:right-8
        "
      >
        {/* Chatbot Icon */}
        <button
          onClick={toggleChatbot}
          aria-label="Chatbot"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#6C63FF]
            to-[#3F3D9E]
            text-white
            shadow-lg
            shadow-[#6C63FF]/30
            transition-all
            duration-300
            ease-out
            hover:scale-110
            hover:shadow-xl
            active:scale-95
            sm:h-14
            sm:w-14
          "
        >
          <FaRobot className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        {/* WhatsApp Icon */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            shadow-lg
            shadow-[#25D366]/30
            transition-all
            duration-300
            ease-out
            hover:scale-110
            hover:shadow-xl
            active:scale-95
            sm:h-14
            sm:w-14
          "
        >
          <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
        </a>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div
          className={`
            fixed
            bottom-28
            right-4
            z-[101]
            w-[320px]
            sm:w-[380px]
            md:w-[400px]
            lg:w-[420px]
            rounded-2xl
            shadow-2xl
            border
            overflow-hidden
            animate-in
            slide-in-from-bottom-4
            duration-300
            sm:bottom-32
            transition-colors
            duration-300
            ${
              isDarkMode
                ? "bg-[#1a1410] border-[#2a1f18]"
                : "bg-white border-gray-200"
            }
          `}
        >
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-[#6C63FF] to-[#3F3D9E] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                <FaRobot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Art By Adeel AI</h3>
                <p className="text-white/70 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Chatbot Body */}
          <div className="h-[400px] flex flex-col">
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 ${
              isDarkMode ? "bg-[#1a1410]" : "bg-white"
            }`}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    msg.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.type === "bot" && (
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                      isDarkMode ? "bg-[#6C63FF]/20" : "bg-[#6C63FF]/10"
                    }`}>
                      <FaRobot className={`h-3.5 w-3.5 ${
                        isDarkMode ? "text-[#6C63FF]" : "text-[#6C63FF]"
                      }`} />
                    </div>
                  )}
                  <div
                    className={`${
                      msg.type === "bot"
                        ? isDarkMode
                          ? "bg-[#2a1f18] text-[#e8ddd0] rounded-lg rounded-tl-none"
                          : "bg-gray-100 text-gray-800 rounded-lg rounded-tl-none"
                        : "bg-[#6C63FF] text-white rounded-lg rounded-tr-none"
                    } px-4 py-2 max-w-[85%]`}
                  >
                    <p className={`text-sm whitespace-pre-line ${
                      msg.type === "user" ? "text-white" : isDarkMode ? "text-[#e8ddd0]" : "text-gray-800"
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                    isDarkMode ? "bg-[#6C63FF]/20" : "bg-[#6C63FF]/10"
                  }`}>
                    <FaRobot className="h-3.5 w-3.5 text-[#6C63FF]" />
                  </div>
                  <div className={`rounded-lg rounded-tl-none px-4 py-2 ${
                    isDarkMode ? "bg-[#2a1f18]" : "bg-gray-100"
                  }`}>
                    <div className="flex gap-1">
                      <span className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-[#a89888]" : "bg-gray-500"
                      }`} style={{ animationDelay: "0ms" }}></span>
                      <span className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-[#a89888]" : "bg-gray-500"
                      }`} style={{ animationDelay: "150ms" }}></span>
                      <span className={`w-2 h-2 rounded-full animate-bounce ${
                        isDarkMode ? "bg-[#a89888]" : "bg-gray-500"
                      }`} style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reply Buttons */}
            {messages.length < 3 && (
              <div className={`px-4 pb-2 flex flex-wrap gap-2 ${
                isDarkMode ? "bg-[#1a1410]" : "bg-white"
              }`}>
                <button
                  onClick={() => handleQuickReply("What services do you offer?")}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-[#6C63FF]/20 text-[#6C63FF] hover:bg-[#6C63FF]/30"
                      : "bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => handleQuickReply("Tell me about the wood types")}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-[#6C63FF]/20 text-[#6C63FF] hover:bg-[#6C63FF]/30"
                      : "bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20"
                  }`}
                >
                  Wood Types
                </button>
                <button
                  onClick={() => handleQuickReply("I want a quote")}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-[#6C63FF]/20 text-[#6C63FF] hover:bg-[#6C63FF]/30"
                      : "bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20"
                  }`}
                >
                  Get Quote
                </button>
                <button
                  onClick={() => handleQuickReply("Show me your gallery")}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-[#6C63FF]/20 text-[#6C63FF] hover:bg-[#6C63FF]/30"
                      : "bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20"
                  }`}
                >
                  Gallery
                </button>
              </div>
            )}

            {/* Chatbot Input */}
            <div className={`border-t p-3 ${
              isDarkMode ? "border-[#2a1f18]" : "border-gray-200"
            }`}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 text-sm rounded-full px-4 py-2 outline-none focus:ring-1 transition-colors ${
                    isDarkMode
                      ? "bg-[#2a1f18] border-[#2a1f18] text-[#e8ddd0] placeholder-[#a89888] focus:border-[#6C63FF] focus:ring-[#6C63FF]"
                      : "bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#6C63FF] focus:ring-[#6C63FF]"
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`bg-[#6C63FF] text-white rounded-full p-2 transition-colors ${
                    inputMessage.trim() ? "hover:bg-[#5A52E0]" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              <p className={`text-[10px] mt-1.5 text-center ${
                isDarkMode ? "text-[#a89888]" : "text-gray-400"
              }`}>
                Powered by AI • Responses are automated
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}