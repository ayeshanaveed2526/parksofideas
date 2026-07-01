"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { PERFUME_CATALOG, formatPerfumePrice } from "../data/perfumeCatalog";
import { motion } from "framer-motion";
import { useLoginModal } from "./auth/LoginModalProvider";
import { useCart } from "./cart/CartProvider";

/**
 * MainNavbar — the second bar.
 * Spec: 1521px x 90px, white background.
 */
export default function MainNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openLoginModal } = useLoginModal();
  const { itemCount: cartCount } = useCart();

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
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  const homeVariants = PERFUME_CATALOG.slice(0, 8).map((perfume) => ({
    name: perfume.brand,
    image: perfume.image,
  }));

  const megaMenuPerfumes = PERFUME_CATALOG.filter((p) => [2, 16, 23].includes(p.id));

  return (
    <>
      <div className={`w-full bg-white transition-all duration-300 ${isSticky ? "shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b border-gray-100" : ""}`}>
        <div className="relative mx-auto flex h-[70px] md:h-[90px] w-full items-center justify-between px-[15px] md:px-[50px]">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link href="/" aria-label="Luchiana Home" className="shrink-0 hover-scale-sm transition-transform duration-300">
            <span className="text-[20px] md:text-[24px] font-bold tracking-widest uppercase text-black" style={{ fontFamily: "Inter, sans-serif" }}>ELIX BY IR</span>
            </Link>
          </motion.div>

          {/* Nav links — desktop */}
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }}
            className="hidden md:flex items-center h-full text-[#1a1a1a] mr-[30px]"
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.label}
                className={`group flex items-center h-full ${["HOME", "SHOP", "MEGA"].includes(link.label) ? "" : "relative"}`}
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
                <Link href={link.href} className="hover:text-[#00089d] hover-link-slide transition-colors flex items-center h-full">
                  {link.label}
                </Link>

                {/* Mega Menu for HOME */}
                {link.label === "HOME" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-screen max-w-[1160px] h-[229px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default overflow-x-auto"
                  >
                    <div className="flex items-center justify-center gap-[15px] xl:gap-[30px] w-max xl:w-full h-full px-4 xl:px-10 min-w-min mx-auto">
                      {homeVariants.map((v) => (
                        <Link href="/" key={v.name} className="flex flex-col items-center gap-[15px] group/item hover-lift-sm">
                          <div className="w-[89px] h-[98px] relative border border-transparent hover:border-black transition-all duration-300 bg-gray-50 overflow-hidden hover-image-zoom hover-ring-pulse">
                            <Image src={v.image} alt={v.name} fill sizes="89px" style={{ objectFit: "cover" }} />
                          </div>
                          <span
                            className="text-[12px] text-[#1a1a1a] hover:text-[#00089d] transition-colors"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
                          >
                            {v.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dropdown for HEADERS */}
                {link.label === "HEADERS" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[165px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default px-[40px] py-[35px] text-left"
                  >
                    <ul className="flex flex-col gap-[22px]">
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>DESKTOP</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#00089d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for DESKTOP */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible translate-x-[-10px] group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-400 ease-out z-201">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4", "TYPE 5"].map((type) => (
                                <li key={type}>
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>MOBILE</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#00089d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for MOBILE */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible translate-x-[-10px] group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-400 ease-out z-201">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4"].map((type) => (
                                <li key={type} className="flex items-center gap-2">
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
                                  {type === "TYPE 4" && (
                                    <span className="bg-[#60b07a] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider leading-none">NEW</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center justify-between group/item">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>SPECIAL OFFERS</Link>
                      </li>
                    </ul>
                  </div>
                )}

          
                {/* Dropdown for PAGES */}
                {link.label === "PAGES" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[305px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default py-[30px] text-left"
                  >
                    <ul className="flex flex-col w-full">
                      {["ABOUT US", "SERVICE", "OUR TEAM", "FAQ", "MAINTENANCE MODE", "404 ERROR", "CONTACT"].map((item) => (
                        <li key={item} className="w-full">
                          <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase w-full h-[35px] flex items-center px-[40px]" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mega Menu for SHOP */}
                {link.label === "SHOP" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-screen max-w-[1160px] h-auto min-h-[538px] bg-[#f9f9f9] shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default flex text-left"
                  >
                    {/* Sidebar section */}
                    <div className="w-[250px] xl:w-[300px] shrink-0 min-h-[523px] bg-white pt-[50px] pl-[30px] xl:pl-[50px] flex flex-col gap-[40px]">
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>BRANDS</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {["AERIN", "FABLE&MANE", "LOREAL", "MAC", "SCHWARZKOPF"].map((item) => (
                            <li key={item} className="w-full">
                              <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>CAPACITY</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {["30 ML", "40 ML", "50 ML"].map((item) => (
                            <li key={item} className="w-full">
                              <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Image section */}
                    <div className="flex-1 pt-[41px] px-[20px] pb-[10px] flex gap-[20px] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f0f0f0] [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:hover:bg-[#a0a0a0]">
                      {megaMenuPerfumes.map((perfume, idx) => (
                      <div key={perfume.id} className="flex flex-col w-[260px] min-w-[260px] bg-white text-center group/card cursor-pointer">
                        <div className="relative w-[260px] h-[230px] flex items-center justify-center p-4 overflow-hidden border-b border-[#f2f2f2]">
                          {idx === 1 && <span className="absolute top-0 left-0 bg-[#1a1a1a] text-white text-[10px] font-bold px-2 py-1 tracking-wider z-10">NEW</span>}
                          {(idx === 1 || idx === 2) && <span className="absolute top-0 right-0 bg-[#00089d] text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase z-10">FEATURED</span>}
                          <img src={perfume.image} alt={perfume.brand} className="max-h-[190px] max-w-full object-contain" />
                          <div className="absolute inset-0 bg-white/40 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 z-4" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-white border border-black z-5 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 w-[69px] h-[34px]">
                            <button type="button" className="poi-btn poi-btn-compact w-[34px] h-[32px] flex items-center justify-center" aria-label="Quick View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <div className="w-px h-[32px] bg-black"></div>
                            <button type="button" className="poi-btn poi-btn-compact w-[34px] h-[32px] flex items-center justify-center" aria-label="Add to Wishlist">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>
                          </div>
                          <button className="poi-btn poi-btn-compact absolute bottom-0 left-0 w-full h-[36px] flex items-center justify-center translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-5 text-[10px] tracking-[0.15em]" type="button">
                            + Add to Cart
                          </button>
                        </div>
                        <div className="w-[260px] h-[252px] flex flex-col items-center justify-center px-4">
                          <h5 className="text-[16px] text-[#1a1a1a] group-hover/card:text-[#00089d] transition-colors duration-150 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-marcellus), Marcellus, serif" }}>{perfume.brand}</h5>
                          <p className="text-[#888] text-[13px] mb-6">{perfume.description}</p>
                          <span className="text-[#1a1a1a] text-[15px] font-medium">{formatPerfumePrice(perfume.price)}</span>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Right icons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-6 text-black"
          >
            <button
              type="button"
              aria-label="Account"
              className="hidden sm:block hover-icon-pop hover-scale-sm"
              onClick={openLoginModal}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block hover-icon-pop hover-scale-sm relative">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="hover-icon-pop hover-scale-sm relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#00089d] text-white text-[10px] font-bold leading-none"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Menu"
              className="md:hidden! hover-icon-pop hover-scale-sm"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-200 bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-201 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
            type="button"
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
                  className="block py-3 text-[14px] font-medium tracking-[0.13em] uppercase text-[#1a1a1a] hover:text-[#00089d] hover-link-slide transition-colors border-b border-gray-50"
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
          <button
            type="button"
            aria-label="Account"
            className="flex items-center gap-2 text-[13px] tracking-widest uppercase text-[#1a1a1a] hover:text-[#00089d] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => {
              setMobileMenuOpen(false);
              openLoginModal();
            }}
          >
            <User size={18} strokeWidth={1.5} />
            <span>Account</span>
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="flex items-center gap-2 text-[13px] tracking-widest uppercase text-[#1a1a1a] hover:text-[#00089d] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            <Heart size={18} strokeWidth={1.5} />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>
    </>
  );
}
