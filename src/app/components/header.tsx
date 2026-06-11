"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contacts" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const goTo = (id: string) => {
    setNavOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className={`container flex items-center justify-between pointer-events-auto transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          className="font-bold text-xl tracking-tight"
          onClick={() => setNavOpen(false)}
        >
          audie<span className="text-gradient">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className={`hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/40" : ""
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="cursor-pointer px-4 py-1.5 rounded-full text-sm text-secondary hover:text-light hover:bg-white/5 transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/sample"
            className="px-4 py-1.5 rounded-full text-sm text-secondary hover:text-light hover:bg-white/5 transition-all duration-300"
          >
            Sample Features
          </a>
          <button
            onClick={() => goTo("contacts")}
            className="cursor-pointer ml-2 px-5 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-500 hover:opacity-90 transition-opacity"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setNavOpen((p) => !p)}
          className="lg:hidden glass rounded-full p-2.5 text-light"
          aria-label={navOpen ? "Close menu" : "Open menu"}
        >
          {navOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 -z-10 bg-primary/90 backdrop-blur-2xl transition-all duration-500 pointer-events-auto ${
          navOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-2">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`text-3xl font-semibold text-secondary hover:text-light py-3 transition-all duration-500 ${
                navOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: navOpen ? `${i * 75}ms` : "0ms" }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/sample"
            className={`text-3xl font-semibold text-secondary hover:text-light py-3 transition-all duration-500 ${
              navOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: navOpen ? `${navItems.length * 75}ms` : "0ms" }}
          >
            Sample Features
          </a>
        </nav>
      </div>
    </header>
  );
}
