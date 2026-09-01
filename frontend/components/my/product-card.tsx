import React from "react";
import Image from "next/image";

type ProductCardProps = {
  productName: string;
  productPrice: number;
  imageSrc?: string;
};

const ProductCard = ({
  productName,
  productPrice,
  imageSrc = "/products/001.webp",
}: ProductCardProps) => {
  return (
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
  );
};

export default ProductCard;
