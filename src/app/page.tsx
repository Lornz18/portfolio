"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  MonitorSmartphone,
  PenTool,
  Gauge,
  Accessibility,
  Briefcase,
  MessageCircle,
  Quote,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Chatbot from "./components/chatbot";
import Hero3D from "./components/hero3d";
import Reveal from "./components/reveal";
import TiltCard from "./components/tilt-card";

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
    icon: MonitorSmartphone,
    description:
      "Building mobile-first websites using modern frameworks that look and feel great on every device.",
    span: "md:col-span-2",
  },
  {
    title: "UI/UX Design",
    icon: PenTool,
    description:
      "Designing intuitive interfaces and user experiences for maximum engagement.",
    span: "",
  },
  {
    title: "Performance Optimization",
    icon: Gauge,
    description:
      "Improving speed, responsiveness, and efficiency for better user retention.",
    span: "",
  },
  {
    title: "Accessibility",
    icon: Accessibility,
    description:
      "Making websites usable for everyone, including users with disabilities.",
    span: "",
  },
  {
    title: "Consulting",
    icon: Briefcase,
    description:
      "Guiding development teams and businesses to achieve scalable solutions.",
    span: "",
  },
];

interface Project {
  image: string;
  name: string;
  link: string;
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
    feature: [
      "React / Next.js",
      "TypeScript",
      "Responsive Web Design",
      "CI/CD",
      "DigitalOcean",
    ],
    isProfessional: true,
    description: `The official website for AgentiumLabs, showcasing the company’s AI platform focused on building agentic AI systems, automation infrastructure, and enterprise AI solutions.\n\nKey Contributions:\n• Developed and maintained frontend components for the company website.\n• Implemented responsive UI to ensure compatibility across devices.\n• Optimized layout structure and performance for improved user experience.\n• Assisted with deployment workflows and infrastructure setup.`,
  },
  {
    image: "ricerca.png",
    name: "Ricerca AI Research Platform",
    link: "https://ricerca.agentiumlabs.ai/",
    feature: [
      "React / Next.js",
      "API Integration",
      "PostgreSQL",
      "CI/CD",
      "Cloud Infrastructure",
    ],
    isProfessional: true,
    description: `Ricerca is an AI-powered research discovery platform designed to help users explore and discover machine learning research papers through an aggregated interface.\n\nKey Contributions:\n• Developed and improved frontend features for browsing research papers.\n• Implemented UI components for research listings and search results.\n• Integrated APIs and backend services to retrieve research data.\n• Improved responsiveness and usability of the platform.`,
  },
  {
    image: "project 4.png",
    name: "Online Clinic Appointment Website",
    link: "https://dental-appt.vercel.app/",
    description:
      "A fully responsive online clinic appointment website that allows patients to view and book appointments in real time. Built using HTML, CSS, JavaScript, and TailwindCSS, the site uses WebSockets to provide live updates for appointment availability and notifications. Hosted on Vercel for fast and reliable deployment, it features a clean UI and smooth responsiveness across all devices.",
    feature: [
      "Responsive Design",
      "TailwindCSS Styling",
      "Real-Time Appointment Updates with WebSockets",
      "Live Notifications for Bookings",
    ],
  },
  {
    image: "project 5.png",
    name: "Quizify",
    link: "https://quizify-dev.vercel.app/",
    description:
      "A fully responsive quiz platform that uses AI to generate questions based on user-provided notes. Built with HTML, CSS, JavaScript, and TailwindCSS, it offers real-time updates and a smooth interactive experience. Hosted on Vercel for fast and reliable deployment, Quizify combines clean UI with intelligent question generation to enhance learning.",
    feature: [
      "Responsive Design",
      "TailwindCSS Styling",
      "AI-Powered Question Generation from Notes",
      "Real-Time Updates",
    ],
  },
  {
    image: "project 1.png",
    name: "BidsnBuys",
    link: "https://bidsnbuys.com/",
    feature: ["AI", "E-commerce", "Automation"],
    isServerlessSecure: true,
    description: `BidsnBuys.com is a professional e-commerce platform designed to automate marketing across platforms like Facebook and Google. Built on a serverless and secure architecture, it features AI-powered tools that generate product listings directly from images, making online selling faster and smarter.`,
  },
  {
    image: "project 2.png",
    name: "Water District Portal",
    link: "https://test-539c3.web.app/",
    description:
      "A unified web and mobile app platform for managing water district services. Both platforms are connected to a shared backend for real-time synchronization. The mobile app includes an offline mode for uninterrupted access to key features.",
    feature: ["Billing", "Reports", "Payments", "Offline", "Support"],
  },
  {
    image: "wondertour.png",
    name: "WonderTour Website",
    link: "https://wondertour-acac9.web.app/",
    description:
      "A fully responsive tourism website showcasing travel destinations, packages, and booking options. Built using HTML, CSS, JavaScript, and TailwindCSS, and hosted on Firebase for fast and secure deployment. The site highlights clean UI and smooth responsiveness across all device sizes.",
    feature: [
      "Responsive Design",
      "TailwindCSS Styling",
      "Destination Showcase",
      "Package Details",
      "Firebase Hosting",
    ],
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const featuredProjects = projects.filter((p) => p.isProfessional);
  const personalProjects = projects.filter((p) => !p.isProfessional);

  return (
    <div className="relative">
      {/* ====================== HERO ====================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-[-10rem] left-[-10rem] w-[34rem] h-[34rem] bg-blue-600/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-12rem] right-[-8rem] w-[34rem] h-[34rem] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none" />
        <Hero3D />

        <div className="container relative z-10 text-center pt-24 pb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 text-sm text-secondary mb-8">
              <span className="status-dot" />
              Available for work
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              Hi, I&apos;m <span className="text-gradient">Audie</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-light/90">
              Full-Stack Web Developer
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl mx-auto text-secondary text-base md:text-lg leading-relaxed">
              I craft intuitive, modern web experiences — from AI-powered
              platforms to real-time applications. Founding developer at
              AgentiumLabs, building products from zero to one.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-gradient" onClick={() => scrollTo("projects")}>
                View Projects <ArrowRight size={18} />
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("contacts")}>
                Contact Me
              </button>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-secondary">
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-sky-400 animate-scroll-dot" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </section>

      {/* ====================== TECH MARQUEE ====================== */}
      <section className="relative py-6 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 text-secondary whitespace-nowrap"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-sm font-medium tracking-wide">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ====================== SERVICES (BENTO) ====================== */}
      <section className="container py-28" id="services">
        <Reveal className="text-center flex flex-col items-center gap-4 mb-14">
          <span className="section-badge">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Services that <span className="text-gradient">deliver</span>
          </h2>
          <p className="text-secondary max-w-xl">
            Bringing designs to life with clean, responsive, and
            high-performing code.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 80} className={service.span}>
                <div className="glass glass-hover rounded-3xl p-8 h-full group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-sky-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}

          {/* Image cell */}
          <Reveal delay={400}>
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[14rem] group border border-white/10">
              <Image
                src="/service.jpg"
                alt="Workspace"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-semibold">Design → Code → Ship</p>
                <p className="text-secondary text-xs mt-1">
                  From concept to deployment
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== PROJECTS ====================== */}
      <section className="relative py-28 overflow-hidden" id="projects">
        <div className="absolute top-1/3 left-[-12rem] w-[30rem] h-[30rem] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative">
          <Reveal className="flex flex-col items-start gap-4 mb-14">
            <span className="section-badge">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <p className="text-secondary max-w-xl">
              A collection of professional platforms and independent projects
              built from concept to deployment.
            </p>
          </Reveal>

          {/* Professional / featured projects — large alternating cards */}
          <div className="space-y-10 mb-16">
            {featuredProjects.map((item, idx) => (
              <Reveal key={item.name}>
                <TiltCard maxTilt={3}>
                  <div className="glass glass-hover rounded-3xl p-5 md:p-8 overflow-hidden">
                    <div
                      className={`flex flex-col gap-8 lg:items-center ${
                        idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full lg:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 group shrink-0"
                      >
                        <Image
                          src={`/${item.image}`}
                          alt={item.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-sm font-medium flex items-center gap-1.5">
                            Visit live site <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </a>

                      <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 flex-wrap mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500/15 to-blue-500/15 border border-blue-400/30 text-blue-300">
                            AgentiumLabs · Professional
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          {item.name}
                        </h3>
                        <p className="text-secondary text-sm md:text-[15px] leading-relaxed whitespace-pre-line mb-6">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.feature.map((feature) => (
                            <span
                              key={feature}
                              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-light/80"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Personal projects — grid of tilt cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalProjects.map((item, idx) => (
              <Reveal key={item.name} delay={(idx % 2) * 100}>
                <TiltCard className="h-full">
                  <div className="glass glass-hover rounded-3xl overflow-hidden h-full flex flex-col">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-52 overflow-hidden group block"
                    >
                      <Image
                        src={`/${item.image}`}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-sm font-medium flex items-center gap-1.5">
                          Visit live site <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </a>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        {item.isServerlessSecure && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                            Serverless Secure
                          </span>
                        )}
                      </div>
                      <p className="text-secondary text-sm leading-relaxed mb-5 flex-1">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.feature.map((feature) => (
                          <span
                            key={feature}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-light/80"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== TESTIMONIAL ====================== */}
      <section className="relative py-28 overflow-hidden" id="testimonials">
        <div className="absolute top-0 right-[-10rem] w-[28rem] h-[28rem] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative">
          <Reveal className="text-center flex flex-col items-center gap-4 mb-14">
            <span className="section-badge">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Kind <span className="text-gradient">Words</span>
            </h2>
            <p className="text-secondary max-w-md">
              Feedback from people I&apos;ve worked with on various projects.
            </p>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto relative p-[1px] rounded-3xl bg-gradient-to-br from-sky-400/40 via-blue-500/30 to-transparent">
              <div className="bg-[#0a0a0d] rounded-[calc(1.5rem-1px)] p-8 md:p-12 relative overflow-hidden">
                <Quote className="absolute top-6 right-6 text-blue-500/15 w-16 h-16" />
                <div className="relative z-10">
                  <p className="text-secondary text-sm md:text-[15px] leading-relaxed mb-8">
                    &quot;Audie has been one of the founding developers on our
                    team and played a key role in helping us bring our technical
                    vision to life. From the early stages of development, he was
                    instrumental in building our core products. This includes
                    the website infrastructure and the AI agentic platform that
                    were developed from the ground up and turned into working
                    solutions.
                    <br />
                    <br />
                    Throughout the time we worked together, Audie consistently
                    demonstrated strong technical ability, initiative, and speed
                    in execution. He has the ability to quickly understand
                    complex technical requirements and translate them into
                    practical implementations. One of the qualities that stood
                    out the most was his ability to deliver outputs efficiently
                    while maintaining reliability in his work.
                    <br />
                    <br />
                    Beyond technical implementation, Audie also showed ownership
                    of the projects he handled. Building products from zero to
                    one requires both technical depth and adaptability, and he
                    handled those challenges well while contributing
                    meaningfully to the team&apos;s progress.
                    <br />
                    <br />
                    His knowledge, work ethic, and ability to execute make him a
                    valuable member of any development team. I strongly
                    recommend him to organizations that are looking for a
                    developer who can contribute quickly, take initiative, and
                    help build products from the ground up.&quot;
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                      AO
                    </div>
                    <div>
                      <h4 className="font-bold leading-tight">
                        Armielyn Obinguar
                      </h4>
                      <p className="text-secondary text-xs mt-0.5">
                        AgentiumLabs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== CONTACT ====================== */}
      <section className="relative py-28 overflow-hidden" id="contacts">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <Reveal className="space-y-8">
              <div className="flex flex-col items-start gap-4">
                <span className="section-badge">Contact</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Let&apos;s build something{" "}
                  <span className="text-gradient">amazing</span>
                </h2>
                <p className="text-secondary">
                  If you have any questions or would like to discuss your ideas
                  in more detail, please don&apos;t hesitate to reach out
                  through the contact information below.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Email",
                    value: "audielorenz18@gmail.com",
                    href: "mailto:audielorenz18@gmail.com",
                    icon: "fas fa-envelope",
                  },
                  {
                    label: "Phone",
                    value: "+63 (915) 8158134",
                    href: "tel:+639158158134",
                    icon: "fas fa-phone",
                  },
                  {
                    label: "Location",
                    value: "Riverside Park Subd. Brgy. Maligaya Dolores, Quezon",
                    icon: "fas fa-location-dot",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="glass glass-hover rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-sky-300">
                      <i className={c.icon}></i>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-secondary uppercase tracking-wider">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-sm md:text-base font-medium hover:text-sky-300 transition-colors break-all"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base font-medium">
                          {c.value}
                        </p>
                      )}
                    </div>
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
                    className="glass glass-hover w-11 h-11 rounded-full flex items-center justify-center text-secondary hover:text-light"
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Toast */}
            <div
              id="custom-toast"
              className="fixed top-6 right-6 z-[60] px-6 py-4 rounded-xl shadow-lg bg-primary text-light text-base font-semibold transition-all duration-300 opacity-0 pointer-events-none"
              style={{ minWidth: 220 }}
              aria-live="polite"
            ></div>

            <Reveal delay={150}>
              <form
                className="glass rounded-3xl p-8 md:p-10 space-y-6"
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
                        "fixed top-6 right-6 z-[60] px-6 py-4 rounded-xl shadow-lg text-base font-semibold transition-all duration-300 " +
                        (success
                          ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white"
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
                      showToast(
                        "Failed to send email. Please try again.",
                        false
                      );
                    }
                  } catch {
                    showToast("Failed to send email. Please try again.", false);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-secondary/60 focus:outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-secondary/60 focus:outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-secondary/60 focus:outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition-all"
                    placeholder="Tell me about your project..."
                    style={{ resize: "none" }}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-gradient w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== CHATBOT ====================== */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 z-50"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isChatOpen && (
        <Chatbot onClose={() => setIsChatOpen(false)} isclose={isChatOpen} />
      )}
    </div>
  );
}
