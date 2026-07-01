"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Herosection() {
  const leftSlides = [
    {
      id: 1,
      image: "/images/primary_1.png",
      subtitle: "PACKAGE",
      title: "PREMIUM",
      link: "#",
      theme: "dark",
    },
    {
      id: 2,
      image: "/images/primary_2.png",
      subtitle: "ORGANIC",
      title: "BEAUTY",
      link: "#",
      theme: "dark",
    },
    {
      id: 3,
      image: "/images/primary_3.png",
      subtitle: "BOTANICAL",
      title: "ESSENCE",
      link: "#",
      theme: "light",
    },
  ];

  const rightSlides = [
    {
      id: 1,
      image: "/images/primary_4.png",
      subtitle: "NEW BRAND",
      title: "TOUCH",
      link: "#",
      theme: "light",
    },
    {
      id: 2,
      image: "/images/primary_5.png",
      subtitle: "PURE SAND",
      title: "LUXURY",
      link: "#",
      theme: "dark",
    },
    {
      id: 3,
      image: "/images/primary_6.png",
      subtitle: "MINIMALIST",
      title: "SERUM",
      link: "#",
      theme: "light",
    },
  ];

  const [currentLeft, setCurrentLeft] = useState(0);
  const [currentRight, setCurrentRight] = useState(0);
  const [pauseLeft, setPauseLeft] = useState(false);
  const [pauseRight, setPauseRight] = useState(false);

  // Auto-slide the left column (paused while hovered)
  useEffect(() => {
    if (pauseLeft) return;
    const timer = setInterval(() => {
      setCurrentLeft((prev) => (prev + 1) % leftSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [leftSlides.length, pauseLeft]);

  // Auto-slide the right column (paused while hovered)
  useEffect(() => {
    if (pauseRight) return;
    const timer = setInterval(() => {
      setCurrentRight((prev) => (prev + 1) % rightSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rightSlides.length, pauseRight]);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Container matching Navbar max width */}
      <div className="relative mx-auto flex w-full flex-col md:flex-row">
        
        {/* Left Column (Pink Slider) */}
        <div
          className="relative flex h-[400px] sm:h-[500px] md:h-[550px] w-full md:w-1/2 shrink-0 items-center overflow-hidden group"
          onMouseEnter={() => setPauseLeft(true)}
          onMouseLeave={() => setPauseLeft(false)}
        >
          {leftSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentLeft ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-1200 ease-out ${
                idx === currentLeft ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    slide.theme === "dark" ? "text-white" : "text-[#1a1a1a]"
                  } ${
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
                  className={`mb-6 sm:mb-10 text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    slide.theme === "dark" ? "text-white" : "text-[#1a1a1a]"
                  } ${
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
                    className={`poi-btn-hero hover-btn-shine ${
                      slide.theme === "dark" 
                        ? "poi-btn-hero--dark" 
                        : "poi-btn-hero--light"
                    }`}
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-[40px] md:left-[80px] z-20 flex gap-2">
            {leftSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentLeft(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentLeft 
                    ? (leftSlides[currentLeft].theme === "dark" ? "bg-white w-8" : "bg-[#1a1a1a] w-8") 
                    : (leftSlides[currentLeft].theme === "dark" ? "bg-white/30 hover:bg-white/60 w-4" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4")
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentLeft((prev) => (prev - 1 + leftSlides.length) % leftSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 hover-scale-sm hover-glow transition-all duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentLeft((prev) => (prev + 1) % leftSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 hover-scale-sm hover-glow transition-all duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Column (Beige Slider) */}
        <div
          className="relative flex h-[400px] sm:h-[500px] md:h-[550px] w-full md:w-1/2 shrink-0 items-center overflow-hidden group"
          onMouseEnter={() => setPauseRight(true)}
          onMouseLeave={() => setPauseRight(false)}
        >
          {rightSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentRight ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-1200 ease-out ${
                idx === currentRight ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    slide.theme === "dark" ? "text-white" : "text-[#1a1a1a]"
                  } ${
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
                  className={`mb-6 sm:mb-10 text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    slide.theme === "dark" ? "text-white" : "text-[#1a1a1a]"
                  } ${
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
                    className={`poi-btn-hero hover-btn-shine ${
                      slide.theme === "dark" 
                        ? "poi-btn-hero--dark" 
                        : "poi-btn-hero--light"
                    }`}
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
                  idx === currentRight 
                    ? (rightSlides[currentRight].theme === "dark" ? "bg-white w-8" : "bg-[#1a1a1a] w-8") 
                    : (rightSlides[currentRight].theme === "dark" ? "bg-white/30 hover:bg-white/60 w-4" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4")
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentRight((prev) => (prev - 1 + rightSlides.length) % rightSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 hover-scale-sm hover-glow transition-all duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentRight((prev) => (prev + 1) % rightSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 hover-scale-sm hover-glow transition-all duration-300 shadow-sm cursor-pointer"
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
