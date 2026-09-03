// components/AddToCartButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addToCartAction } from "@/app/actions/add-to-cart";

interface Props {
  productId: string;
  variantId?: string | null;
}

export default function AddToCartButton({ productId, variantId = null }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);

    const result = await addToCartAction( productId, variantId, 1);

    setLoading(false);

    // if (result.success) {
    //   alert("Added to cart!");
    // } else {
    //   alert(result.error || "Something went wrong");
    // }
  };

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}