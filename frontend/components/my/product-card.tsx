"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { addToFavAction } from "@/app/actions/add-to-fav";

type ProductCardProps = {
  id: string;
  productName: string;
  productPrice: number;
  imageSrc?: string;
  isFeatured: boolean;
};

const ProductCard = ({
  isFeatured,
  id,
  productName,
  productPrice,
  imageSrc = "/products/001.webp",
}: ProductCardProps) => {
  const handleAddToFav = async () => {
    const result = await addToFavAction(id);

    // if (result.success) {
    //   alert("Added to cart!");
    // } else {
    //   alert(result.error || "Something went wrong");
    // }
  };
  return (
    <div className="border border-foreground/10 w-full rounded-xl overflow-hidden">
      <Link href={`/products/${id}`}>
        <Image
          unoptimized
          src={imageSrc}
          alt={productName}
          width={400}
          height={600}
          className="w-full h-auto"
          priority
        />
      </Link>
      <div className="p-2">
        <p className="flex justify-between">
          {productName}{" "}
          {isFeatured ? (
            <Star className="w-5 fill" onClick={handleAddToFav} />
          ) : (
            <Star className="w-5 fill-black" onClick={handleAddToFav} />
          )}
        </p>
        <p>{productPrice} LKR</p>
      </div>
    </div>
  );
};

export default ProductCard;
