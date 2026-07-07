"use client";

import React, { useState } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative mx-auto w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-white">
      {/* Background Container */}
      <div
        className="relative w-full h-full bg-[#fae8e2] bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: "url('/assets/images/video-bg.png')",
        }}
      >
        {isPlaying ? (
          <div className="absolute inset-0 z-30 w-full h-full bg-black animate-in fade-in duration-500">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/2Hj4T9MCKl4?autoplay=1&rel=0"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsPlaying(false)}
              className="poi-btn absolute top-4 right-4 sm:top-6 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white shadow-lg backdrop-blur-sm"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer bg-black/5 hover:bg-black/10 transition-colors duration-500"
            onClick={() => setIsPlaying(true)}
          >
            {/* Play Button */}
            <button
              type="button"
              className="poi-btn group flex h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] md:h-[66px] md:w-[66px] items-center justify-center rounded-full text-white shadow-xl cursor-pointer transform hover:scale-110 active:scale-95"
              aria-label="Play video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 translate-x-0.5 transition-colors duration-300"
              >
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Centered Text */}
            <div
              className="mt-4 sm:mt-5 md:mt-[28px] flex flex-col items-center text-[16px] sm:text-[22px] md:text-[28px] lg:text-[34px] font-light uppercase select-none text-[#1a1a1a] transition-all duration-300"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                lineHeight: "1.4",
                textAlign: "center",
                fontWeight: 200,
                letterSpacing: "clamp(3px, 1.5vw, 10px)"
              }}
            >
              <span style={{ paddingLeft: "clamp(3px, 1.5vw, 10px)" }}>WATCH THE BRAND</span>
              <span style={{ paddingLeft: "clamp(3px, 1.5vw, 10px)" }}>PRESENTATION</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
