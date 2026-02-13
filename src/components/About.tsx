import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Sobre <span className="gradient-text">mi</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          +3 anos de experiencia construyendo soluciones digitales completas
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <Briefcase className="text-accent mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">Experiencia</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Inovot</span> — Full Stack
                <span className="block text-xs">Nov 2024 - Jul 2025</span>
              </li>
              <li>
                <span className="text-foreground font-medium">L4F (C-P-S)</span> — Full Stack (Go + Flutter)
                <span className="block text-xs">Jul 2024 - Sep 2025</span>
              </li>
              <li>
                <span className="text-foreground font-medium">Freelance / Conper</span> — Full Stack
                <span className="block text-xs">May 2022 - Jun 2024</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <GraduationCap className="text-accent mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">Educacion</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Ingenieria de Sistemas</span>
                <span className="block text-xs">CUN - Colombia</span>
              </li>
              <li>
                <span className="text-foreground font-medium">Bachiller Tecnico</span>
                <span className="block text-xs">Electronica y Comunicaciones - 2021</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors">
            <Award className="text-accent mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">Certificaciones</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Ciberseguridad</span>
                <span className="block text-xs">Henry - 2024</span>
              </li>
              <li>
                <span className="text-foreground font-medium">Productividad Personal</span>
                <span className="block text-xs">Google - 2020</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
