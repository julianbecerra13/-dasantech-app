"use client";

import { Github, Linkedin, MapPin, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Avatar */}
        <div className="animate-fade-in mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-[3px] animate-float">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl font-bold gradient-text">
              JB
            </div>
          </div>
        </div>

        {/* Name and title */}
        <h1 className="animate-fade-in text-4xl md:text-6xl font-bold mb-4">
          Julian David{" "}
          <span className="gradient-text">Becerra Rodriguez</span>
        </h1>

        <p className="animate-fade-in-delay text-lg md:text-xl text-muted-foreground mb-2">
          Desarrollador Full Stack
        </p>

        <p className="animate-fade-in-delay flex items-center justify-center gap-1 text-muted-foreground mb-8">
          <MapPin size={16} />
          Bucaramanga, Colombia
        </p>

        {/* Bio */}
        <p className="animate-fade-in-delay-2 text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Experiencia entregando productos end-to-end: frontend web (React/Next.js),
          mobile (Flutter) y backend (Go con Gin / Node con NestJS). APIs REST,
          autenticacion JWT, MySQL/DynamoDB e integraciones de pago.
        </p>

        {/* Links */}
        <div className="animate-fade-in-delay-2 flex items-center justify-center gap-4 mb-12">
          <a
            href="https://github.com/julianbecerra13"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-lg hover:border-accent transition-colors"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/julian-becerra-rodriguez-21060018b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-lg hover:border-accent transition-colors"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Ver portafolio
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-delay-2">
          <ArrowDown size={20} className="mx-auto text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
