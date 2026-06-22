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

  const shopMegaMenu = {
    shopLayout: [
      { name: "3 PER ROW", isNew: false, isHot: false },
      { name: "4 PER ROW", isNew: false, isHot: false },
      { name: "COMPACT", isNew: false, isHot: false },
      { name: "3 PER ROW (SIDEBAR)", isNew: false, isHot: false },
      { name: "COMPACT (SIDEBAR)", isNew: false, isHot: false },
      { name: "2 PER ROW (ON MOBILE) L1", isNew: false, isHot: false },
      { name: "2 PER ROW (ON MOBILE) L2", isNew: false, isHot: true },
      { name: "CUSTOM SHOP PAGE", isNew: false, isHot: false },
      { name: "SWITCH IMAGES ON HOVER", isNew: false, isHot: false },
      { name: "SIDEBAR CART", isNew: true, isHot: false }
    ],
    productLayout: [
      { name: "LAYOUT 1", isNew: false, isHot: false },
      { name: "LAYOUT 2", isNew: false, isHot: false },
      { name: "LAYOUT 3", isNew: false, isHot: false },
      { name: "LAYOUT 4", isNew: false, isHot: false },
      { name: "PRODUCT IMAGE ZOOM", isNew: false, isHot: false },
      { name: "PRODUCT VIDEO AND WIDE TABS AREA", isNew: false, isHot: false },
      { name: "RECENTLY VIEWED PRODUCTS", isNew: false, isHot: false },
      { name: "WITH FEATURES", isNew: false, isHot: false },
      { name: "BOUGHT TOGETHER 1", isNew: false, isHot: false },
      { name: "BOUGHT TOGETHER 2", isNew: false, isHot: false },
      { name: "STICKY ADD TO CART (ON MOBILE)", isNew: false, isHot: false }
    ],
    productType: [
      { name: "SIMPLE PRODUCT", isNew: false, isHot: false },
      { name: "GROUPED PRODUCT", isNew: false, isHot: false },
      { name: "VARIABLE PRODUCT", isNew: false, isHot: false },
      { name: "EXTERNAL & AFFILIATE PRODUCT", isNew: false, isHot: false }
    ],
    pagination: [
      { name: "LOAD MORE", isNew: false, isHot: false },
      { name: "INFINITY", isNew: false, isHot: false }
    ],
    brands: [
      { name: "BRAND LIST 1", isNew: false, isHot: false },
      { name: "BRAND LIST 2", isNew: false, isHot: false },
      { name: "BRAND (PRODUCT PAGE)", isNew: false, isHot: false },
      { name: "BRANDS (PRODUCT GRID)", isNew: false, isHot: false }
    ],
    categories: [
      { name: "CATEGORIES IN HEADER", isNew: false, isHot: false },
      { name: "CATEGORIES IN CONTENT", isNew: false, isHot: false },
      { name: "WITH DESCRIPTION", isNew: false, isHot: false }
    ]
  };

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
                <Link href={link.href} className="hover:text-[#8c6f63] transition-colors flex items-center h-full">
                  {link.label}
                </Link>

                {/* Mega Menu for HOME */}
                {link.label === "HOME" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-[100vw] max-w-[1160px] h-[229px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default overflow-x-auto"
                  >
                    <div className="flex items-center justify-center gap-[15px] xl:gap-[30px] w-max xl:w-full h-full px-4 xl:px-10 min-w-min mx-auto">
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

                {/* Mega Menu for SHOP */}
                {link.label === "SHOP" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-[100vw] max-w-[1160px] h-[535px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default px-[20px] xl:px-[60px] py-[50px] grid grid-cols-4 gap-[20px] xl:gap-[40px] text-left overflow-x-auto"
                  >
                    {/* Col 1 */}
                    <div className="flex flex-col">
                      <h4 className="text-[17px] font-medium text-[#000000] mb-[25px]  pr-[50px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>SHOP LAYOUT</h4>
                      <ul className="flex flex-col gap-[18px]">
                        {shopMegaMenu.shopLayout.map((item) => (
                          <li key={item.name} className="flex items-center gap-2">
                            <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                            {item.isHot && <span className="bg-[#e63946] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider leading-none">HOT</span>}
                            {item.isNew && <span className="bg-[#60b07a] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider leading-none">NEW</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Col 2 */}
                    <div className="flex flex-col">
                      <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>PRODUCT LAYOUT</h4>
                      <ul className="flex flex-col gap-[18px]">
                        {shopMegaMenu.productLayout.map((item) => (
                          <li key={item.name} className="flex items-center gap-2">
                            <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Col 3 */}
                    <div className="flex flex-col gap-[40px]">
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>PRODUCT TYPE</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {shopMegaMenu.productType.map((item) => (
                            <li key={item.name} className="flex items-center gap-2">
                              <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>PAGINATION</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {shopMegaMenu.pagination.map((item) => (
                            <li key={item.name} className="flex items-center gap-2">
                              <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Col 4 */}
                    <div className="flex flex-col gap-[40px]">
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>BRANDS</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {shopMegaMenu.brands.map((item) => (
                            <li key={item.name} className="flex items-center gap-2">
                              <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>CATEGORIES</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {shopMegaMenu.categories.map((item) => (
                            <li key={item.name} className="flex items-center gap-2">
                              <Link href="#" className="text-[12px] text-[#555] hover:text-[#8c6f63] transition-colors tracking-[0.05em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dropdown for HEADERS */}
                {link.label === "HEADERS" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[165px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default px-[40px] py-[35px] text-left"
                  >
                    <ul className="flex flex-col gap-[22px]">
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>DESKTOP</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#e4c1b1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for DESKTOP */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-300 z-[201]">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4", "TYPE 5"].map((type) => (
                                <li key={type}>
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>MOBILE</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#e4c1b1] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for MOBILE */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-300 z-[201]">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4"].map((type) => (
                                <li key={type} className="flex items-center gap-2">
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
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
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#8c6f63] transition-colors tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>SPECIAL OFFERS</Link>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Dropdown for BLOG */}
                {link.label === "BLOG" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-[580px] h-[245px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default px-[60px] grid grid-cols-2 gap-[40px] content-center text-left"
                  >
                    {/* Col 1 */}
                    <div className="flex flex-col">
                      <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>BLOG STYLE</h4>
                      <ul className="flex flex-col gap-[22px]">
                        {["GRID", "LIST", "GRID (SIDEBAR)", "LIST (SIDEBAR)"].map((item) => (
                          <li key={item} className="w-full">
                            <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Col 2 */}
                    <div className="flex flex-col">
                      <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>POST FORMAT</h4>
                      <ul className="flex flex-col gap-[22px]">
                        {["POST FORMAT GALLERY", "POST FORMAT VIDEO"].map((item) => (
                          <li key={item} className="w-full">
                            <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#8c6f63] transition-colors tracking-[0.1em] uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Dropdown for PAGES */}
                {link.label === "PAGES" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[305px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default py-[30px] text-left"
                  >
                    <ul className="flex flex-col w-full">
                      {["ABOUT US", "SERVICE", "OUR TEAM", "FAQ", "MAINTENANCE MODE", "404 ERROR", "CONTACT"].map((item) => (
                        <li key={item} className="w-full">
                          <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase w-full h-[35px] flex items-center px-[40px]" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mega Menu for MEGA */}
                {link.label === "MEGA" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-[100vw] max-w-[1160px] h-auto min-h-[538px] bg-[#f9f9f9] shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] border-t border-gray-100 cursor-default flex text-left"
                  >
                    {/* Sidebar section */}
                    <div className="w-[250px] xl:w-[300px] shrink-0 min-h-[523px] bg-white pt-[50px] pl-[30px] xl:pl-[50px] flex flex-col gap-[40px]">
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>BRANDS</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {["AERIN", "FABLE&MANE", "LOREAL", "MAC", "SCHWARZKOPF"].map((item) => (
                            <li key={item} className="w-full">
                              <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[17px] font-medium text-[#000000] mb-[25px] tracking-[0.1em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>CAPACITY</h4>
                        <ul className="flex flex-col gap-[18px]">
                          {["30 ML", "40 ML", "50 ML"].map((item) => (
                            <li key={item} className="w-full">
                              <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#e4c1b1] transition-colors tracking-[0.1em] uppercase block w-full" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Image section */}
                    <div className="flex-1 pt-[41px] px-[20px] pb-[10px] flex gap-[20px] overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-[#f0f0f0] [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-thumb]:hover:bg-[#a0a0a0]">
                      {/* Product 1 */}
                      <div className="flex flex-col w-[260px] min-w-[260px] bg-white text-center group/card cursor-pointer">
                        <div className="relative w-[260px] h-[230px] flex items-center justify-center p-4 overflow-hidden border-b border-[#f2f2f2]">
                          <img src="/images/flowerbomb.jpg" alt="FLOWERBOMB" className="max-h-[190px] max-w-full object-contain mix-blend-multiply" />
                          <div className="absolute inset-0 bg-white/40 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 z-[4]" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-white border border-black z-[5] opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 w-[69px] h-[34px]">
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Quick View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <div className="w-[1px] h-[32px] bg-black"></div>
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Add to Wishlist">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>
                          </div>
                          <button className="absolute bottom-0 left-0 w-full h-[36px] font-semibold text-[10px] tracking-[0.15em] uppercase text-black bg-white border border-black flex items-center justify-center translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-[5] hover:bg-black hover:text-white" type="button" style={{ fontFamily: "Inter, sans-serif" }}>
                            + ADD TO CART
                          </button>
                        </div>
                        <div className="w-[260px] h-[252px] flex flex-col items-center justify-center px-4">
                          <h5 className="text-[16px] text-[#1a1a1a] group-hover/card:text-[#cdae9f] transition-colors duration-150 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-marcellus), Marcellus, serif" }}>FLOWERBOMB</h5>
                          <p className="text-[#888] text-[13px] mb-6">Vert de Bergamot, Coco de<br/>Mer Accord.</p>
                          <span className="text-[#1a1a1a] text-[15px] font-medium">$200.00</span>
                        </div>
                      </div>
                      
                      {/* Product 2 */}
                      <div className="flex flex-col w-[260px] min-w-[260px] bg-white text-center group/card cursor-pointer">
                        <div className="relative w-[260px] h-[230px] flex items-center justify-center p-4 overflow-hidden border-b border-[#f2f2f2]">
                          <span className="absolute top-0 left-0 bg-[#1a1a1a] text-white text-[10px] font-bold px-2 py-1 tracking-wider z-10">NEW</span>
                          <span className="absolute top-0 right-0 bg-[#e4c1b1] text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase z-10">FEATURED</span>
                          <img src="/images/luchiana-3015865450-520x460.jpg" alt="MIDNIGHT MUSK" className="max-h-[190px] max-w-full object-contain mix-blend-multiply" />
                          <div className="absolute inset-0 bg-white/40 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 z-[4]" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-white border border-black z-[5] opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 w-[69px] h-[34px]">
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Quick View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <div className="w-[1px] h-[32px] bg-black"></div>
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Add to Wishlist">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>
                          </div>
                          <button className="absolute bottom-0 left-0 w-full h-[36px] font-semibold text-[10px] tracking-[0.15em] uppercase text-black bg-white border border-black flex items-center justify-center translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-[5] hover:bg-black hover:text-white" type="button" style={{ fontFamily: "Inter, sans-serif" }}>
                            + ADD TO CART
                          </button>
                        </div>
                        <div className="w-[260px] h-[252px] flex flex-col items-center justify-center px-4">
                          <h5 className="text-[16px] text-[#1a1a1a] group-hover/card:text-[#cdae9f] transition-colors duration-150 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-marcellus), Marcellus, serif" }}>MIDNIGHT<br/>MUSK</h5>
                          <p className="text-[#888] text-[13px] mb-6">Earthy & Woody.</p>
                          <span className="text-[#1a1a1a] text-[15px] font-medium">$150.00</span>
                        </div>
                      </div>

                      {/* Product 3 */}
                      <div className="flex flex-col w-[260px] min-w-[260px] bg-white text-center group/card cursor-pointer">
                        <div className="relative w-[260px] h-[230px] flex items-center justify-center p-4 overflow-hidden border-b border-[#f2f2f2]">
                          <span className="absolute top-0 right-0 bg-[#e4c1b1] text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase z-10">FEATURED</span>
                          <img src="/images/luchiana-3024294986-520x460.jpg" alt="PURITY MADE CLEANSER" className="max-h-[190px] max-w-full object-contain mix-blend-multiply" />
                          <div className="absolute inset-0 bg-white/40 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 z-[4]" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-white border border-black z-[5] opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 w-[69px] h-[34px]">
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Quick View">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <div className="w-[1px] h-[32px] bg-black"></div>
                            <button className="w-[34px] h-[32px] flex items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors" aria-label="Add to Wishlist">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            </button>
                          </div>
                          <button className="absolute bottom-0 left-0 w-full h-[36px] font-semibold text-[10px] tracking-[0.15em] uppercase text-black bg-white border border-black flex items-center justify-center translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 z-[5] hover:bg-black hover:text-white" type="button" style={{ fontFamily: "Inter, sans-serif" }}>
                            + ADD TO CART
                          </button>
                        </div>
                        <div className="w-[260px] h-[252px] flex flex-col items-center justify-center px-4">
                          <h5 className="text-[16px] text-[#1a1a1a] group-hover/card:text-[#cdae9f] transition-colors duration-150 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-marcellus), Marcellus, serif" }}>PURITY MADE<br/>CLEANSER</h5>
                          <p className="text-[#888] text-[13px] mb-6">Top-selling facial cleanser.</p>
                          <span className="text-[#1a1a1a] text-[15px] font-medium">$60.00</span>
                        </div>
                      </div>
                      
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
