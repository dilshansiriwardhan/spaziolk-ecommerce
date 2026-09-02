import Link from "next/link";
import Image from "next/image";
import React from "react";

type SearchItemProps = {
  id: string;
  productName: string;
  productPrice: number;
  imageSrc: string;
};

const SearchItem = ({
  id,
  productName,
  productPrice,
  imageSrc,
}: SearchItemProps) => {

  return (
    <Link href={`/products/${id}`}>
      <div className="flex gap-2 items-center">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            className="object-cover"
            sizes="80px"
            unoptimized
          />
        </div>
        <div className="w-full flex justify-between">
          <p className="text-l">{productName}</p>
          <p>{productPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
