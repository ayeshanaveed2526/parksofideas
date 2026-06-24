"use client";

import React from "react";

const ProductHeroGeometricBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(140, 180, 220, 0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 10% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 90% 30%, rgba(180, 210, 255, 0.08) 0%, transparent 55%)",
      }}
    />

    <svg
      viewBox="0 0 1200 224"
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="ph-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <circle cx="48" cy="48" r="1.2" fill="rgba(255,255,255,0.12)" />
        </pattern>
        <linearGradient id="ph-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <rect width="1200" height="224" fill="url(#ph-grid)" opacity="0.9">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 24,-12; 0,0"
          dur="28s"
          repeatCount="indefinite"
        />
      </rect>

      <line x1="0" y1="224" x2="1200" y2="0" stroke="url(#ph-line-grad)" strokeWidth="0.75" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="0" y1="134" x2="1200" y2="45" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="8 24">
        <animate attributeName="stroke-dashoffset" values="0;64" dur="12s" repeatCount="indefinite" />
      </line>

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="144,123; 168,112; 144,123"
          dur="20s"
          repeatCount="indefinite"
        />
        <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="6 10">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="36s" repeatCount="indefinite" />
          <animate attributeName="r" values="55;62;55" dur="14s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(180,210,255,0.15)" strokeWidth="0.75" strokeDasharray="3 12">
          <animateTransform attributeName="transform" type="rotate" values="360;0" dur="24s" repeatCount="indefinite" />
        </circle>
      </g>

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="1056,78; 1032,84; 1056,78"
          dur="18s"
          repeatCount="indefinite"
        />
        <rect x="-28" y="-28" width="56" height="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" rx="4">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite" />
        </rect>
        <polygon points="0,-22 19,11 -19,11" fill="none" stroke="rgba(200,220,255,0.12)" strokeWidth="0.75">
          <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="22s" repeatCount="indefinite" />
        </polygon>
      </g>

      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="864,175; 888,170; 864,175"
          dur="22s"
          repeatCount="indefinite"
        />
        <polygon
          points="30,0 60,17 60,52 30,70 0,52 0,17"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.75"
          transform="scale(0.55)"
        >
          <animateTransform attributeName="transform" type="rotate" values="0;60;0" dur="26s" repeatCount="indefinite" additive="sum" />
        </polygon>
      </g>

      <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 18,-10; 0,0" dur="16s" repeatCount="indefinite" />
          <line x1="336" y1="49" x2="456" y2="40" />
          <line x1="456" y1="40" x2="504" y2="72" />
          <line x1="336" y1="49" x2="504" y2="72" />
          <circle cx="336" cy="49" r="2.5" fill="rgba(255,255,255,0.25)" stroke="none" />
          <circle cx="456" cy="40" r="3" fill="rgba(180,210,255,0.2)" stroke="none" />
          <circle cx="504" cy="72" r="2" fill="rgba(255,255,255,0.2)" stroke="none" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; -15,8; 0,0" dur="19s" repeatCount="indefinite" />
          <line x1="696" y1="152" x2="816" y2="139" />
          <line x1="816" y1="139" x2="864" y2="166" />
          <circle cx="696" cy="152" r="2" fill="rgba(255,255,255,0.2)" stroke="none" />
          <circle cx="816" cy="139" r="2.5" fill="rgba(255,255,255,0.25)" stroke="none" />
          <circle cx="864" cy="166" r="2" fill="rgba(180,210,255,0.18)" stroke="none" />
        </g>
      </g>

      <g stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeLinecap="round">
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="600,40; 612,36; 600,40"
            dur="14s"
            repeatCount="indefinite"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;90;0"
              dur="18s"
              repeatCount="indefinite"
            />
            <line x1="-10" y1="0" x2="10" y2="0" />
            <line x1="0" y1="-10" x2="0" y2="10" />
          </g>
        </g>
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="216,161; 240,157; 216,161"
            dur="17s"
            repeatCount="indefinite"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="45;135;45"
              dur="20s"
              repeatCount="indefinite"
            />
            <line x1="-8" y1="0" x2="8" y2="0" />
            <line x1="0" y1="-8" x2="0" y2="8" />
          </g>
        </g>
      </g>

      {[
        { cx: 96, cy: 85, dur: "11s" },
        { cx: 1104, cy: 130, dur: "13s" },
        { cx: 540, cy: 197, dur: "10s" },
        { cx: 744, cy: 27, dur: "15s" },
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={i === 2 ? 2.5 : i === 3 ? 1.8 : 2} fill="rgba(255,255,255,0.2)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 6,-8; -4,5; 0,0"
            dur={dot.dur}
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.15;0.35;0.15" dur={dot.dur} repeatCount="indefinite" />
        </circle>
      ))}

      <line x1="0" y1="112" x2="1200" y2="112" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="120 400">
        <animate attributeName="stroke-dashoffset" values="520;0" dur="20s" repeatCount="indefinite" />
      </line>
    </svg>
  </div>
);

export default ProductHeroGeometricBackground;
