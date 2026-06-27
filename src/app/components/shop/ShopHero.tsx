"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ShopHero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Attempt autoplay again in case browser blocked it
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const titleText = "THE COLLECTION";

  return (
    <section className="sh-hero">
      {/* Background Video */}
      <div className="sh-slideshow" aria-hidden="true">
        <video
          ref={videoRef}
          src="/generate_a_video_for_my_websit.mp4"
          className="sh-video-bg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/primary_2.png"
        />
        {/* Gradient overlays for premium depth and readability */}
        <div className="sh-overlay-gradient" />
        <div className="sh-overlay-dark" />
      </div>

      {/* Content Area */}
      <div className="sh-content">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2.5 mb-6 text-white" aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-inter), "Inter", sans-serif' }}>
          <Link href="/" className="text-white text-[11px] font-semibold tracking-[0.18em] uppercase no-underline transition-opacity duration-300 hover:opacity-80 relative" style={{ color: '#ffffff', fontSize: '11px', fontWeight: 600, opacity: 1, letterSpacing: '0.18em' }}>
            HOME
          </Link>
          <span className="opacity-50 flex items-center">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path
                d="M1 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-white text-[11px] font-semibold tracking-[0.18em] uppercase">
            SHOP
          </span>
        </nav>

        {/* Title */}
        <h1 className="sh-title">
          {titleText.split(" ").map((word, wIdx, wordsArr) => (
            <span key={wIdx} className="sh-word-unit">
              {word.split("").map((char, cIdx) => {
                // Calculate absolute letter index for delay staggering
                const charIndex = titleText.indexOf(word) + cIdx;
                const delay = 0.2 + charIndex * 0.05;
                return (
                  <span
                    key={cIdx}
                    className="sh-animated-letter"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
              {wIdx < wordsArr.length - 1 && (
                <span className="sh-space">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>

        {/* Decorative accent lines */}
        <div className="sh-accent">
          <span className="sh-accent-line sh-accent-line--left" />
          <span className="sh-accent-diamond" />
          <span className="sh-accent-line sh-accent-line--right" />
        </div>

        {/* Subtitle */}
        <p className="sh-subtitle">
          Discover a sensory journey of elegant notes and luxurious botanical essences.
        </p>
      </div>

      {/* Floating Video Controls */}
      <div className="sh-video-controls">
        <button
          onClick={togglePlay}
          className="sh-control-btn"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={toggleMute}
          className="sh-control-btn"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll Down mouse indicator */}
      <div className="sh-scroll-down" aria-hidden="true">
        <div className="sh-mouse">
          <div className="sh-wheel" />
        </div>
      </div>

      <style jsx>{`
        /* ── Section & Video Layout ── */
        .sh-hero {
          position: relative;
          width: 100%;
          min-height: 480px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          padding: 180px 20px 80px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sh-slideshow {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .sh-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.02);
          will-change: transform;
          animation: videoSlowZoom 25s linear infinite alternate;
        }

        @keyframes videoSlowZoom {
          0% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1.08);
          }
        }

        /* Shading overlays */
        .sh-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 8, 157, 0.12) 60%,
            rgba(240, 242, 248, 0.95) 100%
          );
          z-index: 1;
        }

        .sh-overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        /* ── Content ── */
        .sh-content {
          position: relative;
          z-index: 3;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          margin-bottom: 15px;
        }

        /* ── Breadcrumb ── */
        .sh-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          animation: shFadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .sh-crumb-link {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #ffffff;
          text-decoration: none;
          transition: opacity 0.3s ease;
          position: relative;
          opacity: 1;
        }

        .sh-crumb-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: #ffffff;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sh-crumb-link:hover {
          opacity: 1;
        }

        .sh-crumb-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .sh-crumb-sep {
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
        }

        .sh-crumb-current {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #ffffff;
        }

        /* ── Title ── */
        .sh-title {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 300;
          font-size: 52px;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 24px;
          padding-left: 0.12em;
          text-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 0.28em;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .sh-title span {
          color: #ffffff !important;
        }

        .sh-word-unit {
          display: inline-block;
          white-space: nowrap;
        }

        .sh-space {
          display: inline-block;
          width: 0.22em;
        }

        .sh-animated-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) scale(0.95);
          animation: shLetterReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shLetterReveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ── Accent lines ── */
        .sh-accent {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .sh-accent-line {
          display: block;
          width: 70px;
          height: 1px;
        }

        .sh-accent-line--left {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7));
          animation: shLineGrow 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
          transform-origin: right;
        }

        .sh-accent-line--right {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.7), transparent);
          animation: shLineGrow 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
          transform-origin: left;
        }

        .sh-accent-diamond {
          width: 7px;
          height: 7px;
          background: #ffffff;
          border-radius: 1px;
          flex-shrink: 0;
          animation: shDiamondSpin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both;
        }

        @keyframes shLineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes shDiamondSpin {
          from {
            opacity: 0;
            transform: rotate(0deg) scale(0);
          }
          to {
            opacity: 1;
            transform: rotate(45deg) scale(1);
          }
        }

        /* ── Subtitle ── */
        .sh-subtitle {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
          animation: shFadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
        }

        @keyframes shFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Floating Video Controls ── */
        .sh-video-controls {
          position: absolute;
          bottom: 24px;
          right: 24px;
          z-index: 10;
          display: flex;
          gap: 8px;
          animation: shFadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s both;
        }

        .sh-control-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          outline: none;
        }

        .sh-control-btn:hover {
          background: rgba(0, 8, 157, 0.8);
          border-color: rgba(255, 255, 255, 0.55);
          transform: translateY(-2px) scale(1.05);
        }

        .sh-control-btn:active {
          transform: scale(0.95);
        }

        /* ── Scroll Down Mouse Indicator ── */
        .sh-scroll-down {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: shFadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.4s both;
        }

        .sh-mouse {
          width: 22px;
          height: 36px;
          border: 1.5px solid rgba(0, 8, 157, 0.4);
          border-radius: 20px;
          position: relative;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(4px);
        }

        .sh-wheel {
          width: 4px;
          height: 8px;
          background: #00089d;
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: mouseWheelScroll 1.8s ease-in-out infinite;
        }

        @keyframes mouseWheelScroll {
          0% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          30% {
            opacity: 1;
          }
          60% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 0);
          }
        }

        /* ── Responsive ── */
        @media (max-width: 639px) {
          .sh-hero {
            min-height: 400px;
            padding: 130px 16px 60px;
          }

          .sh-title {
            font-size: 36px;
            letter-spacing: 0.18em;
          }

          .sh-accent-line {
            width: 45px;
          }

          .sh-subtitle {
            font-size: 12.5px;
            max-width: 90%;
          }

          .sh-video-controls {
            bottom: 16px;
            right: 16px;
          }
        }

        @media (min-width: 1024px) {
          .sh-hero {
            min-height: 520px;
            padding: 200px 40px 100px;
          }

          .sh-title {
            font-size: 80px;
            letter-spacing: 0.32em;
          }

          .sh-accent-line {
            width: 100px;
          }

          .sh-subtitle {
            font-size: 14.5px;
          }
        }
      `}</style>
    </section>
  );
}
