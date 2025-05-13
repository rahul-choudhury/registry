"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useCarouselScale } from "@/registry/hooks/use-carousel-scale";

export function CarouselScalePreview() {
  const { setApi } = useCarouselScale();
  return (
    <div className="flex gap-6 justify-center bg-muted p-4">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="aspect-[16/12] text-3xl font-semibold border bg-gray-100 rounded-md grid place-items-center">
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
