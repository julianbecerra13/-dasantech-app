import { ExternalLink, Truck } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  currency: string;
  image: string;
  link: string;
  seller: string;
  freeShipping: boolean;
}

export default function ProductCard({
  title,
  price,
  currency,
  image,
  link,
  seller,
  freeShipping,
}: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all hover:-translate-y-0.5 group">
      <div className="aspect-square bg-white relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}
        {freeShipping && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500/90 text-white text-xs px-2 py-1 rounded-md">
            <Truck size={12} />
            Envio gratis
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
          {title}
        </h3>
        <p className="text-lg font-bold gradient-text">
          {currency} {price}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{seller}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs text-accent hover:underline"
          >
            <ExternalLink size={12} />
            Ver en MercadoLibre
          </a>
        )}
      </div>
    </div>
  );
}
