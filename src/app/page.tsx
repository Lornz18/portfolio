"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(0);
  const [loading, setLoading] = React.useState(false);

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <div className="container">
        <div
          className="text-center max-w-3xl mx-auto my-8 flex flex-col items-center gap-[2rem]"
          data-aos="fade-up"
        >
          <div>
            <h1 className="text-3xl md:text-[48px]">
              Crafting intuitive and modern web interfaces.
            </h1>
            <p className="md:text-[20px] text-secondary">
              Let&apos;s create seamless, user-centered designs that bring your
              ideas to life. Explore my work and let&apos;s build something
              amazing together.
            </p>
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-8"
            data-aos="zoom-in"
          >
            <button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </button>
            <button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="my-[10rem]" id="services">
          <div
            className="text-center flex flex-col items-center mb-[2rem]"
            data-aos="fade-up"
          >
            <span className="b-title">Service</span>
            <h1 className="text-[32px]">What I Do</h1>
            <p className="text-[16px] text-secondary">
              Bringing designs to life with clean, responsive, and
              high-performing code.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
            <Image
              src="/service.jpg"
              alt="hero"
              width={1000}
              height={1000}
              className="w-fit max-h-[30rem] lg:w-[40%] lg:max-h-[50rem] rounded-2xl object-contain lg:object-cover shadow-lg shadow-secondary/50"
              priority
              data-aos="zoom-in"
            />
            <ul className="w-full lg:w-[50%]">
              {[
                {
                  title: "Responsive Web Development",
                  icon: <HomeIcon className="w-6 h-6" />,
                  description:
                    "Building mobile-first websites using modern frameworks.",
                },
                {
                  title: "UI/UX Design",
                  icon: <HomeIcon className="w-6 h-6" />,
                  description:
                    "Designing intuitive interfaces and user experiences for maximum engagement.",
                },
                {
                  title: "Performance Optimization",
                  icon: <HomeIcon className="w-6 h-6" />,
                  description:
                    "Improving speed, responsiveness, and efficiency for better user retention.",
                },
                {
                  title: "Accessibility",
                  icon: <HomeIcon className="w-6 h-6" />,
                  description:
                    "Making websites usable for everyone, including users with disabilities.",
                },
                {
                  title: "Consulting",
                  icon: <HomeIcon className="w-6 h-6" />,
                  description:
                    "Guiding development teams and businesses to achieve scalable solutions.",
                },
              ].map((service, index) => (
                <li
                  key={index}
                  className="py-[1rem] relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div
                    className="flex relative items-center justify-between z-10 cursor-pointer bg-primary"
                    onClick={() => toggleDropdown(index)}
                  >
                    <div className="flex items-center gap-4">
                      {service.icon}
                      <h2 className="text-[20px] text-light">
                        {service.title}
                      </h2>
                    </div>
                    <XMarkIcon
                      className={`w-6 h-6 text-light transition-all duration-800 ${
                        openDropdown === index ? "rotate-45" : ""
                      }`}
                    />
                  </div>

                  <div
                    ref={contentRef}
                    className={`overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{
                      maxHeight:
                        openDropdown === index
                          ? `${contentRef.current?.scrollHeight}px`
                          : "10px",
                    }}
                  >
                    <p className="text-secondary py-[1rem]">
                      {service.description}
                    </p>
                  </div>

                  <span className="block w-full bg-light h-[.1rem]"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-[10rem]" id="projects">
          <div
            className="text-left flex flex-col items-start mb-[2rem]"
            data-aos="fade-up"
          >
            <span className="b-title">Projects</span>
            <h1 className="text-[32px]">Get inspired by my work</h1>
            <p className="text-[16px] text-secondary">
              Some of the work I’ve built — from concept to clean, responsive
              interfaces.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                image: "project 1.png",
                name: "BidsnBuys",
                feature: [
                  "AI",
                  "E-commerce",
                  "Automation",
                  "Marketing",
                  "Smartlisting",
                ],
                description: `BidsnBuys.com is a soon-to-launch e-commerce platform designed to automate marketing across platforms like Facebook and Google. It features AI-powered tools that can generate product listings directly from images. The site aims to make online selling faster, smarter, and more efficient for all users.`,
              },
              {
                image: "project 2.png",
                name: "Water District Portal",
                description:
                  "A unified web and mobile app platform for managing water district services. Both platforms are connected to a shared backend for real-time synchronization. The mobile app includes an offline mode for uninterrupted access to key features.",
                feature: [
                  "Billing",
                  "Reports",
                  "Payments",
                  "Offline",
                  "Support",
                ],
              },
            ].map((item, idx) => (
              <div key={item.image} data-aos="fade-up">
                <div className="bg-light text-primary rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300 p-4 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                    <div className="w-full lg:w-[45%] h-60 md:h-80 rounded-xl shadow-2xl overflow-hidden mb-4 lg:mb-0">
                      <Image
                        src={`/${item.image}`}
                        alt={item.image}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover object-top"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="w-full lg:w-[55%] flex flex-col justify-between">
                      <h2 className="text-xl md:text-2xl font-semibold mb-2">
                        {item.name}
                      </h2>
                      <p className="text-secondary whitespace-pre-line mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.feature?.map((feature, key) => (
                          <span
                            key={key}
                            className="py-2 px-4 md:px-5 bg-primary text-light rounded-2xl text-xs md:text-sm break-words"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-light py-8">
        <div className="container">
          <div
            className="text-center flex flex-col items-center mb-[2rem]"
            data-aos="fade-up"
          >
            <span className="b-title">Testimonials</span>
            <h1 className="text-[32px] text-primary">Why Me</h1>
            <p className="text-[16px] text-secondary">
              What clients and collaborators say about working with me.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
          >
            {[
              {
                name: "Alex Johnson",
                feedback:
                  "Working with Audie was a fantastic experience. The website exceeded our expectations and was delivered on time.",
                role: "Product Manager, TechCorp",
              },
              {
                name: "Maria Lee",
                feedback:
                  "Audie’s attention to detail and design sense brought our vision to life. Highly recommended!",
                role: "Founder, StartupX",
              },
              {
                name: "James Smith",
                feedback:
                  "Professional, responsive, and creative. The end result was a beautiful, high-performing site.",
                role: "CTO, InnovateNow",
              },
            ].map((testimonial, idx, arr) => (
              <div
                key={idx}
                className={`p-6 rounded-xl shadow bg-white flex flex-col h-full hover:shadow-2xl hover:scale-105 transition-all duration-300
                    ${
                      arr.length % 3 === 1 && idx === arr.length - 1
                        ? "lg:col-start-2"
                        : ""
                    }
                    ${
                      arr.length % 3 === 2 && idx === arr.length - 1
                        ? "lg:col-start-2"
                        : ""
                    }
                  `}
              >
                <p className="text-secondary text-center mb-4 flex-1">
                  "{testimonial.feedback}"
                </p>
                <div className="flex flex-col items-center mt-4">
                  <div className="font-semibold text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="container py-12 px-4 mx-auto" id="contacts">
        <div className="grid md:grid-cols-2 gap-12 items-start py-8">
          {/* Left Content */}
          <div data-aos="fade-up" className="space-y-6">
            <div
              className="text-left flex flex-col items-start mb-[2rem]"
              data-aos="fade-up"
            >
              <span className="b-title">Contacts</span>
              <h1 className="text-[32px]">Get In Touch</h1>
              <p className="text-[16px] text-secondary">
                If you have any questions or would like to discuss your ideas in
                more detail, please don’t hesitate to reach out to our dedicated
                team through the contact information below.
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-col">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-light">Email</span>
                  <a
                    href="mailto:audielorenz18@gmail.com"
                    className="text-secondary hover:text-light transition-all duration-300"
                  >
                    audielorenz18@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-light">Phone</span>
                  <a
                    href="tel:+639158158134"
                    className="text-secondary hover:text-light transition-all duration-300"
                  >
                    +63 (915) 8158134
                  </a>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-light">Address</span>
                  <span className="text-secondary text-right">
                    Riverside Park Subd. Brgy. Maligaya Dolores, Quezon
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 mb-6 md:mt-6">
                <a
                  href="https://www.facebook.com/audierorentsu"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600 text-xl transition-all duration-300"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/rorentsu18"
                  target="_blank"
                  className="text-gray-600 hover:text-pink-500 text-xl transition-all duration-300"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/audie-malaluan-14a5b2246"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-700 text-xl transition-all duration-300"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          {/* Toast Notification */}
          <div
            id="custom-toast"
            className="fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg bg-primary text-light text-base font-semibold transition-all duration-300 opacity-0 pointer-events-none"
            style={{ minWidth: 220 }}
            aria-live="polite"
          ></div>

          <form
            className="bg-white p-8 rounded-2xl shadow-xl space-y-6 text-primary"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const form = e.currentTarget;
              const formData = new FormData(form);
              const name = formData.get("name") as string;
              const email = formData.get("email") as string;
              const message = formData.get("message") as string;

              // Toast helper
              const showToast = (msg: string, success = true) => {
                const toast = document.getElementById("custom-toast");
                if (toast) {
                  toast.textContent = msg;
                  toast.className =
                    "fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-base font-semibold transition-all duration-300 " +
                    (success
                      ? "bg-primary text-light"
                      : "bg-red-600 text-white") +
                    " opacity-100 pointer-events-auto";
                  setTimeout(() => {
                    toast.className = toast.className
                      .replace("opacity-100", "opacity-0")
                      .replace("pointer-events-auto", "pointer-events-none");
                  }, 2500);
                }
              };

              try {
                const res = await fetch("/api/send-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, email, message }),
                });
                if (res.ok) {
                  showToast("Email sent successfully!", true);
                  form.reset();
                } else {
                  showToast("Failed to send email. Please try again.", false);
                }
              } catch {
                showToast("Failed to send email. Please try again.", false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-secondary"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-secondary"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-secondary"
                placeholder="How can we help you?"
                style={{ resize: "none" }}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary border-[.1px] border-primary hover:bg-light hover:text-primary text-light font-semibold px-6 py-3 rounded-lg transition-all duration-300 self-end w-full cursor-pointer flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-light"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
