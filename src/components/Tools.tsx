import { Code2, Server, Smartphone, Database, CreditCard, Cloud, Bot } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Web",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["Flutter", "Dart", "iOS/Android"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Go (Gin)", "Node.js (NestJS)", "APIs REST", "JWT"],
  },
  {
    icon: Database,
    title: "Bases de datos",
    items: ["MySQL", "DynamoDB", "Prisma"],
  },
  {
    icon: CreditCard,
    title: "Pagos",
    items: ["Wompi", "Stripe"],
  },
  {
    icon: Cloud,
    title: "DevOps & Deploy",
    items: ["Docker", "Vercel", "GitHub Actions", "cPanel"],
  },
];

export default function Tools() {
  return (
    <section id="tools" className="py-24 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Stack <span className="gradient-text">Tecnologico</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Herramientas y tecnologias con las que trabajo
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="bg-background border border-border rounded-xl p-5 hover:border-accent/50 transition-all hover:-translate-y-1"
            >
              <skill.icon className="text-accent mb-3" size={24} />
              <h3 className="font-semibold mb-2">{skill.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI tools section */}
        <div className="mt-12 bg-background border border-border rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Bot className="text-accent" size={24} />
            <h3 className="font-semibold text-lg">Construido con IA</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Este sitio fue construido utilizando <span className="text-foreground font-medium">Claude Code</span> como
            herramienta de desarrollo asistido por IA, demostrando como integro herramientas
            modernas en mi flujo de trabajo.
          </p>
        </div>
      </div>
    </section>
  );
}
