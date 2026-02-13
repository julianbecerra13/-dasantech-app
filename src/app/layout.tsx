import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julian Becerra | Desarrollador Full Stack",
  description:
    "Portafolio de Julian David Becerra Rodriguez - Desarrollador Full Stack con experiencia en Go, Node.js, React, Next.js y Flutter.",
  keywords: ["desarrollador", "full stack", "Go", "React", "Next.js", "Flutter", "Colombia"],
  authors: [{ name: "Julian David Becerra Rodriguez" }],
  openGraph: {
    title: "Julian Becerra | Desarrollador Full Stack",
    description: "Portafolio profesional - Desarrollador Full Stack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
