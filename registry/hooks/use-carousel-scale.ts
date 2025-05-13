"use client";

import * as React from "react";
import { type CarouselApi } from "@/components/ui/carousel";

type ScaleCarouselOptions = {
  minScale?: number;
  tweenFactorBase?: number;
};

function numberWithinRange(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

export function useCarouselScale(opts?: ScaleCarouselOptions) {
  const { tweenFactorBase = 0.84, minScale = 0.7 } = opts ?? {};

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const tweenFactor = React.useRef(0);
  const tweenNodes = React.useRef<HTMLElement[]>([]);

  const setTweenNodes = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.childNodes[0] as HTMLElement;
    });
  }, []);

  const setTweenFactor = React.useCallback(
    (emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      tweenFactor.current = tweenFactorBase * emblaApi.scrollSnapList().length;
    },
    [tweenFactorBase],
  );

  const tweenScale = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (!slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, minScale, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
        }
      });
    });
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    setTweenNodes(api);
    setTweenFactor(api);
    tweenScale(api);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      tweenScale(api);
    });

    api.on("scroll", () => {
      tweenScale(api);
    });

    api.on("reInit", () => {
      setTweenNodes(api);
      setTweenFactor(api);
      tweenScale(api);
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, setTweenNodes, setTweenFactor, tweenScale]);

  return {
    setApi,
    current,
    count,
  };
}
