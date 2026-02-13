import { Code2, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="text-accent" size={20} />
          <span className="text-sm text-muted-foreground">
            Julian Becerra &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/julianbecerra13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/julian-becerra-rodriguez-21060018b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:becerrarodriguezjulian@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          Hecho con Next.js, Tailwind CSS & Claude Code
        </p>
      </div>
    </footer>
  );
}
