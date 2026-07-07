"use client";

import React, { useState, useRef, useEffect } from "react";
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
          src="/assets/generate_a_video_for_my_websit.mp4"
          className="sh-video-bg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/assets/images/primary_2.png"
        />
        {/* Gradient overlays for premium depth and readability */}
        <div className="sh-overlay-gradient" />
        <div className="sh-overlay-dark" />
      </div>

      {/* Content Area */}
      <div className="sh-content">
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
          aspect-ratio: 21 / 9; /* Ultra-wide cinematic to show bottles well */
          min-height: 600px;
          max-height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          padding: 140px 20px 70px;
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
        }

        /* Shading overlays */
        .sh-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.18) 60%,
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
          border: 1px solid var(--poi-btn-border);
          background: var(--poi-btn-bg);
          backdrop-filter: blur(12px);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
          outline: none;
        }

        .sh-control-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          color: #ffffff;
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
          border: 1.5px solid rgba(0, 0, 0, 0.4);
          border-radius: 20px;
          position: relative;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(4px);
        }

        .sh-wheel {
          width: 4px;
          height: 8px;
          background: #111111;
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
            height: 530px;
            min-height: 530px;
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
            height: 530px;
            min-height: 530px;
            padding: 150px 40px 80px;
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
