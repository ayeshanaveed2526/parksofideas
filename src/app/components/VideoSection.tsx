"use client";

import React, { useState, useRef } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Error playing video: ", err);
        });
      }
    }
  };

  return (
    <section className="relative mx-auto w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-white">
      {/* Background/Video Container */}
      <div
        className="relative w-full h-full bg-[#fae8e2] bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: "url('/images/video_bg.webp')",
        }}
      >
        {/* HTML5 Video element */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none"
            }`}
          src="https://assets.mixkit.co/videos/preview/mixkit-beauty-treatment-in-a-salon-43093-large.mp4"
          loop
          playsInline
          onClick={handlePlayToggle}
        />

        {/* Overlay (Visible when paused or hovered during play) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 cursor-pointer ${isPlaying ? "opacity-0 hover:opacity-100 bg-black/45" : "bg-black/3"
            }`}
          onClick={handlePlayToggle}
        >
          {/* Play/Pause Button */}
          <button
            type="button"
            className="group flex h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] md:h-[66px] md:w-[66px] items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black hover-btn-shine hover-ring-pulse shadow-xl cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              // Pause Icon (Hover White effect: text-white -> text-black on hover)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-colors duration-300"
              >
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              // Play Icon (Hover White effect: text-white -> text-black on hover)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 translate-x-0.5 transition-colors duration-300"
              >
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Centered Text (Two lines) */}
          <div
            className={`mt-4 sm:mt-5 md:mt-[28px] flex flex-col items-center text-[16px] sm:text-[22px] md:text-[28px] lg:text-[34px] font-light uppercase select-none transition-all duration-300 ${isPlaying ? "text-white drop-shadow-md" : "text-[#1a1a1a]"
              }`}
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
      </div>
    </section>
  );
}
