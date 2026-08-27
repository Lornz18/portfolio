"use client";
import React from "react";

const socials = [
  {
    href: "https://www.facebook.com/audierorentsu",
    icon: "fab fa-facebook-f",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/rorentsu18",
    icon: "fab fa-instagram",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/audie-malaluan-14a5b2246/",
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    href: "mailto:audielorenz18@gmail.com",
    icon: "fas fa-envelope",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="shell pb-6">
      <div className="pt-24 md:pt-32">
        {/* Socials */}
        <div className="flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <i className={s.icon}></i>
            </a>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-16 overflow-hidden border-t border-line pt-8">
          <p className="display select-none text-center leading-none text-surface-2 [font-size:clamp(3.5rem,17vw,14rem)]">
            audie.dev
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="label">
            © {new Date().getFullYear()} Audie Malaluan
          </p>
          <p className="label">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
