"use client";

import {
  FaFacebookF,
  FaYoutube
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
  return (
    <div
      className="w-full"
      style={{
        height: "46px",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="mx-auto flex h-full w-full items-center justify-between px-[15px] md:px-[50px] text-[13px]">
        {/* Social icons — left */}
        <div className="flex items-center gap-4 sm:gap-[28px]" style={{ minWidth: "fit-content" }}>
          <a
            href="#"
            aria-label="Facebook"
            className="text-white hover:text-[#1877f2] hover-scale-sm transition-colors"
          >
            <FaFacebookF size={15} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-white hover:text-[#e1306c] hover-scale-sm transition-colors"
          >
            <RiInstagramFill size={16} />
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="text-white hover:text-[#25D366] hover-scale-sm transition-colors"
          >
            <RiWhatsappFill size={16} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-white hover:text-[#ff0000] hover-scale-sm transition-colors"
          >
            <FaYoutube size={16} />
          </a>
        </div>

        {/* Contact info — right (hidden on mobile, visible on lg+) */}
        <div
          className="hidden lg:flex items-center gap-[34px]"
          style={{
            position: "relative",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "15px",
            letterSpacing: "0.05em",
            fontFamily: "Inter, sans-serif",
            color: "#ffffff"
          }}
        >
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 hover-link-slide hover-lift-sm text-white"
          >
            <BsTelephone size={11} color="white" />
            <span>+123 456 7890</span>
          </a>

          <a
            href="mailto:info@luchiana.com"
            className="flex items-center gap-2 hover-link-slide hover-lift-sm text-white"
          >
            <BsEnvelope size={11} color="white" />
            <span>info@luchiana.com</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 hover-link-slide hover-lift-sm text-white"
          >
            <BsGeoAlt size={11} color="white" />
            <span>25 West 21th Street, Miami FL, USA</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 hover-link-slide hover-lift-sm text-white"
          >
            <BsClock size={11} color="white" />
            <span>Mon-Fri: 10:00 - 18:00</span>
          </a>
        </div>

        {/* Mobile-only: phone */}
        <div
          className="flex lg:hidden items-center gap-3 sm:gap-4"
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "15px",
            letterSpacing: "0.05em",
            fontFamily: "Inter, sans-serif",
            color: "#ffffff"
          }}
        >
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70 text-white"
          >
            <BsTelephone size={11} color="white" />
            <span className="hidden sm:inline">+123 456 7890</span>
          </a>
        </div>
      </div>
    </div>
  );
}
