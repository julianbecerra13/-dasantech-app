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
    const url = `https://www.falabella.com.co/falabella-co/search?Ntt=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "es-CO,es;q=0.9,en;q=0.8",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al consultar Falabella", status: response.status },
        { status: 502 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    interface Product {
      title: string;
      price: string;
      originalPrice: string;
      discount: string;
      currency: string;
      image: string;
      link: string;
      brand: string;
      specs: string[];
    }

    const products: Product[] = [];

    // Extract data from Next.js __NEXT_DATA__ JSON
    const nextDataScript = $("#__NEXT_DATA__").html();
    if (nextDataScript) {
      try {
        const nextData = JSON.parse(nextDataScript);
        const results = nextData?.props?.pageProps?.results || [];

        for (const item of results) {
          if (products.length >= limit) break;

          const prices = item.prices || [];
          const eventPrice = prices.find((p: { type: string }) => p.type === "eventPrice");
          const normalPrice = prices.find((p: { type: string }) => p.type === "normalPrice");
          const mainPrice = eventPrice || normalPrice || prices[0];

          products.push({
            title: item.displayName || "",
            price: mainPrice?.price?.[0] || "0",
            originalPrice: normalPrice?.price?.[0] || "",
            discount: item.discountBadge?.label || "",
            currency: mainPrice?.symbol?.trim() || "$",
            image: item.mediaUrls?.[0] ? `${item.mediaUrls[0]}?w=400` : "",
            link: item.url || "",
            brand: item.brand || "",
            specs: (item.topSpecifications || []).slice(0, 3),
          });
        }
      } catch (e) {
        console.error("Error parsing __NEXT_DATA__:", e);
      }
    }

    // Fallback: parse HTML if no JSON data found
    if (products.length === 0) {
      $("[data-pod]").each((_, element) => {
        if (products.length >= limit) return false;

        const el = $(element);
        const title = el.find("[class*=displayName]").text().trim() ||
          el.find("b.pod-title").text().trim() ||
          el.find("a").attr("title") || "";
        const price = el.find("[class*=Price]").first().text().trim();
        const image = el.find("img").attr("src") || "";
        const link = el.find("a").attr("href") || "";
        const brand = el.find("[class*=brand]").text().trim();

        if (title) {
          products.push({
            title,
            price,
            originalPrice: "",
            discount: "",
            currency: "$",
            image,
            link: link.startsWith("http") ? link : `https://www.falabella.com.co${link}`,
            brand,
            specs: [],
          });
        }
      });
    }

    return NextResponse.json({
      query,
      total: products.length,
      products,
      source: "Falabella Colombia",
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
