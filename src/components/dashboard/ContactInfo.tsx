import { Mail, Phone, MapPin, Github, Linkedin, FileDown } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "becerrarodriguezjulian@gmail.com",
    href: "mailto:becerrarodriguezjulian@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefono / WhatsApp",
    value: "(+57) 321 200 1539",
    href: "https://wa.me/573212001539",
  },
  {
    icon: MapPin,
    label: "Ubicacion",
    value: "Bucaramanga, Colombia",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "julianbecerra13",
    href: "https://github.com/julianbecerra13",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Julian Becerra",
    href: "https://www.linkedin.com/in/julian-becerra-rodriguez-21060018b/",
  },
];

export default function ContactInfo() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Informacion de contacto</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.label} className="flex items-start gap-3">
            <contact.icon className="text-accent mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-xs text-muted-foreground">{contact.label}</p>
              {contact.href ? (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-accent transition-colors"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-sm">{contact.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        href="/cv.pdf"
        download
        className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <FileDown size={16} />
        Descargar CV (PDF)
      </a>
    </div>
  );
}
