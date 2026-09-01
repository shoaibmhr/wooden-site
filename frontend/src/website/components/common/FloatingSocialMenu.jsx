import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaEnvelope,
  FaTimes,
  FaCommentDots,
  FaRobot,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Chatbot",
    href: "#",
    icon: FaRobot,
    color: "bg-gradient-to-br from-[#6C63FF] to-[#3F3D9E] shadow-[#6C63FF]/30",
    isChatbot: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923008543635?text=Hey%20Sir!%20I%20hope%20you're%20doing%20well.%20I%20came%20across%20Art%20By%20Adeel%20and%20would%20love%20to%20inquire%20about%20your%20premium%20woodwork%20services.%20I'm%20interested%20in%20bespoke%20wooden%20furniture%20and%20architectural%20interior%20solutions.%20Could%20you%20please%20share%20more%20details%20or%20let%20me%20know%20a%20convenient%20time%20for%20a%20quick%20consultation%3F%20Looking%20forward%20to%20hearing%20from%20you!",
    icon: FaWhatsapp,
    color: "bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/30",
  },
  {
    name: "Messenger",
    href: "https://m.me/your-page",
    icon: FaFacebookMessenger,
    color:
      "bg-gradient-to-br from-[#0099FF] via-[#7B2FFF] to-[#C135FF] shadow-[#7B2FFF]/30",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/your-page",
    icon: FaInstagram,
    color:
      "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] shadow-[#DD2A7B]/30",
  },
  {
    name: "Email",
    href: "mailto:info@artbyadeel.com",
    icon: FaEnvelope,
    color: "bg-[#ff4057] hover:bg-[#ed3047] shadow-[#ff4057]/30",
  },
];

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
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hey Sir! 👋 Welcome to Art By Adeel. How can I help you today?\n\nYou can ask me about our services, wood types, request a quote, or explore our gallery.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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

  return (
    <>
      {/* Floating Social Menu */}
      <div
        className="
          fixed
          bottom-5
          right-4
          z-[100]
          sm:bottom-6
          sm:right-6
          md:bottom-7
          md:right-7
          lg:bottom-8
          lg:right-8
        "
      >
        {/* Social Links Container */}
        <div
          className="
            absolute
            bottom-[4.5rem]
            right-0
            flex
            flex-col
            items-center
            gap-3
            sm:bottom-20
            sm:gap-4
          "
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            if (social.isChatbot) {
              return (
                <button
                  key={social.name}
                  onClick={toggleChatbot}
                  aria-label={social.name}
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    shadow-lg

                    transition-all
                    duration-300
                    ease-out

                    hover:scale-110
                    active:scale-95

                    sm:h-10
                    sm:w-10

                    ${
                      isOpen
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-4 scale-90 opacity-0"
                    }

                    ${social.color}
                  `}
                  style={{
                    transitionDelay: isOpen
                      ? `${index * 70}ms`
                      : `${(socialLinks.length - index - 1) * 50}ms`,
                  }}
                >
                  <Icon
                    className="
                      h-6
                      w-6
                      transition-transform
                      duration-200
                      hover:scale-110

                      sm:h-7
                      sm:w-7
                    "
                  />
                </button>
              );
            }

            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  shadow-lg

                  transition-all
                  duration-300
                  ease-out

                  hover:scale-110
                  active:scale-95

                  sm:h-10
                  sm:w-10

                  ${
                    isOpen
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none translate-y-4 scale-90 opacity-0"
                  }

                  ${social.color}
                `}
                style={{
                  transitionDelay: isOpen
                    ? `${index * 70}ms`
                    : `${(socialLinks.length - index - 1) * 50}ms`,
                }}
              >
                <Icon
                  className="
                    h-6
                    w-6
                    transition-transform
                    duration-200
                    hover:scale-110

                    sm:h-7
                    sm:w-7
                  "
                />
              </a>
            );
          })}
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isOpen}
          className={`
            group
            relative
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-white
            shadow-xl

            transition-all
            duration-300
            ease-out

            hover:scale-105
            active:scale-95

            focus:outline-none
            focus:ring-2
            focus:ring-offset-2

            sm:h-10
            sm:w-10

            ${
              isOpen
                ? `
                  bg-[#713535]
                  shadow-[#713535]/30
                  focus:ring-[#713535]
                `
                : `
                  bg-[#25D366]
                  shadow-[#25D366]/30
                  focus:ring-[#25D366]
                `
            }
          `}
        >
          {!isOpen && (
            <span
              className="
                pointer-events-none
                absolute
                right-[calc(100%+0.75rem)]
                top-1/2

                hidden
                -translate-y-1/2
                translate-x-2

                whitespace-nowrap
                rounded-lg
                bg-neutral-900
                px-3
                py-2

                text-xs
                font-semibold
                text-white

                opacity-0
                shadow-lg

                transition-all
                duration-300
                ease-out

                group-hover:translate-x-0
                group-hover:opacity-100

                sm:block
              "
            >
              Contact Us
            </span>
          )}

          <FaCommentDots
            className={`
              absolute
              h-6
              w-6

              transition-all
              duration-300
              ease-out

              sm:h-7
              sm:w-7

              ${
                isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }
            `}
          />

          <FaTimes
            className={`
              absolute
              h-6
              w-6

              transition-all
              duration-300
              ease-out

              sm:h-7
              sm:w-7

              ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }
            `}
          />

          {!isOpen && (
            <span
              className="
                absolute
                right-0.5
                top-0.5

                h-3
                w-3

                rounded-full
                border-2
                border-white
                bg-red-500

                sm:right-1
                sm:top-1
              "
            />
          )}
        </button>
      </div>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div
          className="
            fixed
            bottom-24
            right-4
            z-[101]
            w-[320px]
            sm:w-[380px]
            md:w-[400px]
            lg:w-[420px]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
            animate-in
            slide-in-from-bottom-4
            duration-300
          "
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
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    msg.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.type === "bot" && (
                    <div className="h-7 w-7 rounded-full bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                      <FaRobot className="h-3.5 w-3.5 text-[#6C63FF]" />
                    </div>
                  )}
                  <div
                    className={`${
                      msg.type === "bot"
                        ? "bg-gray-100 rounded-lg rounded-tl-none"
                        : "bg-[#6C63FF] text-white rounded-lg rounded-tr-none"
                    } px-4 py-2 max-w-[85%]`}
                  >
                    <p className={`text-sm ${msg.type === "user" ? "text-white" : "text-gray-800"} whitespace-pre-line`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                    <FaRobot className="h-3.5 w-3.5 text-[#6C63FF]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-tl-none px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reply Buttons */}
            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickReply("What services do you offer?")}
                  className="text-xs bg-[#6C63FF]/10 text-[#6C63FF] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/20 transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => handleQuickReply("Tell me about the wood types")}
                  className="text-xs bg-[#6C63FF]/10 text-[#6C63FF] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/20 transition-colors"
                >
                  Wood Types
                </button>
                <button
                  onClick={() => handleQuickReply("I want a quote")}
                  className="text-xs bg-[#6C63FF]/10 text-[#6C63FF] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/20 transition-colors"
                >
                  Get Quote
                </button>
                <button
                  onClick={() => handleQuickReply("Show me your gallery")}
                  className="text-xs bg-[#6C63FF]/10 text-[#6C63FF] px-3 py-1.5 rounded-full hover:bg-[#6C63FF]/20 transition-colors"
                >
                  Gallery
                </button>
              </div>
            )}

            {/* Chatbot Input */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]"
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
              <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                Powered by AI • Responses are automated
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}