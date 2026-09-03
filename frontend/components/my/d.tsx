"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

type CauroselProps = {
  image: string;
  //{images}:CauroselProps
};
export default function CarouselWithThumbs({ image }: CauroselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const images = [
    image,
    "https://www.fffuel.co/images/dddepth-preview/dddepth-051.jpg",
    "https://www.fffuel.co/images/dddepth-preview/dddepth-029.jpg",
    "https://www.fffuel.co/images/dddepth-preview/dddepth-038.jpg",
    "https://www.fffuel.co/images/dddepth-preview/dddepth-012.jpg",
  ];

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },

    [api],
  );

  return (
    <div className="flex gap-2">
      {/* <Carousel className="w-auto  h-100" orientation="vertical">
        <div className="">
          <CarouselContent className="flex">
            {images.map((image, index) => (
              <CarouselItem
                className={cn(
                  "basis-1/2 cursor-pointer transition-opacity",
                  current === index + 1 ? "opacity-100" : "opacity-50",
                )}
                key={image}
                onClick={() => handleThumbClick(index)}
              >
                <img
                  alt="dddepth-248"
                  className="size-30 rounded-xl object-cover"
                  src={image}
                  width={10}
                  height={10}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}

      <Carousel orientation="vertical">
        <CarouselContent className="-mt-1">
          {images.map((image, index) => (
            <CarouselItem
              key={image}
              className={cn(
                "basis-1/3 pt-1",
                current === index + 1 ? "opacity-100" : "opacity-50",
              )}
              onClick={() => handleThumbClick(index)}
            >
              <div className="p-1">
                <img
                  alt="dddepth-248"
                  className="size-20 rounded-xl object-cover"
                  src={image}
                  width={10}
                  height={10}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel
        className="w-full h-[700px] overflow-hidden"
        setApi={setApi}
        orientation="vertical"
      >
        <CarouselContent className="h-[700px]">
          {images.map((image) => (
            <CarouselItem key={image}>
              <img
                alt="dddepth-248"
                className="size-full  rounded-xl object-cover"
                src={image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* 
      <Carousel className="w-full max-w-[12rem] sm:max-w-xs" orientation="vertical">
        <CarouselContent className="h-300">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}
