"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Reveal from "./components/reveal";

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "PostgreSQL",
  "Firebase",
  "WebSockets",
  "AI Integration",
  "CI/CD",
  "DigitalOcean",
  "Vercel",
];

const services = [
  {
    title: "Responsive Web Development",
    description:
      "Mobile-first websites built on modern frameworks that look and feel right on every device.",
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive interfaces and user flows designed for clarity and engagement.",
  },
  {
    title: "Performance Optimization",
    description:
      "Speed, responsiveness and efficiency tuned for better user retention.",
  },
  {
    title: "Accessibility",
    description:
      "Sites that stay usable for everyone, including people using assistive technology.",
  },
  {
    title: "Consulting",
    description:
      "Guiding teams and businesses toward scalable, maintainable solutions.",
  },
];

const facts = [
  "(Founding developer at AgentiumLabs)",
  "(Builds products from zero to one)",
  "(AI platforms and real-time apps)",
  "(Based in Quezon, Philippines)",
];

interface Project {
  image: string;
  name: string;
  link: string;
  category: string;
  summary: string;
  description: string;
  feature: string[];
  isProfessional?: boolean;
  isServerlessSecure?: boolean;
}

const projects: Project[] = [
  {
    image: "agentiumlabs.png",
    name: "AgentiumLabs Website",
    link: "https://agentiumlabs.ai/",
    category: "Enterprise AI",
    isProfessional: true,
    summary:
      "The official website for AgentiumLabs, showcasing the company’s AI platform focused on building agentic AI systems, automation infrastructure, and enterprise AI solutions.",
    description: `Key Contributions:\n• Developed and maintained frontend components for the company website.\n• Implemented responsive UI to ensure compatibility across devices.\n• Optimized layout structure and performance for improved user experience.\n• Assisted with deployment workflows and infrastructure setup.`,
    feature: [
      "React / Next.js",
      "TypeScript",
      "Responsive Web Design",
      "CI/CD",
      "DigitalOcean",
    ],
  },
  {
    image: "ricerca.png",
    name: "Ricerca AI Research Platform",
    link: "https://ricerca.agentiumlabs.ai/",
    category: "AI Research",
    isProfessional: true,
    summary:
      "Ricerca is an AI-powered research discovery platform designed to help users explore and discover machine learning research papers through an aggregated interface.",
    description: `Key Contributions:\n• Developed and improved frontend features for browsing research papers.\n• Implemented UI components for research listings and search results.\n• Integrated APIs and backend services to retrieve research data.\n• Improved responsiveness and usability of the platform.`,
    feature: [
      "React / Next.js",
      "API Integration",
      "PostgreSQL",
      "CI/CD",
      "Cloud Infrastructure",
    ],
  },
  {
    image: "project 4.png",
    name: "Online Clinic Appointment",
    link: "https://dental-appt.vercel.app/",
    category: "Healthcare",
    summary:
      "A fully responsive clinic appointment site where patients view and book appointments in real time, with WebSockets driving live availability and notifications.",
    description:
      "A fully responsive online clinic appointment website that allows patients to view and book appointments in real time. Built using HTML, CSS, JavaScript, and TailwindCSS, the site uses WebSockets to provide live updates for appointment availability and notifications.",
    feature: [
      "Responsive Design",
      "TailwindCSS",
      "WebSockets",
      "Live Notifications",
    ],
  },
  {
    image: "project 5.png",
    name: "Quizify",
    link: "https://quizify-dev.vercel.app/",
    category: "AI / EdTech",
    summary:
      "A quiz platform that uses AI to generate questions from the notes you give it, with real-time updates and a clean, responsive interface.",
    description:
      "A fully responsive quiz platform that uses AI to generate questions based on user-provided notes. Built with HTML, CSS, JavaScript, and TailwindCSS, it offers real-time updates and a smooth interactive experience.",
    feature: [
      "Responsive Design",
      "TailwindCSS",
      "AI Question Generation",
      "Real-Time Updates",
    ],
  },
  {
    image: "project 1.png",
    name: "BidsnBuys",
    link: "https://bidsnbuys.com/",
    category: "E-commerce",
    isServerlessSecure: true,
    summary:
      "A professional e-commerce platform that automates marketing across Facebook and Google, with AI tools that generate product listings straight from images.",
    description:
      "BidsnBuys.com is a professional e-commerce platform designed to automate marketing across platforms like Facebook and Google. Built on a serverless and secure architecture, it features AI-powered tools that generate product listings directly from images.",
    feature: ["AI", "E-commerce", "Automation"],
  },
  {
    image: "project 2.png",
    name: "Water District Portal",
    link: "https://test-539c3.web.app/",
    category: "Utilities",
    summary:
      "A unified web and mobile platform for water district services, sharing one backend for real-time sync — with an offline mode on mobile.",
    description:
      "A unified web and mobile app platform for managing water district services. Both platforms are connected to a shared backend for real-time synchronization. The mobile app includes an offline mode for uninterrupted access to key features.",
    feature: ["Billing", "Reports", "Payments", "Offline", "Support"],
  },
  {
    image: "wondertour.png",
    name: "WonderTour",
    link: "https://wondertour-acac9.web.app/",
    category: "Travel",
    summary:
      "A responsive tourism site showcasing destinations, packages and booking options, deployed on Firebase.",
    description:
      "A fully responsive tourism website showcasing travel destinations, packages, and booking options. Built using HTML, CSS, JavaScript, and TailwindCSS, and hosted on Firebase for fast and secure deployment.",
    feature: [
      "Responsive Design",
      "TailwindCSS",
      "Destination Showcase",
      "Firebase Hosting",
    ],
  },
];

/** Derived from the data above so these can never drift out of date. */
const stats = [
  { value: projects.length, label: "Projects shipped" },
  {
    value: projects.filter((p) => p.isProfessional).length,
    label: "Professional platforms",
  },
  { value: techStack.length, label: "Technologies" },
];

/** Splits a headline into per-character spans so it can reveal letter by letter. */
function SplitWords({
  text,
  delay = 0,
  step = 26,
}: {
  text: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  let index = -1;
  return (
    <>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => {
              index += 1;
              return (
                <span
                  key={ci}
                  className="char"
                  style={{ animationDelay: `${delay + index * step}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {/* The space must sit *between* the word blocks — a trailing space
              inside an inline-block gets collapsed away. */}
          {wi < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

const num = (i: number) => `( ${String(i + 1).padStart(2, "0")} )`;

export default function Home() {
  const [loading, setLoading] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="shell pb-6">
      {/* ====================== HERO ====================== */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden rounded-[20px] pb-8 pt-32">
        <div className="flex flex-col gap-8">
          <p
            className="label fade-up flex items-center gap-2.5"
            style={{ animationDelay: "80ms" }}
          >
            <span className="dot" />
            Available for work
          </p>

          <h1 className="display display-hero">
            <SplitWords text="Full Stack Developer" delay={200} />
          </h1>

          <p
            className="fade-up max-w-3xl text-lg text-muted md:text-2xl"
            style={{ animationDelay: "760ms" }}
          >
            I turn ideas into products people can actually use — AI-powered
            platforms, real-time applications, and everything from the first
            commit to the deploy. Founding developer at AgentiumLabs.
          </p>

          <div
            className="fade-up mt-4 flex flex-wrap items-end justify-between gap-6"
            style={{ animationDelay: "900ms" }}
          >
            <div className="flex flex-wrap gap-3">
              <button className="btn-accent" onClick={() => scrollTo("projects")}>
                View work
                <ArrowUpRight size={17} />
              </button>
              <button className="btn-outline" onClick={() => scrollTo("contacts")}>
                Get in touch
              </button>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <span className="label">Scroll to explore</span>
              <button
                onClick={() => scrollTo("projects")}
                aria-label="Scroll to work"
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== TECH MARQUEE ====================== */}
      <section className="my-4 overflow-hidden rounded-[20px] border border-line bg-surface py-5">
        <div className="flex w-max animate-marquee">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-8 whitespace-nowrap px-8">
              <span className="label">{tech}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ====================== WORK ====================== */}
      <section className="pt-24 md:pt-32" id="projects">
        <Reveal className="mb-8 flex items-end justify-between gap-6">
          <p className="label">Selected work</p>
          <p className="label">{num(projects.length - 1)}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((item, idx) => (
            <Reveal
              key={item.name}
              delay={(idx % 2) * 90}
              className={item.isProfessional ? "md:col-span-2" : ""}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project group relative block h-full overflow-hidden rounded-[20px] border border-line bg-surface transition-colors duration-500 hover:border-dim ${
                  item.isProfessional
                    ? "md:grid md:grid-cols-2 md:items-stretch"
                    : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    item.isProfessional
                      ? "aspect-[16/10] md:aspect-auto md:min-h-[26rem]"
                      : "aspect-[4/3] sm:aspect-[601/560]"
                  }`}
                >
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    fill
                    sizes={
                      item.isProfessional
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                  {/* Mono meta */}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="chip">{num(idx)}</span>
                    <span className="chip">{item.category}</span>
                    {item.isProfessional && (
                      <span className="chip text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        AgentiumLabs
                      </span>
                    )}
                    {item.isServerlessSecure && (
                      <span className="chip">Serverless Secure</span>
                    )}
                  </div>
                </div>

                {/* Detail */}
                {item.isProfessional ? (
                  <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
                    <h3 className="display text-2xl md:text-3xl">{item.name}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {item.summary}
                    </p>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-dim">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.feature.map((feature) => (
                        <span
                          key={feature}
                          className="label-sm rounded-full border border-line px-3 py-1.5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <span className="label flex items-center gap-1.5 text-foreground">
                      Visit live site
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                ) : (
                  // .project-bar overlays the image only where hover exists and
                  // there is room; elsewhere the detail is always open, so the
                  // bar sits in flow beneath the image instead of covering it.
                  <div className="project-bar border-t border-line bg-surface/95 px-6 py-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="display text-lg">{item.name}</h3>
                      <ArrowUpRight
                        size={18}
                        className="flex-none text-dim transition-colors duration-300 group-hover:text-accent"
                      />
                    </div>

                    <div className="project-detail">
                      <div>
                        <p className="pt-4 text-sm leading-relaxed text-muted">
                          {item.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                          {item.feature.map((feature) => (
                            <span
                              key={feature}
                              className="label-sm rounded-full border border-line px-3 py-1.5"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ABOUT / SERVICES / TESTIMONIAL — sticky rail ============ */}
      <section className="pt-24 md:pt-32" id="about">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16 xl:grid-cols-[1fr_22rem]">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {/* Height is capped so the panel *and* its caption stay on screen
                for the whole time the block is pinned. */}
            <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-line bg-surface p-7 md:p-10 lg:h-[calc(100svh-17rem)] lg:gap-0">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <p className="label">Full stack developer</p>
                <p className="label">Quezon, Philippines</p>
              </div>

              <p className="display relative leading-[0.9] [font-size:clamp(2.5rem,7vw,5.5rem)]">
                Audie
                <br />
                Malaluan
              </p>

              <div className="relative grid grid-cols-3 gap-4 border-t border-line pt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-2">
                    <span className="display text-3xl md:text-4xl">
                      {String(stat.value).padStart(2, "0")}
                    </span>
                    <span className="label-sm leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-4 flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="display text-lg">Design → Code → Ship</p>
                <p className="label mt-2">From concept to deployment</p>
              </div>
              <p className="label flex items-center gap-2.5">
                <span className="dot" />
                Available for work
              </p>
            </div>
          </div>

          {/* Scrolling rail */}
          <div className="flex flex-col gap-24">
            {/* About */}
            <Reveal className="flex flex-col gap-5">
              <p className="label">About</p>
              <p className="text-[15px] leading-relaxed text-muted">
                I build web products end to end — from the first wireframe to the
                production deploy. Most of my work sits where design meets
                engineering: interfaces that stay fast and readable, backed by
                APIs and infrastructure that hold up. As a founding developer at
                AgentiumLabs I helped take an agentic AI platform and company
                site from nothing to working products.
              </p>
              <div className="mt-2 flex flex-col gap-2.5">
                {facts.map((fact) => (
                  <p key={fact} className="label">
                    {fact}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Services */}
            <Reveal className="flex flex-col gap-5" id="services">
              <p className="label">Services</p>
              <div className="flex flex-col">
                {services.map((service, i) => (
                  <div
                    key={service.title}
                    className="group flex flex-col gap-2 border-t border-line py-5 last:border-b"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="label flex-none">{num(i)}</span>
                      <h3 className="display text-lg transition-colors duration-300 group-hover:text-accent">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Testimonial */}
            <Reveal className="flex flex-col gap-5" id="testimonials">
              <p className="label">Testimonials</p>
              <blockquote className="display text-lg leading-snug">
                &ldquo;Audie has been one of the founding developers on our team
                and played a key role in helping us bring our technical vision to
                life.&rdquo;
              </blockquote>
              <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
                <p>
                  From the early stages of development, he was instrumental in
                  building our core products. This includes the website
                  infrastructure and the AI agentic platform that were developed
                  from the ground up and turned into working solutions.
                </p>
                <p>
                  Throughout the time we worked together, Audie consistently
                  demonstrated strong technical ability, initiative, and speed in
                  execution. He has the ability to quickly understand complex
                  technical requirements and translate them into practical
                  implementations. One of the qualities that stood out the most
                  was his ability to deliver outputs efficiently while
                  maintaining reliability in his work.
                </p>
                <p>
                  Beyond technical implementation, Audie also showed ownership of
                  the projects he handled. Building products from zero to one
                  requires both technical depth and adaptability, and he handled
                  those challenges well while contributing meaningfully to the
                  team&apos;s progress.
                </p>
                <p>
                  His knowledge, work ethic, and ability to execute make him a
                  valuable member of any development team. I strongly recommend
                  him to organizations that are looking for a developer who can
                  contribute quickly, take initiative, and help build products
                  from the ground up.
                </p>
              </div>

              <div className="mt-2 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-surface font-display text-sm">
                  AO
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] text-foreground">
                    Armielyn Obinguar
                  </span>
                  <span className="label">AgentiumLabs</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section className="pt-24 md:pt-32" id="contacts">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="label">Contact</p>
          <h2 className="display display-lg max-w-4xl">
            I&apos;m not just here to write code; I&apos;m here to build things
            people actually use.
          </h2>
          <p className="max-w-lg text-lg text-muted">
            Have a project, a question, or an idea you want to talk through?
            Reach out and I&apos;ll get back to you.
          </p>
        </Reveal>

        {/* Toast */}
        <div
          id="custom-toast"
          className="fixed right-6 top-6 z-[60] rounded-xl px-6 py-4 text-base font-medium opacity-0 shadow-lg transition-all duration-300 pointer-events-none"
          style={{ minWidth: 220 }}
          aria-live="polite"
        ></div>

        <Reveal delay={120}>
          <div className="card mt-14 grid gap-10 p-7 md:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* Details */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                {[
                  {
                    label: "Email",
                    value: "audielorenz18@gmail.com",
                    href: "mailto:audielorenz18@gmail.com",
                  },
                  {
                    label: "Phone",
                    value: "+63 (915) 8158134",
                    href: "tel:+639158158134",
                  },
                  {
                    label: "Location",
                    value:
                      "Riverside Park Subd. Brgy. Maligaya Dolores, Quezon",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex flex-col gap-2 border-t border-line py-5 last:border-b sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="label w-24 flex-none">{c.label}</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="break-all text-[15px] text-foreground transition-colors duration-300 hover:text-accent"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-[15px] text-foreground">
                        {c.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {[
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
                    href: "https://www.linkedin.com/in/audie-malaluan-14a5b2246",
                    icon: "fab fa-linkedin-in",
                    label: "LinkedIn",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const form = e.currentTarget;
                const formData = new FormData(form);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const message = formData.get("message") as string;

                const showToast = (msg: string, success = true) => {
                  const toast = document.getElementById("custom-toast");
                  if (toast) {
                    toast.textContent = msg;
                    toast.className =
                      "fixed right-6 top-6 z-[60] rounded-xl px-6 py-4 text-base font-medium shadow-lg transition-all duration-300 " +
                      (success
                        ? "bg-accent text-background"
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
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="off"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-[15px] text-foreground transition-colors duration-300 placeholder:text-dim focus:border-accent focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-[15px] text-foreground transition-colors duration-300 placeholder:text-dim focus:border-accent focus:outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-line bg-background px-4 py-3.5 text-[15px] text-foreground transition-colors duration-300 placeholder:text-dim focus:border-accent focus:outline-none"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-accent mt-1" disabled={loading}>
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin"
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
                      d="M4 12a8 8 0 018-8V8a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Sending..." : "Send message"}
                {!loading && <ArrowUpRight size={17} />}
              </button>
            </form>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
