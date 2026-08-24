import React from "react";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselWithThumbs from "@/components/my/d";
import { Plus } from "lucide-react";

const ProductPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-20 gap-1">
      <div className="mx-10">
        {/* <Image
          src="/products/002.webp"
          alt="Product"
          width={1584}
          height={396}
          className="w-full h-auto"
          priority
        /> */}
        <CarouselWithThumbs/>
      </div>
      <div className="flex flex-col gap-3">
        <div>2 reviews</div>
        <div className="flex justify-between">
          <div>
            <p>Le Classique Boxy Shirt // Black</p>
            <p>shirt</p>
          </div>
          <div>
            <p>Rs.1,350.00</p>
            <p>tax included</p>
          </div>
        </div>
        <div>
          <ToggleGroup variant="outline" defaultValue={["all"]}>
            <ToggleGroupItem value="all" aria-label="Toggle all">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="missed" aria-label="Toggle missed">
              Missed
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="py-2">
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
        {/* Accordition */}
        <div>
          <Accordion defaultValue={["shipping"]} className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger >
                What are your shipping options?
              </AccordionTrigger>
              <AccordionContent>
                We offer standard (5-7 days), express (2-3 days), and overnight
                shipping. Free shipping on international orders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                Returns accepted within 30 days. Items must be unused and in
                original packaging. Refunds processed within 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                Reach us via email, live chat, or phone. We respond within 24
                hours during business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

