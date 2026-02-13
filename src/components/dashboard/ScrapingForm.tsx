"use client";

import { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";

interface ScrapingFormProps {
  onSearch: (query: string, limit: number) => Promise<void>;
  loading: boolean;
}

export default function ScrapingForm({ onSearch, loading }: ScrapingFormProps) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(20);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await onSearch(query.trim(), limit);
  };

  const suggestions = [
    "iphone 15",
    "laptop gaming",
    "audifonos bluetooth",
    "teclado mecanico",
    "monitor 4k",
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-accent" size={20} />
        <h2 className="font-semibold">Buscar productos</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm text-muted-foreground mb-1.5">
            Termino de busqueda
          </label>
          <div className="flex gap-2">
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: laptop gaming, iphone 15..."
              className="flex-1 px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors text-sm"
              disabled={loading}
            />
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
              disabled={loading}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search size={16} />
              Buscar en MercadoLibre
            </>
          )}
        </button>
      </form>

      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2">Sugerencias:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              disabled={loading}
              className="text-xs px-3 py-1.5 bg-muted rounded-full text-muted-foreground hover:text-foreground hover:bg-border transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <AlertCircle size={14} className="shrink-0 mt-0.5" />
        <p>
          Este demo realiza web scraping en tiempo real sobre MercadoLibre Colombia
          usando Cheerio. Los resultados pueden variar segun disponibilidad del sitio.
        </p>
      </div>
    </div>
  );
}
