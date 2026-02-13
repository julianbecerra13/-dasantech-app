import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  if (!query) {
    return NextResponse.json(
      { error: "El parametro 'q' es requerido" },
      { status: 400 }
    );
  }

  try {
    const url = `https://listado.mercadolibre.com.co/${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "es-CO,es;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al consultar MercadoLibre", status: response.status },
        { status: 502 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    interface Product {
      title: string;
      price: string;
      currency: string;
      image: string;
      link: string;
      seller: string;
      freeShipping: boolean;
    }

    const products: Product[] = [];

    $(".ui-search-layout__item").each((_, element) => {
      if (products.length >= limit) return false;

      const el = $(element);
      const title =
        el.find(".ui-search-item__title").text().trim() ||
        el.find(".poly-component__title").text().trim();
      const priceWhole =
        el.find(".andes-money-amount__fraction").first().text().trim();
      const currency =
        el.find(".andes-money-amount__currency-symbol").first().text().trim() ||
        "$";
      const image =
        el.find("img").attr("data-src") ||
        el.find("img").attr("src") ||
        "";
      const link =
        el.find("a.ui-search-link").attr("href") ||
        el.find("a.poly-component__title").attr("href") ||
        el.find("a").first().attr("href") ||
        "";
      const seller =
        el.find(".ui-search-official-store-label").text().trim() ||
        el.find(".poly-component__seller").text().trim() ||
        "Vendedor";
      const freeShipping =
        el.find(".ui-search-item__shipping--free").length > 0 ||
        el.text().toLowerCase().includes("envío gratis");

      if (title && priceWhole) {
        products.push({
          title,
          price: priceWhole,
          currency,
          image,
          link,
          seller,
          freeShipping,
        });
      }
    });

    return NextResponse.json({
      query,
      total: products.length,
      products,
      source: "MercadoLibre Colombia",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Error interno al realizar el scraping" },
      { status: 500 }
    );
  }
}
