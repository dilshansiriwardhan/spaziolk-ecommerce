import React from "react";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="border border-foreground/10 w-full rounded-xl overflow-hidden">
      <Image
        src="/products/001.webp"
        alt="Product"
        width={400}
        height={600}
        className="w-full h-auto"
        priority
      />
      <div className="p-2">
        <p>Product card</p>
        <p>1,500 LKR</p>
      </div>
    </div>
  );
};

export default ProductCard;
