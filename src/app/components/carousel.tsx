"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "BidsnBuys",
    description: "E-commerce platform integrated with AI bidding system.",
    image: "/project 1.png",
  },
  {
    title: "Serverless Secure",
    description: "Cloud-based app built with Express.js and AWS Lambda.",
    image: "/project 1.png",
  },
  {
    title: "Portfolio Site",
    description: "Responsive personal portfolio using Next.js and Tailwind.",
    image: "/project 1.png",
  },
  {
    title: "Music Player",
    description: "Interactive music player built with React and TypeScript.",
    image: "/project 1.png",
  },
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // --- AUTOPLAY ---
  useEffect(() => {
    if (isHovered) return; // pause autoplay when hovered
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isHovered]);

  // --- SCROLL CONTROL ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollTimeout.current) return; // throttle scroll

      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 500); // debounce delay
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // --- NAVIGATION HELPERS ---
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div
      className="relative w-full flex justify-center items-center h-[500px] mt-16 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {projects.map((proj, i) => {
        // offset for horizontal stacking
        const offset = (i - activeIndex + projects.length) % projects.length;
        const zIndex = projects.length - offset;
        const scale = 1 - offset * 0.06;
        const translateX = offset * 80; // spacing between cards
        const opacity = offset > 2 ? 0 : 1 - offset * 0.2;

        return (
          <div
            key={i}
            className="absolute w-[380px] md:w-[600px] h-[500px] bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ease-in-out group p-[1rem]"
            style={{
              transform: `translateX(${translateX}px) scale(${scale})`,
              zIndex,
              opacity,
            }}
          >
            <div className="relative w-full h-2/3 rounded-2xl overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-4 relative">
              <h3 className="text-xl font-semibold text-white">
                {proj.title}
              </h3>
              <p className=" text-gray-400 text-sm mt-2">{proj.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
