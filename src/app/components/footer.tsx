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
  const goTo = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 overflow-hidden">
      {/* Glow accent */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-64 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative py-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              audie<span className="text-gradient">.dev</span>
            </h2>
            <p className="text-sm text-secondary mt-2 max-w-xs">
              Building modern, high-performing web experiences from concept to
              deployment.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Services", id: "services" },
              { label: "Projects", id: "projects" },
              { label: "Testimonials", id: "testimonials" },
              { label: "Contact", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="cursor-pointer text-secondary hover:text-light transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass glass-hover w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-light"
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-secondary">
          <p>© {new Date().getFullYear()} Audie Malaluan. All rights reserved.</p>
          <p>
            Built with <span className="text-light">Next.js</span>,{" "}
            <span className="text-light">Three.js</span> &{" "}
            <span className="text-light">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
