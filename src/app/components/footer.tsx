// components/Footer.tsx
"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-primary py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left Section: Branding */}
        <div>
          <h1 className="text-2xl font-bold">Audie.dev</h1>
          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Middle Section: Social Links */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/audierorentsu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-all duration-300 text-xl"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/rorentsu18"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-all duration-300 text-xl"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/audie-malaluan-14a5b2246/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-all duration-300 text-xl"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="mailto:audielorenz18@gmail.com"
            className="hover:text-secondary transition-all duration-300 text-xl"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>

        {/* Optional Quick Links */}
        <div className="flex flex-col gap-2 text-sm">
          <a
            href="#services"
            className="hover:text-secondary transition-all duration-300"
            onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
          >
            Services
          </a>
          <a
            href="#projects"
            className="hover:text-secondary transition-all duration-300"
            onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-secondary transition-all duration-300"
            onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
