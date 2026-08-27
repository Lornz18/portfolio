"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useChat } from "./chat-context";

const navItems = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contacts" },
];

export default function Header() {
  const { openChat } = useChat();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <div className="shell">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled
              ? "mt-3 rounded-2xl border border-line bg-background/80 px-4 py-3 backdrop-blur-xl"
              : "mt-0 border border-transparent px-2 py-6"
          }`}
        >
          {/* Identity — avatar, name, email */}
          <Link
            href="/"
            onClick={() => setNavOpen(false)}
            className="flex items-center gap-3 group"
          >
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-line bg-surface font-display text-sm font-medium text-foreground transition-colors duration-300 group-hover:border-accent">
              AM
            </span>
            <span className="flex flex-col gap-1 leading-none">
              <span className="text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
                Audie Malaluan
              </span>
              <span className="label hidden sm:block">
                audielorenz18@gmail.com
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="label cursor-pointer rounded-full px-4 py-2 transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/sample"
              className="label rounded-full px-4 py-2 transition-colors duration-300 hover:text-foreground"
            >
              Sample
            </a>
            <button
              onClick={openChat}
              className="ml-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors duration-300 hover:bg-accent"
            >
              Let&apos;s talk
              <ArrowUpRight size={15} />
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setNavOpen((p) => !p)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-foreground lg:hidden"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`pointer-events-auto fixed inset-0 -z-10 bg-background transition-all duration-500 lg:hidden ${
          navOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`display display-lg py-3 text-muted transition-all duration-500 hover:text-foreground ${
                navOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: navOpen ? `${i * 70}ms` : "0ms" }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/sample"
            className={`display display-lg py-3 text-muted transition-all duration-500 hover:text-foreground ${
              navOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: navOpen ? `${navItems.length * 70}ms` : "0ms",
            }}
          >
            Sample
          </a>
          <button
            onClick={() => {
              setNavOpen(false);
              openChat();
            }}
            className="btn-accent mt-8"
          >
            Let&apos;s talk
            <ArrowUpRight size={16} />
          </button>
          <span className="label mt-8">audielorenz18@gmail.com</span>
        </nav>
      </div>
    </header>
  );
}
