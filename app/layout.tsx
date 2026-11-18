import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayman | Systems & Security Portfolio",
  description:
    "Systems, Networking & Cybersecurity Portfolio of Ayman — Computer Science Student & Infrastructure Security, focusing on low-level systems, protocol mechanics, and robust defenses.",
  keywords: [
    "Ayman",
    "Systems Engineer",
    "Cybersecurity",
    "Computer Networking",
    "Linux Hardening",
    "C Programming",
    "VLANs",
    "Wireshark",
    "Morocco",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}


