// components/Header.tsx
"use client";
import React from "react";

export default function Header() {
  const [navOpen, setNavOpen] = React.useState(false);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  return (
    <header className="text-[20px] text-secondary container flex items-center justify-between relative">
      <h1>Audie.dev</h1>

      <div className="">
        <div
          className="nav flex flex-col lg:flex-row items-center gap-[.5rem] justify-center lg:hidden "
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`absolute bottom-[-54rem] w-full h-[100vh]
          bg-white/30 backdrop-blur-md backdrop-brightness-110 z-[999]
          transition-all duration-300 shadow-lg text-light lg:text-secondary lg:relative lg:left-0 lg:bg-primary lg:top-0 lg:h-full lg:p-0 lg:shadow-none
          ${navOpen ? "left-0" : "-left-full"}`}
        >
          <ul className="border-b-2 border-primary p-5 flex flex-col lg:flex-row items-center justify-between gap-8">
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </li>
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Projects
            </li>
            {/* <li className="cursor-pointer hover:text-light transition-all transform-gpu">
              Testimonials
            </li> */}
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contacts
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
