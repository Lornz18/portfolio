// components/Header.tsx
"use client";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = React.useState(false);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Reset to default
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <header className="text-[20px] text-secondary container flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">
        Audie.dev
      </Link>

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
          className={`absolute top-[5rem] w-full h-full
          bg-white/30 backdrop-blur-md backdrop-brightness-110 z-[999]
          transition-all duration-300 shadow-lg text-light lg:text-secondary lg:relative lg:left-0 lg:bg-primary lg:top-0 lg:h-full lg:p-0 lg:shadow-none
          ${navOpen ? "left-0" : "-left-full"}`}
        >
          <ul className="border-b-2 border-primary p-5 flex flex-col lg:flex-row items-center justify-between gap-8">
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === "/sample") {
                  window.location.href = "/#services";
                  // After navigation, the browser will scroll to the #contacts section.
                  // No need to call scrollIntoView here since the anchor will handle it.
                  // toggleNav() is not needed since the page reloads.
                } else {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                  toggleNav();
                }
              }}
            >
              Services
            </li>
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === "/sample") {
                  window.location.href = "/#projects";
                  // After navigation, the browser will scroll to the #contacts section.
                  // No need to call scrollIntoView here since the anchor will handle it.
                  // toggleNav() is not needed since the page reloads.
                } else {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                  toggleNav();
                }
              }}
            >
              Projects
            </li>
            {/* <li className="cursor-pointer hover:text-light transition-all transform-gpu">
              Testimonials
            </li> */}
            <li className="cursor-pointer hover:text-light transition-all transform-gpu">
              <a href="/sample">Sample Features</a>
            </li>
            <li
              className="cursor-pointer hover:text-light transition-all transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === "/sample") {
                  window.location.href = "/#contacts";
                  // After navigation, the browser will scroll to the #contacts section.
                  // No need to call scrollIntoView here since the anchor will handle it.
                  // toggleNav() is not needed since the page reloads.
                } else {
                  document
                    .getElementById("contacts")
                    ?.scrollIntoView({ behavior: "smooth" });
                  toggleNav();
                }
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
