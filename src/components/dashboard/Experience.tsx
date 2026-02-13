import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    company: "Inovot",
    role: "Desarrollador Full Stack",
    period: "Nov 2024 - Jul 2025",
    location: "Colombia",
    description: [
      "Desarrollo y mantenimiento de app movil en Flutter y panel administrativo web en Next.js/React.",
      "Integracion de Wompi para pagos/compras dentro del producto.",
      "Backend con Go (Gin) y Node.js (NestJS), conectado a DynamoDB con Prisma.",
      "Despliegue web en Vercel y soporte de publicacion en Play Store.",
    ],
    tech: ["Flutter", "React", "Next.js", "Go", "Gin", "NestJS", "DynamoDB", "Prisma", "Wompi", "Vercel"],
  },
  {
    company: "L4F (C-P-S)",
    role: "Desarrollador Full Stack (Go + Flutter)",
    period: "Jul 2024 - Sep 2025",
    location: "Colombia",
    description: [
      "Backend en Go (Gin) con APIs REST para app de citas (matches, chat en tiempo real, videollamadas).",
      "Autenticacion JWT, validaciones y manejo consistente de respuestas.",
      "Desarrollo de funcionalidades del frontend movil en Flutter.",
      "Despliegue con Docker en GoDaddy y flujo de entrega con GitHub Actions.",
    ],
    tech: ["Go", "Gin", "JWT", "MySQL", "Flutter", "Docker", "GitHub Actions"],
  },
  {
    company: "Freelance / Conper",
    role: "Desarrollador Full Stack",
    period: "May 2022 - Jun 2024",
    location: "Colombia",
    description: [
      "3 aplicaciones moviles en Flutter (iOS/Android) para soluciones de movilidad/domicilios.",
      "CRM web en Flutter Web para gestion de pedidos y operaciones.",
      "Backend en Go (Gin) conectado a MySQL con operaciones CRUD.",
      "Integracion de Google Maps API y Stripe para pagos.",
    ],
    tech: ["Flutter", "Dart", "Go", "Gin", "MySQL", "Google Maps API", "Stripe", "Docker"],
  },
];

const education = [
  {
    title: "Ingenieria de Sistemas",
    institution: "CUN (Corporacion Unificada Nacional de Educacion Superior)",
    location: "Colombia",
  },
  {
    title: "Bachiller Tecnico - Electronica y Comunicaciones",
    institution: "Colegio Humberto Gomez Nigrinis",
    location: "Colombia - 2021",
  },
];

const certifications = [
  { title: "Curso Introductorio de Ciberseguridad", provider: "Henry", year: "2024" },
  { title: "Productividad Personal", provider: "Google / Fundacion Santa Maria la Real", year: "2020" },
];

export default function Experience() {
  return (
    <div className="space-y-8">
      {/* Experience */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="text-accent" size={20} />
          <h2 className="text-lg font-semibold">Experiencia laboral</h2>
        </div>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold">{exp.company}</h3>
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-sm text-accent mb-3">{exp.role}</p>
              <ul className="space-y-1.5 mb-4">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-1.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="text-accent" size={20} />
          <h2 className="text-lg font-semibold">Educacion</h2>
        </div>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.title}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h3 className="font-medium text-sm">{edu.title}</h3>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <p className="text-xs text-muted-foreground">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-accent" size={20} />
          <h2 className="text-lg font-semibold">Certificaciones</h2>
        </div>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h3 className="font-medium text-sm">{cert.title}</h3>
              <p className="text-xs text-muted-foreground">
                {cert.provider} - {cert.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
