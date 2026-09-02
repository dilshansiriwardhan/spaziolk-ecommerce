"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { searchProductsAction } from "@/app/actions/search";
import SearchItem from "./search-item";

type Result = {
  id: string;
  productName: string;
  productPrice: number;
  imageUrl: string | null;
};

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchProductsAction(query);
        setResults(data);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Base UI: render prop instead of asChild */}
      <PopoverTrigger
        render={
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-100 max-w-xl"
          />
        }
      />

      <PopoverContent
        align="start"
        className="w-[min(90vw,36rem)] p-3"
        // keep focus in the input while typing
        // onOpenAutoFocus={(e) => e.preventDefault()}
        initialFocus={false}
      >
        <PopoverHeader className="mb-2">
          <PopoverTitle className="text-sm">
            {loading ? "Searching..." : "Results"}
          </PopoverTitle>
        </PopoverHeader>

        {results.length === 0 ? (
          <p className="text-muted-foreground text-sm">No products found.</p>
        ) : (
          <div className="grid max-h-[70vh] gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-1">
            {results.map((p) => (
              <SearchItem
                key={p.id}
                id={p.id}
                productName={p.productName}
                productPrice={p.productPrice}
                imageSrc={
                  p.imageUrl ??
                  "https://www.fffuel.co/images/dddepth-preview/dddepth-051.jpg"
                }
              />
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
