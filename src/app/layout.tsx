import type { Metadata } from "next";
import "./globals.css";
import { Inter, Inter_Tight, DM_Mono } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
import ChatProvider from "./components/chat-context";

/** Display face — used for the oversized hero and section headlines. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

/** Body copy. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

/** Every label, year, category and caption on the site. */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audie Malaluan — Full Stack Developer",
  description:
    "Full stack developer building AI-powered platforms and real-time web applications from zero to one. Founding developer at AgentiumLabs.",
  openGraph: {
    title: "Audie Malaluan — Full Stack Developer",
    description:
      "Full stack developer building AI-powered platforms and real-time web applications from zero to one. Founding developer at AgentiumLabs.",
    images: [
      {
        url: "https://audie-dev.vercel.app/Audie.dev.png",
        width: 1200,
        height: 630,
        alt: "Audie Malaluan — Full Stack Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on <html> so they resolve at :root, where
    // Tailwind declares --font-sans / --font-display / --font-mono.
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        <ChatProvider>
          <Header />
          {children}
          <Footer />
        </ChatProvider>
      </body>
    </html>
  );
}
