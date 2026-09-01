import Image from "next/image";
import ProductCard from "@/components/my/product-card";
import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { desc, inArray, asc } from "drizzle-orm";

export default async function Home() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(10);

  const productIds = allProducts.map((p) => p.id);

  const images =
    productIds.length === 0
      ? []
      : await db
          .select({
            productId: productImages.productId,
            url: productImages.url,
          })
          .from(productImages)
          .where(inArray(productImages.productId, productIds))
          .orderBy(asc(productImages.position));

  const imagesByProductId = images.reduce<Record<string, string[]>>(
    (acc, img) => {
      if (!acc[img.productId]) acc[img.productId] = [];
      acc[img.productId].push(img.url);
      return acc;
    },
    {},
  );

  return (
    <div>
      {/* Main Banner */}
      <div>
        <div className="w-full">
          <Image
            src="/banner.png"
            alt="Product"
            width={1584}
            height={396}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      {/* Product List */}
      <div>
        {allProducts.length === 0 ? (
          <div>No Products Found</div>
        ) : (
          <div className="grid grid-cols-4 justify-between py-10 px-25 gap-2">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageSrc={imagesByProductId[product.id][0]}
                productName={product.productName}
                productPrice={product.productPrice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
