import Image from "next/image";
import ProductCard from "@/components/my/product-card";
import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { desc, inArray, asc } from "drizzle-orm";
import { searchPexelsPhotos } from "./actions/unsplash";

export default async function Home() {
  const allProducts = await db.query.products.findMany({
    limit: 8,
    with: {
      images: true,
      reviews: true,
    },
  });
  console.log(allProducts);

  const data = await searchPexelsPhotos("streetwear fashion", 10);
  const images = data?.photos;
  console.log();

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
                imageSrc={product.images[0].url}
                productName={product.productName}
                productPrice={product.productPrice}
                isFeatured={product.isFeatured}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
