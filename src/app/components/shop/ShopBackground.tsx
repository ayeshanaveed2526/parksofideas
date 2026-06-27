"use client";

import React from "react";

export default function ShopBackground() {
  return (
    <div className="sb-wrapper" aria-hidden="true">
      {/* Lightweight Grid & Ring Vector Canvas */}
      <svg
        width="100%"
        height="100%"
        className="sb-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Performant grid pattern */}
          <pattern id="sb-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(0, 8, 157, 0.05)"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        {/* Background Grid Layer */}
        <rect width="100%" height="100%" fill="url(#sb-grid-pattern)" />

        {/* Top Left Rotating Rings */}
        <g transform="translate(150, 150)" className="sb-ring-group">
          <circle
            r="90"
            fill="none"
            stroke="rgba(0, 8, 157, 0.04)"
            strokeWidth="1"
            strokeDasharray="10 5 2 5"
          />
          <circle
            r="70"
            fill="none"
            stroke="rgba(0, 8, 157, 0.03)"
            strokeWidth="0.75"
            strokeDasharray="5 15"
          />
        </g>

        {/* Bottom Right Rotating Rings */}
        <g transform="translate(1250, 600)" className="sb-ring-group-reverse">
          <circle
            r="120"
            fill="none"
            stroke="rgba(0, 8, 157, 0.04)"
            strokeWidth="1"
            strokeDasharray="1 8"
          />
          <rect
            x="-60"
            y="-60"
            width="120"
            height="120"
            fill="none"
            stroke="rgba(0, 8, 157, 0.03)"
            strokeWidth="0.75"
          />
        </g>

        {/* Constellation Nodes (Static / CSS float only - No JS, No filters) */}
        <g stroke="rgba(0, 8, 157, 0.035)" strokeWidth="0.75" fill="none">
          {/* Node Group 1 */}
          <g className="sb-mesh-group-1">
            <line x1="8%" y1="25%" x2="16%" y2="18%" />
            <line x1="16%" y1="18%" x2="20%" y2="35%" />
            <line x1="8%" y1="25%" x2="20%" y2="35%" />
            <circle cx="8%" cy="25%" r="2.5" fill="rgba(0, 8, 157, 0.06)" />
            <circle cx="16%" cy="18%" r="3" fill="rgba(0, 8, 157, 0.06)" />
            <circle cx="20%" cy="35%" r="2.5" fill="rgba(0, 8, 157, 0.06)" />
          </g>

          {/* Node Group 2 */}
          <g className="sb-mesh-group-2">
            <line x1="82%" y1="65%" x2="90%" y2="52%" />
            <line x1="90%" y1="52%" x2="93%" y2="78%" />
            <line x1="82%" y1="65%" x2="93%" y2="78%" />
            <circle cx="82%" cy="65%" r="3" fill="rgba(0, 8, 157, 0.05)" />
            <circle cx="90%" cy="52%" r="2" fill="rgba(0, 8, 157, 0.05)" />
            <circle cx="93%" cy="78%" r="3" fill="rgba(0, 8, 157, 0.05)" />
          </g>
        </g>

        {/* Data Stream Line */}
        <line
          x1="0"
          y1="75%"
          x2="100%"
          y2="75%"
          stroke="rgba(0, 8, 157, 0.03)"
          strokeWidth="0.75"
          strokeDasharray="60 300"
          className="sb-stream-line"
        />
      </svg>

      <style jsx>{`
        .sb-wrapper {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          /* Premium elegant gradient backdrop matching TopCategory and home styles */
          background: linear-gradient(
            180deg,
            #f3f4f6 0%,
            #eceef1 42%,
            #f0f1f4 72%,
            #f6f7f9 100%
          );
        }

        .sb-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* ── GPU-Accelerated Performant Ring Rotations ── */
        .sb-ring-group {
          transform-origin: 150px 150px;
          animation: sbRotate 45s linear infinite;
        }

        .sb-ring-group-reverse {
          transform-origin: 1250px 600px;
          animation: sbRotateReverse 50s linear infinite;
        }

        @keyframes sbRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sbRotateReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        /* ── Floating Constellation Meshes (No filters, purely hardware accelerated transforms) ── */
        .sb-mesh-group-1 {
          animation: sbFloat1 18s ease-in-out infinite alternate;
        }

        .sb-mesh-group-2 {
          animation: sbFloat2 22s ease-in-out infinite alternate;
        }

        @keyframes sbFloat1 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(15px, -15px);
          }
        }

        @keyframes sbFloat2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-20px, 15px);
          }
        }

        /* ── Data stream line ── */
        .sb-stream-line {
          animation: sbStream 25s linear infinite;
        }

        @keyframes sbStream {
          from {
            stroke-dashoffset: 360;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
