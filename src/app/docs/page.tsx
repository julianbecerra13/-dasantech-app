"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Send, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
      title="Copiar"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
}

function TryIt({ endpoint, defaultQuery }: { endpoint: string; defaultQuery: string }) {
  const [query, setQuery] = useState(defaultQuery);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTry = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(`${endpoint}${query}`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch {
      setResponse("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 text-sm font-medium hover:bg-muted transition-colors"
      >
        <span className="flex items-center gap-2">
          <Send size={14} className="text-accent" />
          Probar endpoint
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              placeholder="Parametros de busqueda"
            />
            <button
              onClick={handleTry}
              disabled={loading}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>
          {response && (
            <pre className="bg-background border border-border rounded-lg p-3 text-xs overflow-x-auto max-h-80">
              {response}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const scrapeExample = `{
  "query": "laptop gaming",
  "total": 20,
  "products": [
    {
      "title": "Laptop Gaming ASUS ROG Strix...",
      "price": "4.500.000",
      "currency": "$",
      "image": "https://...",
      "link": "https://articulo.mercadolibre.com.co/...",
      "seller": "Tienda Oficial ASUS",
      "freeShipping": true
    }
  ],
  "source": "MercadoLibre Colombia",
  "timestamp": "2026-02-12T..."
}`;

  const productsExample = `{
  "total": 3,
  "products": [
    {
      "id": "1",
      "name": "Laptop Gaming ASUS ROG",
      "price": 4500000,
      "currency": "COP",
      "category": "Tecnologia",
      "available": true
    }
  ],
  "timestamp": "2026-02-12T..."
}`;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-accent" size={28} />
            <h1 className="text-3xl font-bold">
              API <span className="gradient-text">Documentation</span>
            </h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Documentacion de los endpoints disponibles en esta aplicacion
          </p>

          <div className="space-y-8">
            {/* Base URL */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold mb-2">Base URL</h2>
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2">
                <code className="text-sm text-accent flex-1 font-mono">
                  {baseUrl || "https://tu-dominio.vercel.app"}
                </code>
                <CopyButton text={baseUrl || "https://tu-dominio.vercel.app"} />
              </div>
            </div>

            {/* GET /api/scrape */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-bold font-mono">
                  GET
                </span>
                <code className="font-mono text-sm">/api/scrape</code>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Realiza web scraping en tiempo real sobre MercadoLibre Colombia.
                Retorna una lista de productos con nombre, precio, imagen, enlace y vendedor.
              </p>

              <h3 className="text-sm font-semibold mb-2">Parametros (query string)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Parametro</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Tipo</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Requerido</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4"><code className="text-accent font-mono text-xs">q</code></td>
                      <td className="py-2 pr-4 text-muted-foreground">string</td>
                      <td className="py-2 pr-4 text-green-400">Si</td>
                      <td className="py-2 text-muted-foreground">Termino de busqueda</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4"><code className="text-accent font-mono text-xs">limit</code></td>
                      <td className="py-2 pr-4 text-muted-foreground">number</td>
                      <td className="py-2 pr-4 text-yellow-400">No</td>
                      <td className="py-2 text-muted-foreground">Maximo de resultados (default: 20, max: 50)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-semibold mt-4 mb-2">Ejemplo de request</h3>
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2">
                <code className="text-xs text-muted-foreground font-mono flex-1">
                  GET /api/scrape?q=laptop+gaming&limit=10
                </code>
                <CopyButton text={`${baseUrl}/api/scrape?q=laptop+gaming&limit=10`} />
              </div>

              <h3 className="text-sm font-semibold mt-4 mb-2">Ejemplo de respuesta</h3>
              <pre className="bg-background border border-border rounded-lg p-3 text-xs overflow-x-auto font-mono">
                {scrapeExample}
              </pre>

              <TryIt endpoint="/api/scrape?" defaultQuery="q=audifonos&limit=5" />
            </div>

            {/* GET /api/products */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-bold font-mono">
                  GET
                </span>
                <code className="font-mono text-sm">/api/products</code>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Retorna una lista de productos de ejemplo. Endpoint de demostracion.
              </p>

              <h3 className="text-sm font-semibold mb-2">Parametros (query string)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Parametro</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Tipo</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Requerido</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4"><code className="text-accent font-mono text-xs">category</code></td>
                      <td className="py-2 pr-4 text-muted-foreground">string</td>
                      <td className="py-2 pr-4 text-yellow-400">No</td>
                      <td className="py-2 text-muted-foreground">Filtrar por categoria</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-semibold mt-4 mb-2">Ejemplo de respuesta</h3>
              <pre className="bg-background border border-border rounded-lg p-3 text-xs overflow-x-auto font-mono">
                {productsExample}
              </pre>

              <TryIt endpoint="/api/products?" defaultQuery="category=Tecnologia" />
            </div>

            {/* Rate Limiting note */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold mb-2">Notas importantes</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  El endpoint de scraping realiza consultas en tiempo real, por lo que puede tener latencia variable.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  Los resultados se cachean por 5 minutos para evitar exceso de requests.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  MercadoLibre puede bloquear requests excesivos. Usa limites razonables.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  Esta API es de demostracion y no esta pensada para uso en produccion.
                </li>
              </ul>
            </div>

            {/* Tech stack */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold mb-2">Stack utilizado</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 14",
                  "TypeScript",
                  "Cheerio",
                  "Firebase Auth",
                  "Tailwind CSS",
                  "Vercel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
