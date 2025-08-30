// components/ui/Divider.tsx
import React from "react";

export default function Divider() {
  return (
    <svg
      viewBox="0 0 1440 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full h-28 text-rose-400"
    >
      <defs>
        {/* Gradient biar lebih hidup */}
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* Garis detak jantung */}
      <path
        d="
          M0,100 
          L200,100 
          C210,100 220,60 230,60
          C240,60 245,140 250,140
          C255,140 265,80 270,80
          C275,80 280,100 290,100
          L700,100
          C705,100 710,60 715,60
          C720,60 725,140 730,140
          C735,140 745,80 750,80
          C755,80 760,100 770,100
          L1240,100 
          Q1260,90 1280,100
          L1440,100
          L1440,200 L0,200 Z"
        fill="url(#pulseGradient)"
        fillOpacity="0.3"
      />

      {/* Garis outline */}
      <path
        d="
          M0,100 
          L200,100 
          C210,100 220,60 230,60
          C240,60 245,140 250,140
          C255,140 265,80 270,80
          C275,80 280,100 290,100
          L700,100
          C705,100 710,60 715,60
          C720,60 725,140 730,140
          C735,140 745,80 750,80
          C755,80 760,100 770,100
          L1240,100 
          Q1260,90 1280,100
          L1440,100"
        stroke="url(#pulseGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Love icon kecil di tengah */}
      <path
        d="M720 95
           C715 85, 700 85, 700 100
           C700 115, 720 125, 720 135
           C720 125, 740 115, 740 100
           C740 85, 725 85, 720 95 Z"
        fill="url(#pulseGradient)"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}
