"use client";

import { useState } from "react";
import { 
  FaFacebookF, 
  FaYoutube, 
  FaChevronDown 
} from "react-icons/fa";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { BsTelephone, BsEnvelope, BsGeoAlt, BsClock } from "react-icons/bs";

/**
 * TopBar — the slim utility strip above the main navbar.
 *
 * Spec:
 *  - Size: 1521px x 46px
 */
export default function TopBar() {
  const [lang, setLang] = useState("English");
  const [open, setOpen] = useState(false);

  const languages = ["English", "Français", "العربية"];

  return (
    <div 
      className="w-full"
      style={{
        height: "46px",
        boxSizing: "border-box",
        backgroundColor: "#E4C1B1",
        borderBottom: "1px solid rgb(205, 174, 159)",
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1521px] items-center justify-between px-[50px] text-[13px]">
        {/* Social icons — left */}
        <div className="flex items-center justify-between" style={{ width: "144px", height: "25px" }}>
          <a
            href="#"
            aria-label="Facebook"
            className="text-white transition-colors hover:text-black"
          >
            <FaFacebookF size={15} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-white transition-colors hover:text-black"
          >
            <RiInstagramFill size={16} />
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="text-white transition-colors hover:text-black"
          >
            <RiWhatsappFill size={16} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-white transition-colors hover:text-black"
          >
            <FaYoutube size={16} />
          </a>
        </div>

        {/* Contact info — right */}
        <div 
          className="flex items-center gap-[34px]"
          style={{
            position: "relative",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            letterSpacing: "0.05em",
            fontFamily: "Inter, sans-serif",
            color: "#574943"
          }}
        >
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <BsTelephone size={11} color="black" />
            <span>+123 456 7890</span>
          </a>

          <a
            href="mailto:info@luchiana.com"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <BsEnvelope size={11} color="black" />
            <span>info@luchiana.com</span>
          </a>

          <a 
            href="#"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <BsGeoAlt size={11} color="black" />
            <span>25 West 21th Street, Miami FL, USA</span>
          </a>

          <a 
            href="#"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <BsClock size={11} color="black" />
            <span>Mon-Fri: 10:00 - 18:00</span>
          </a>

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="group flex items-center gap-1 transition-colors hover:text-black"
            >
              <span>{lang}</span>
              <FaChevronDown size={11} color="black" className="transition-colors group-hover:text-black" />
            </button>

            {open && (
              <ul className="absolute right-0 top-[28px] z-10 min-w-[120px] rounded-sm bg-white py-1 text-[#5b4a40] shadow-md">
                {languages.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => {
                        setLang(l);
                        setOpen(false);
                      }}
                      className="block w-full px-3 py-1 text-left hover:bg-[#f5e9e3]"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
