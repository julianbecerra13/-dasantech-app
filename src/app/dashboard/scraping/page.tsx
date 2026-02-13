"use client";

import { useState } from "react";
import ScrapingForm from "@/components/dashboard/ScrapingForm";
import ProductCard from "@/components/dashboard/ProductCard";
import { Package, Clock } from "lucide-react";

interface Product {
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  currency: string;
  image: string;
  link: string;
  brand?: string;
  specs?: string[];
}

interface ScrapingResult {
  query: string;
  total: number;
  products: Product[];
  source: string;
  timestamp: string;
}

export default function ScrapingPage() {
  const [result, setResult] = useState<ScrapingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string, limit: number) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/scrape?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al realizar la busqueda");
        return;
      }

      setResult(data);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Web <span className="gradient-text">Scraping</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Demo de scraping en tiempo real sobre Falabella Colombia
        </p>
      </div>

      <ScrapingForm onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="text-accent" size={18} />
              <span className="text-sm font-medium">
                {result.total} productos encontrados para &quot;{result.query}&quot;
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              {new Date(result.timestamp).toLocaleTimeString("es-CO")}
            </div>
          </div>

          {result.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {result.products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Package size={48} className="mx-auto mb-4 opacity-30" />
              <p>No se encontraron productos para esta busqueda</p>
            </div>
          )}
        </div>
      )}

      {!result && !loading && !error && (
        <div className="text-center py-16 text-muted-foreground">
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-sm">Realiza una busqueda para ver los resultados</p>
        </div>
      )}
    </div>
  );
}
