// src/app/actions/search.ts
"use server";

import { searchProducts } from "@/lib/search-products";

export async function searchProductsAction(query: string) {
  return searchProducts(query);
}