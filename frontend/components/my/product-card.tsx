import React from "react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  productName: string;
  productPrice: number;
  imageSrc?: string;
};

const ProductCard = ({
  id,
  productName,
  productPrice,
  imageSrc = "/products/001.webp",
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="border border-foreground/10 w-full rounded-xl overflow-hidden">
        <Image
          unoptimized
          src={imageSrc}
          alt={productName}
          width={400}
          height={600}
          className="w-full h-auto"
          priority
        />
        <div className="p-2">
          <p>{productName}</p>
          <p>{productPrice} LKR</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
