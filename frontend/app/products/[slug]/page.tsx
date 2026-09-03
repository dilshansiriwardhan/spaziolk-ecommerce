import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CarouselWithThumbs from "@/components/my/d";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { DrawerDemo } from "@/components/my/drawer";
import AddToCartButton from "@/components/my/add-to-cart";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, slug),
    with: {
      category: true,
      images: true,
      variants: true,
      features: true,
      reviews: true,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-1 mb-20">
      <div className="mr-10">
        <CarouselWithThumbs />
      </div>
      <div className="flex flex-col gap-3 pl-5s">
        <div>{product?.reviews.length} reviews </div>
        <div className="flex justify-between">
          <div>
            <p>{product?.productName}</p>
            <p>{product?.category?.name}</p>
          </div>
          <div className="text-right">
            <p>{product?.productPrice} LKR</p>
            <p>tax included</p>
          </div>
        </div>
        <div className="w-full">
          {/* <ToggleGroup
            variant="outline"
            defaultValue={["s"]}
            className={"w-full flex justify-between gap-2"}
          >
            <ToggleGroupItem value="s" aria-label="Toggle all">
              S
            </ToggleGroupItem>
            <ToggleGroupItem value="m" aria-label="Toggle missed">
              M
            </ToggleGroupItem>
            <ToggleGroupItem value="l" aria-label="Toggle all">
              L
            </ToggleGroupItem>
            <ToggleGroupItem value="xl" aria-label="Toggle all">
              XL
            </ToggleGroupItem>
            <ToggleGroupItem value="2xl" aria-label="Toggle all">
              2XL
            </ToggleGroupItem>
          </ToggleGroup> */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={"w-full"}>
              <TabsTrigger value="s">S</TabsTrigger>
              <TabsTrigger value="m">M</TabsTrigger>
              <TabsTrigger value="l">L</TabsTrigger>
              <TabsTrigger value="xl">XL</TabsTrigger>
              <TabsTrigger value="2xl">2XL</TabsTrigger>
            </TabsList>

            <TabsContent value="s" className="px-2 flex gap-2">
              {product?.variants && product.variants.length > 0 ? (
                product.variants.map((variant) => (
                  <div
                    key={variant.id} // Always include a unique key in loops
                    style={{ backgroundColor: variant.colorCode ?? "#B58B6A" }} // Fixes Tailwind runtime parsing issue
                    className="w-10 h-10 rounded"
                    title={variant.colorCode ?? "default"}
                  />
                ))
              ) : (
                <div className="bg-[#F2E9DC] w-10 h-10 rounded" />
              )}
            </TabsContent>
            <TabsContent value="m" className="px-2 flex gap-2">
              <div className="bg-[#1C1C1C] w-10 h-10 rounded" />
              <div className="bg-[#F2E9DC] w-10 h-10 rounded" />
              <div className="bg-[#7A6652] w-10 h-10 rounded" />
              <div className="bg-[#3F4A3C] w-10 h-10 rounded" />
              <div className="bg-[#B58B6A] w-10 h-10 rounded" />
            </TabsContent>
            <TabsContent value="l" className="px-2 flex gap-2">
              <div className="bg-[#1C1C1C] w-10 h-10 rounded" />
              <div className="bg-[#F2E9DC] w-10 h-10 rounded" />
              <div className="bg-[#7A6652] w-10 h-10 rounded" />
              <div className="bg-[#3F4A3C] w-10 h-10 rounded" />
              <div className="bg-[#B58B6A] w-10 h-10 rounded" />
            </TabsContent>
            <TabsContent value="xl" className="px-2 flex gap-2">
              <div className="bg-[#1C1C1C] w-10 h-10 rounded" />
              <div className="bg-[#F2E9DC] w-10 h-10 rounded" />
              <div className="bg-[#7A6652] w-10 h-10 rounded" />
              <div className="bg-[#3F4A3C] w-10 h-10 rounded" />
              <div className="bg-[#B58B6A] w-10 h-10 rounded" />
            </TabsContent>
            <TabsContent value="2xl" className="px-2 flex gap-2">
              <div className="bg-[#1C1C1C] w-10 h-10 rounded" />
              <div className="bg-[#F2E9DC] w-10 h-10 rounded" />
              <div className="bg-[#7A6652] w-10 h-10 rounded" />
              <div className="bg-[#3F4A3C] w-10 h-10 rounded" />
              <div className="bg-[#B58B6A] w-10 h-10 rounded" />
            </TabsContent>
          </Tabs>
          <div className="py-2">
            <DrawerDemo
              trigger={
                <div>
                  <AddToCartButton productId={product!.id} variantId={null} />
                </div>
              }
            />
          </div>
        </div>
        {/* Accordition */}
        <div>
          <Accordion defaultValue={["features"]} className="w-full mb-20">
            <AccordionItem value="features">
              <AccordionTrigger>Core Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-none space-y-2 pl-5 text-sm text-gray-700">
                  {product?.features && product.features.length > 0 && (
                    <ul className="list-none space-y-2 pl-5 text-sm text-gray-700">
                      {product.features.map((feature) => (
                        <li key={feature.id}>{feature.name}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>{product?.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                <section>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    Shipping
                  </h3>

                  <ul className="list-none space-y-2 pl-5 mb-4 text-gray-700">
                    <li>Free shipping on orders above ₹500 within India</li>
                    <li>Orders dispatched within 24–48 hours</li>
                    <li>Metro cities: 2–5 working days after dispatch</li>
                    <li>Rest of India: 4–7 working days after dispatch</li>
                    <li className="pt-2 font-medium text-gray-900">
                      Ships from Mumbai, Maharashtra
                    </li>
                  </ul>
                </section>

                {/* Returns */}
                <section>
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    Returns
                  </h3>

                  <h4 className="mb-1 font-medium  pl-5">Regular items</h4>

                  <ul className="list-none space-y-2 pl-10 text-gray-700">
                    <li>
                      Returns & exchanges accepted within 7 days of receiving
                    </li>
                    <li>₹100 charge applies to all returns & exchanges</li>
                    <li>
                      Packs/bundles: size exchanges only (no returns), ₹100
                      charge
                    </li>
                  </ul>

                  <h4 className="mb-1 mt-1 font-medium  pl-5">Sale items</h4>

                  <ul className="list-none space-y-2 pl-10 text-gray-700">
                    <li>No returns or exchanges — except clothing</li>
                    <li>
                      Clothing only: exchange for a different size in the same
                      or similar item, ₹100 shipping
                    </li>
                    <li>Price differences are paid by the customer</li>
                    <li>
                      Out of stock? Store credit valid for 3 months — no refunds
                    </li>
                  </ul>
                </section>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>Care Guilde</AccordionTrigger>
              <AccordionContent>
                <ul className="list-none space-y-2 text-sm text-gray-700 pl-5">
                  <li>Do not bleach</li>
                  <li>Do not iron on print, embroidery, or badge</li>
                  <li>Please follow the care label provided on the garment</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
