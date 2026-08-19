import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaInstagram,
  FaEnvelope,
  FaTimes,
  FaCommentDots,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/923027069093?text=Salam%20Ashtech%20Wooden!%20I%20have%20an%20inquiry%20regarding%20custom%20wooden%20furniture.",
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
    href: "mailto:info@woodshala.com",
    icon: FaEnvelope,
    color: "bg-[#ff4057] hover:bg-[#ed3047] shadow-[#ff4057]/30",
  },
];

export default function FloatingSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
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
      {/* =====================================================
          SOCIAL ICONS
          Only icons - NO LABELS
      ====================================================== */}
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

      {/* =====================================================
          MAIN FLOATING BUTTON
      ====================================================== */}
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
        {/* =================================================
            CONTACT US
            Only visible on main button hover
            Only when menu is closed
        ================================================== */}
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

        {/* =================================================
            MESSAGE ICON
        ================================================== */}
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

        {/* =================================================
            CLOSE ICON
        ================================================== */}
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

        {/* =================================================
            NOTIFICATION DOT
        ================================================== */}
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
  );
}
