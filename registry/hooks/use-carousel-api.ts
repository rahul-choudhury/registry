"use client";

import * as React from "react";
import type { CarouselApi } from "@/components/ui/carousel";

/**
 * Track a shadcn carousel API instance and expose convenient slide metadata.
 *
 * @returns The Embla API instance, its setter, the one-based active index,
 * and the total snap count.
 */
export function useCarouselApi() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    api,
    setApi,
    current,
    count,
  };
}
