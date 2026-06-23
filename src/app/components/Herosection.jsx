"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Herosection() {
  const leftSlides = [
    {
      id: 1,
      image: "/images/Gemini_Generated_Image_9aoqnd9aoqnd9aoq.webp",
      subtitle: "PACKAGE",
      title: "PREMIUM",
      link: "#",
    },
    {
      id: 2,
      image: "/images/pink_slide_2_v2.webp",
      subtitle: "ORGANIC",
      title: "BEAUTY",
      link: "#",
    },
    {
      id: 3,
      image: "/images/pink_slide_3_v2.webp",
      subtitle: "BOTANICAL",
      title: "ESSENCE",
      link: "#",
    },
  ];

  const rightSlides = [
    {
      id: 1,
      image: "/images/Gemini_Generated_Image_n9mh33n9mh33n9mh.webp",
      subtitle: "NEW BRAND",
      title: "TOUCH",
      link: "#",
    },
    {
      id: 2,
      image: "/images/beige_slide_2_v2.webp",
      subtitle: "PURE SAND",
      title: "LUXURY",
      link: "#",
    },
    {
      id: 3,
      image: "/images/beige_slide_3_v2.webp",
      subtitle: "MINIMALIST",
      title: "SERUM",
      link: "#",
    },
  ];

  const [currentLeft, setCurrentLeft] = useState(0);
  const [currentRight, setCurrentRight] = useState(0);

  // Automatic sliding every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLeft((prev) => (prev + 1) % leftSlides.length);
      setCurrentRight((prev) => (prev + 1) % rightSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [leftSlides.length, rightSlides.length]);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Container matching Navbar max width */}
      <div className="relative mx-auto flex w-full flex-col md:flex-row">
        
        {/* Left Column (Pink Slider) */}
        <div className="relative flex h-[320px] sm:h-[400px] md:h-[478px] w-full md:w-1/2 flex-shrink-0 items-center overflow-hidden group">
          {leftSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentLeft ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out ${
                idx === currentLeft ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[#1a1a1a] text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-marcellus), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.5em",
                    lineHeight: "20px",
                    textTransform: "uppercase",
                    transitionDelay: idx === currentLeft ? "200ms" : "0ms"
                  }}
                >
                  {slide.subtitle}
                </span>
                <div
                  className={`mb-6 sm:mb-10 text-[#1a1a1a] text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 200,
                    letterSpacing: "0.14em",
                    lineHeight: 1.172,
                    textTransform: "uppercase",
                    textAlign: "left",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    position: "relative",
                    left: "-4px",
                    display: "inline-block",
                    transitionDelay: idx === currentLeft ? "400ms" : "0ms"
                  }}
                >
                  {slide.title}
                </div>
                <div 
                  className={`transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: idx === currentLeft ? "600ms" : "0ms"
                  }}
                >
                  <Link 
                    href={slide.link} 
                    className="w-fit border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                    style={{
                      display: "inline-block",
                      outline: "none",
                      fontWeight: 400,
                      fontSize: "11px",
                      lineHeight: 1.2,
                      textAlign: "center",
                      letterSpacing: "0.265em",
                      textIndent: "0.265em",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      textDecoration: "none"
                    }}
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Circular Stamp — hidden on small mobile */}
          <div className="absolute right-4 sm:right-8 md:right-[230px] top-4 sm:top-[40px] z-20 hidden sm:flex h-[90px] w-[90px] md:h-[130px] md:w-[130px] items-center justify-center rounded-full bg-[#fcecf0]">
             <svg viewBox="0 0 100 100" className="h-[90%] w-[90%] animate-[spin_20s_linear_infinite]">
               <defs>
                 <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
               </defs>
               <text fontSize="8.5" fontWeight="500" fill="#1a1a1a" letterSpacing="1.2">
                 <textPath href="#circlePath" startOffset="0%">
                   • ALL PRODUCTS IS NATURAL • 2000+ CUSTOMERS 
                 </textPath>
               </text>
             </svg>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-[40px] md:left-[80px] z-20 flex gap-2">
            {leftSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentLeft(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentLeft ? "bg-[#1a1a1a] w-8" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4"
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentLeft((prev) => (prev - 1 + leftSlides.length) % leftSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentLeft((prev) => (prev + 1) % leftSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Column (Beige Slider) */}
        <div className="relative flex h-[320px] sm:h-[400px] md:h-[478px] w-full md:w-1/2 flex-shrink-0 items-center overflow-hidden group">
          {rightSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentRight ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out ${
                idx === currentRight ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[#1a1a1a] text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-marcellus), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.5em",
                    lineHeight: "20px",
                    textTransform: "uppercase",
                    transitionDelay: idx === currentRight ? "200ms" : "0ms"
                  }}
                >
                  {slide.subtitle}
                </span>
                <h1 
                  className={`mb-6 sm:mb-10 text-[#1a1a1a] text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 200,
                    letterSpacing: "0.14em",
                    lineHeight: 1.172,
                    textTransform: "uppercase",
                    textAlign: "left",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    position: "relative",
                    left: "-4px",
                    display: "inline-block",
                    transitionDelay: idx === currentRight ? "400ms" : "0ms"
                  }}
                >
                  {slide.title}
                </h1>
                <div 
                  className={`transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: idx === currentRight ? "600ms" : "0ms"
                  }}
                >
                  <Link 
                    href={slide.link} 
                    className="w-fit border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                    style={{
                      display: "inline-block",
                      outline: "none",
                      fontWeight: 400,
                      fontSize: "11px",
                      lineHeight: 1.2,
                      textAlign: "center",
                      letterSpacing: "0.265em",
                      textIndent: "0.265em",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      textDecoration: "none"
                    }}
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-[40px] md:left-[80px] z-20 flex gap-2">
            {rightSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRight(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentRight ? "bg-[#1a1a1a] w-8" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4"
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentRight((prev) => (prev - 1 + rightSlides.length) % rightSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentRight((prev) => (prev + 1) % rightSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
