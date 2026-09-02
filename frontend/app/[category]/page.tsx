import { db } from "@/db";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { DrawerDemo } from "@/components/my/drawer";
import ProductCard from "@/components/my/product-card";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const query = await db.query.categories.findFirst({
    where: (cat, { eq }) => eq(cat.slug, category),
    with: { products: {
      with: {
        images: true,
        reviews: true,
      },
    }, },
  });

  const allProducts = query?.products;
  console.log(allProducts);

  return (
    <div>
      {allProducts?.length === 0 ? (
        <div>No Products Found</div>
      ) : (
        <div className="grid grid-cols-4 justify-between py-10 px-25 gap-2">
          {allProducts?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageSrc={product.images[0].url}
              productName={product.productName}
              productPrice={product.productPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}
