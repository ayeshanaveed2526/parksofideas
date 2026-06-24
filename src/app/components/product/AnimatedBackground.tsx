"use client";

import React from 'react';

const PEARL = 'rgba(168, 178, 198,';
const MIST = 'rgba(186, 196, 218,';
const SILVER = 'rgba(200, 208, 222,';

const AnimatedBackground: React.FC = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background:
        'radial-gradient(ellipse 80% 55% at 8% 0%, rgba(186, 196, 220, 0.28) 0%, transparent 58%), radial-gradient(ellipse 70% 50% at 95% 100%, rgba(176, 186, 210, 0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 40%, rgba(255, 255, 255, 0.85) 0%, transparent 70%), linear-gradient(168deg, #f8f9fc 0%, #f1f3f8 22%, #e8ecf4 48%, #f0f2f8 72%, #fafbfd 100%)',
    }}
  >
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8%" cy="15%" r="60" fill="none" stroke={`${PEARL}0.14)`} strokeWidth="1.5">
        <animateTransform attributeName="transform" type="translate" values="0,0; 30,-20; 0,0" dur="18s" repeatCount="indefinite" />
        <animate attributeName="r" values="60;72;60" dur="18s" repeatCount="indefinite" />
      </circle>

      <circle cx="85%" cy="70%" r="45" fill="none" stroke={`${MIST}0.12)`} strokeWidth="1">
        <animateTransform attributeName="transform" type="translate" values="0,0; -25,15; 0,0" dur="22s" repeatCount="indefinite" />
        <animate attributeName="r" values="45;55;45" dur="22s" repeatCount="indefinite" />
      </circle>

      <circle cx="50%" cy="85%" r="35" fill={`${SILVER}0.05)`} stroke={`${PEARL}0.1)`} strokeWidth="1">
        <animateTransform attributeName="transform" type="translate" values="0,0; 20,10; -10,-5; 0,0" dur="25s" repeatCount="indefinite" />
      </circle>

      <rect x="75%" y="12%" width="40" height="40" fill="none" stroke={`${MIST}0.14)`} strokeWidth="1" rx="3">
        <animateTransform attributeName="transform" type="rotate" values="0 78 14; 360 78 14" dur="30s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 15,-10; 0,0" dur="20s" repeatCount="indefinite" additive="sum" />
      </rect>

      <rect x="20%" y="60%" width="30" height="30" fill="none" stroke={`${PEARL}0.11)`} strokeWidth="1" rx="2">
        <animateTransform attributeName="transform" type="rotate" values="45 22 62; 405 22 62" dur="35s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; -12,18; 0,0" dur="24s" repeatCount="indefinite" additive="sum" />
      </rect>

      <polygon points="30,0 60,17 60,52 30,70 0,52 0,17" fill="none" stroke={`${MIST}0.12)`} strokeWidth="1" transform="translate(120, 280) scale(0.7)">
        <animateTransform attributeName="transform" type="translate" values="120,280; 140,260; 120,280" dur="28s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="0 135 300; 60 135 300; 0 135 300" dur="28s" repeatCount="indefinite" additive="sum" />
      </polygon>

      <polygon points="30,0 60,17 60,52 30,70 0,52 0,17" fill={`${SILVER}0.04)`} stroke={`${PEARL}0.1)`} strokeWidth="1" transform="translate(900, 150) scale(0.55)">
        <animateTransform attributeName="transform" type="translate" values="900,150; 880,170; 900,150" dur="32s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="0 915 165; -90 915 165; 0 915 165" dur="32s" repeatCount="indefinite" additive="sum" />
      </polygon>

      <polygon points="25,0 50,45 0,45" fill="none" stroke={`${PEARL}0.12)`} strokeWidth="1" transform="translate(300, 80)">
        <animateTransform attributeName="transform" type="translate" values="300,80; 310,60; 290,90; 300,80" dur="20s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="0 315 95; 120 315 95; 0 315 95" dur="26s" repeatCount="indefinite" additive="sum" />
      </polygon>

      <polygon points="20,0 40,35 0,35" fill="none" stroke={`${MIST}0.1)`} strokeWidth="1" transform="translate(700, 500)">
        <animateTransform attributeName="transform" type="translate" values="700,500; 720,480; 700,500" dur="24s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="0 715 515; -180 715 515; 0 715 515" dur="30s" repeatCount="indefinite" additive="sum" />
      </polygon>

      <g transform="translate(600, 100)" stroke={`${PEARL}0.12)`} strokeWidth="1.5" strokeLinecap="round">
        <line x1="-12" y1="0" x2="12" y2="0" />
        <line x1="0" y1="-12" x2="0" y2="12" />
        <animateTransform attributeName="transform" type="translate" values="600,100; 615,85; 600,100" dur="16s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="0 600 100; 90 600 100; 0 600 100" dur="20s" repeatCount="indefinite" additive="sum" />
      </g>

      <g transform="translate(200, 450)" stroke={`${MIST}0.11)`} strokeWidth="1.5" strokeLinecap="round">
        <line x1="-10" y1="0" x2="10" y2="0" />
        <line x1="0" y1="-10" x2="0" y2="10" />
        <animateTransform attributeName="transform" type="translate" values="200,450; 185,465; 200,450" dur="19s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="45 200 450; 135 200 450; 45 200 450" dur="22s" repeatCount="indefinite" additive="sum" />
      </g>

      <circle cx="45%" cy="40%" r="50" fill="none" stroke={`${PEARL}0.09)`} strokeWidth="1" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" values="0 45 40; 360 45 40" dur="40s" repeatCount="indefinite" />
        <animate attributeName="r" values="50;58;50" dur="15s" repeatCount="indefinite" />
      </circle>

      <circle cx="15%" cy="45%" r="3" fill={`${PEARL}0.14)`}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 8,-12; 0,0" dur="10s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.14;0.06;0.14" dur="10s" repeatCount="indefinite" />
      </circle>

      <circle cx="65%" cy="25%" r="2.5" fill={`${MIST}0.14)`}>
        <animateTransform attributeName="transform" type="translate" values="0,0; -6,10; 0,0" dur="12s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.14;0.05;0.14" dur="12s" repeatCount="indefinite" />
      </circle>

      <circle cx="90%" cy="50%" r="2" fill={`${SILVER}0.12)`}>
        <animateTransform attributeName="transform" type="translate" values="0,0; -10,-8; 5,4; 0,0" dur="14s" repeatCount="indefinite" />
      </circle>

      <circle cx="35%" cy="90%" r="3.5" fill={`${MIST}0.12)`}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 12,5; 0,0" dur="11s" repeatCount="indefinite" />
      </circle>

      <circle cx="70%" cy="92%" r="2" fill={`${PEARL}0.1)`}>
        <animateTransform attributeName="transform" type="translate" values="0,0; -8,3; 4,-6; 0,0" dur="13s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export default AnimatedBackground;
