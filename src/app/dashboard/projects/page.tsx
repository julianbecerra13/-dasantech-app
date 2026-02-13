"use client";

import ProjectCard from "@/components/dashboard/ProjectCard";
import { FolderOpen } from "lucide-react";

const projects = [
  {
    title: "Inovot - App Movil + Panel Admin",
    description:
      "Aplicacion movil en Flutter con panel administrativo en Next.js/React para gestion de usuarios, metas y administracion. Integracion de pagos con Wompi y backend en Go/NestJS.",
    tech: ["Flutter", "Next.js", "React", "Go", "NestJS", "DynamoDB", "Wompi"],
  },
  {
    title: "L4F - App de Citas",
    description:
      "Backend en Go (Gin) con APIs REST para aplicacion de citas con matches, chat en tiempo real y videollamadas. Frontend movil en Flutter con autenticacion JWT.",
    tech: ["Go", "Gin", "Flutter", "MySQL", "JWT", "Docker", "GitHub Actions"],
  },
  {
    title: "Apps de Movilidad/Domicilios",
    description:
      "3 aplicaciones moviles en Flutter para soluciones de movilidad y domicilios con integracion de Google Maps API, geolocation y rutas. Backend en Go conectado a MySQL.",
    tech: ["Flutter", "Go", "MySQL", "Google Maps API", "Stripe"],
  },
  {
    title: "CRM Web - Gestion de Pedidos",
    description:
      "CRM web construido en Flutter Web para gestion de pedidos y operaciones internas. Sistema completo de tracking y administracion.",
    tech: ["Flutter Web", "Dart", "Go", "MySQL"],
  },
  {
    title: "Portafolio Personal - Dasantech",
    description:
      "Este sitio web. Construido con Next.js 14, Firebase Auth, Tailwind CSS y web scraping con Cheerio. Demo interactivo de scraping sobre MercadoLibre.",
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind", "Cheerio"],
    github: "https://github.com/julianbecerra13",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Mis <span className="gradient-text">Proyectos</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Proyectos destacados en los que he trabajado
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <FolderOpen className="mx-auto text-accent mb-3" size={32} />
        <p className="text-sm text-muted-foreground">
          Mas proyectos disponibles en{" "}
          <a
            href="https://github.com/julianbecerra13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            mi perfil de GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
