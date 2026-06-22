"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";

/**
 * MainNavbar — the second bar.
 * Spec: 1521px x 90px, white background.
 */
export default function MainNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 46);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "HEADERS", href: "/headers" },
    { label: "BLOG", href: "/blog" },
    { label: "PAGES", href: "/pages" },
    { label: "MEGA", href: "/mega" },
    { label: "CONTACT", href: "/contact" },
  ];

  const homeVariants = [
    { name: "MAIN", image: "/luchiana-assets/products/main.jpg" },
    { name: "NATURAL", image: "/luchiana-assets/products/natural.jpg" },
    { name: "COMPACT", image: "/luchiana-assets/products/compact.jpg" },
    { name: "BOXED", image: "/luchiana-assets/products/boxed.jpg" },
    { name: "WIDE", image: "/luchiana-assets/products/wide.jpg" },
    { name: "BRANDED", image: "/luchiana-assets/products/branded.jpg" },
    { name: "ORGANIC", image: "/luchiana-assets/products/organic.jpg" },
    { name: "SALON", image: "/luchiana-assets/products/salon.jpg" },
  ];

  return (
    <>
      <div className={`w-full bg-white transition-all duration-300 ${isSticky ? "shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b border-gray-100" : ""}`}>
        <div className="relative mx-auto flex h-[70px] md:h-[90px] w-full items-center justify-between px-4 sm:px-6 md:px-[50px] 2xl:px-[100px]">
          {/* Logo */}
          <Link href="/" aria-label="Luchiana Home" className="shrink-0">
            <svg className="w-[140px] sm:w-[170px] md:w-[205px] h-auto" viewBox="0 0 205 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="#000" fillRule="evenodd">
                <path d="M62.01 0c-2.26 0-4.215.872-5.603 2.447-1.388 1.573-2.204 3.84-2.204 6.624 0 2.783.816 5.05 2.204 6.624 1.388 1.574 3.343 2.446 5.604 2.446 3.556 0 6.465-2.144 7.123-5.777l.02-.108h-2.302l-.016.073c-.5 2.372-2.538 3.648-4.825 3.648-1.563 0-2.953-.604-3.955-1.765-1.002-1.161-1.62-2.888-1.62-5.141 0-2.254.618-3.98 1.62-5.142 1.002-1.16 2.392-1.765 3.955-1.765 2.287 0 4.324 1.276 4.825 3.648l.016.073h2.301l-.02-.108C68.478 2.144 65.568 0 62.012 0zM2.3.239H0v17.663h10.426V15.84H2.3zM27.596.239h-2.3v11.665c0 1.816.679 3.395 1.883 4.518 1.204 1.124 2.926 1.787 5.002 1.787 2.077 0 3.799-.663 5.003-1.787 1.204-1.123 1.883-2.702 1.883-4.518V.24h-2.301v11.494c0 1.259-.432 2.335-1.216 3.096-.784.762-1.93 1.216-3.369 1.216-1.44 0-2.584-.454-3.369-1.216-.784-.761-1.216-1.837-1.216-3.096V.24zM117.531.239h-2.301v17.663h2.301z" fillRule="nonzero" />
                <path d="M140.624.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95h2.416L140.624.24zM136.73 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
                <path fillRule="nonzero" d="M163.573.239h-2.188v17.663h2.301V4.18h.03l9.525 13.723h2.188V.24h-2.266v13.758h-.031z" />
                <path d="M198.514.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95H205L198.514.24zM194.62 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
                <path fillRule="nonzero" d="M87.376.241h-2.3v17.663h2.3v-7.8h9.443v7.8h2.301V.241h-2.3v7.8h-9.444z" />
              </g>
            </svg>
          </Link>

          {/* Nav links — desktop */}
          <ul className="hidden lg:flex items-center h-full text-[#1a1a1a] mr-[30px]">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="group flex items-center h-full"
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: 1.14,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  margin: "0 20px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Link href={link.href} className="hover:text-[#8c6f63] transition-colors flex items-center h-full">
                  {link.label}
                </Link>

                {/* Mega Menu for HOME */}
                {link.label === "HOME" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-[1160px] h-[229px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default"
                  >
                    <div className="flex items-center justify-center gap-[30px] w-full h-full px-10">
                      {homeVariants.map((v) => (
                        <Link href="/" key={v.name} className="flex flex-col items-center gap-[15px]">
                          <div className="w-[89px] h-[98px] relative border border-transparent hover:border-black transition-colors bg-gray-50">
                            <Image src={v.image} alt={v.name} fill style={{ objectFit: "cover" }} />
                          </div>
                          <span
                            className="text-[12px] text-[#1a1a1a] hover:text-[#8c6f63] transition-colors"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
                          >
                            {v.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-3 sm:gap-6 text-black">
            <button aria-label="Search" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="hidden sm:block transition-all duration-200 hover:scale-125 hover:opacity-70">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Wishlist" className="hidden sm:block transition-all duration-200 hover:scale-125 hover:opacity-70">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Cart" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Menu"
              className="lg:hidden transition-all duration-200 hover:scale-125 hover:opacity-70"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/50 transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[201] h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 h-[70px] border-b border-gray-100">
          <span
            className="text-[14px] font-medium tracking-[0.15em] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-[14px] font-medium tracking-[0.13em] uppercase text-[#1a1a1a] hover:text-[#8c6f63] transition-colors border-b border-gray-50"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile-only icons (Account, Wishlist) */}
        <div className="sm:hidden px-6 pt-2 flex items-center gap-6 border-t border-gray-100 py-4">
          <button aria-label="Account" className="flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase text-[#1a1a1a] hover:text-[#8c6f63] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            <User size={18} strokeWidth={1.5} />
            <span>Account</span>
          </button>
          <button aria-label="Wishlist" className="flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase text-[#1a1a1a] hover:text-[#8c6f63] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            <Heart size={18} strokeWidth={1.5} />
            <span>Wishlist</span>
          </button>
        </div>
      </div>
    </>
  );
}
