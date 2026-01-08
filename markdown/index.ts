import MetaPixel from "./meta-pixel.mdx";
import TailwindHelper from "./tailwind-helper.mdx";
import UseCarouselApi from "./use-carousel-api.mdx";
import UseCarouselScale from "./use-carousel-scale.mdx";
import MultiStepForm from "./multi-step-form.mdx";
import SubmitButton from "./submit-button.mdx";
import UseMediaQuery from "./use-media-query.mdx";
import registry from "../registry.json";

const blocks = [
  { Component: MetaPixel, name: "meta-pixel" },
  { Component: TailwindHelper, name: "tailwind-helper" },
  { Component: UseCarouselApi, name: "use-carousel-api" },
  { Component: UseCarouselScale, name: "use-carousel-scale" },
  { Component: MultiStepForm, name: "multi-step-form" },
  { Component: SubmitButton, name: "submit-button" },
  { Component: UseMediaQuery, name: "use-media-query" },
];

export const BLOCKS = blocks.map((block) => {
  const registryItem = registry.items.find((item) => item.name === block.name);
  return {
    ...block,
    type: registryItem?.type || "registry:component",
  };
});
