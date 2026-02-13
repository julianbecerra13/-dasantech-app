import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
}: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all hover:-translate-y-0.5">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} />
            Codigo
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-accent hover:underline"
          >
            <ExternalLink size={14} />
            Ver demo
          </a>
        )}
      </div>
    </div>
  );
}
