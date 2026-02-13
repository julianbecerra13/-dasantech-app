import { NextRequest, NextResponse } from "next/server";

const sampleProducts = [
  {
    id: "1",
    name: "Laptop Gaming ASUS ROG",
    price: 4500000,
    currency: "COP",
    category: "Tecnologia",
    available: true,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max 256GB",
    price: 5200000,
    currency: "COP",
    category: "Celulares",
    available: true,
  },
  {
    id: "3",
    name: "Monitor Samsung 27\" 4K",
    price: 1800000,
    currency: "COP",
    category: "Tecnologia",
    available: false,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  let filtered = sampleProducts;
  if (category) {
    filtered = sampleProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json({
    total: filtered.length,
    products: filtered,
    timestamp: new Date().toISOString(),
  });
}
