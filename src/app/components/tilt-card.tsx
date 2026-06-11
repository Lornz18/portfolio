"use client";
import React, { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Wraps content in a card that tilts in 3D toward the cursor on hover. */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.25s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
