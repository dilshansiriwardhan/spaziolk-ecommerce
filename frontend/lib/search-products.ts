// src/lib/search-products.ts
import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { or, ilike, eq, asc } from "drizzle-orm";

export async function searchProducts(query: string, limit = 20) {
  const q = query.trim();
  if (!q) return [];

  const pattern = `%${q}%`;

  const rows = await db
    .select({
      id: products.id,
      productName: products.productName,
      productPrice: products.productPrice,
      slug: products.slug,
      description: products.description,
      imageUrl: productImages.url,
    })
    .from(products)
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .where(
      or(
        ilike(products.productName, pattern),
        ilike(products.slug, pattern),
        ilike(products.description, pattern),
        ilike(products.productType, pattern)
      )
    )
    .orderBy(asc(products.productName))
    .limit(limit * 3); // extra rows if multiple images

  // first image per product
  const map = new Map<string, (typeof rows)[0]>();
  for (const row of rows) {
    if (!map.has(row.id)) map.set(row.id, row);
  }

  return Array.from(map.values()).slice(0, limit);
}