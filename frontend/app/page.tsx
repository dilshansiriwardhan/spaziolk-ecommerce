import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NavigationMenuDemo } from "@/components/my/navigation-m";
import ProductCard from "@/components/my/product-card";
import List from "@/components/my/list";

export default function Home() {
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
      <div className="grid grid-cols-4 justify-between py-10 px-25 gap-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
