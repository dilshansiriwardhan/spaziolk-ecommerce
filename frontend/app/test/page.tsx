import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">All Products</h1>

      {allProducts.length === 0 ? (
        <p className="text-gray-500">No products found. Run the seed script.</p>
      ) : (
        <ul className="space-y-4">
          {allProducts.map((product) => (
            <li
              key={product.id}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-sm text-gray-500">/{product.slug}</p>
              <p className="mt-1">
                <span className="font-medium">
                  ${Number(product.productPrice).toFixed(2)}
                </span>
                {product.compareAtPrice != null && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ${Number(product.compareAtPrice).toFixed(2)}
                  </span>
                )}
              </p>
              {product.description && (
                <p className="mt-2 text-sm text-gray-600">
                  {product.description}
                </p>
              )}
              <div className="mt-2 flex gap-2 text-xs">
                {product.isActive ? (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="rounded bg-red-100 px-2 py-0.5 text-red-800">
                    Inactive
                  </span>
                )}
                {product.isFeatured && (
                  <span className="rounded bg-yellow-100 px-2 py-0.5 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}