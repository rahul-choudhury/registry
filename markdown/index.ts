import { getDocumentationMarkdown } from "@/lib/documentation.server";
import registry from "../registry.json";
import MetaPixel from "./meta-pixel.mdx";
import MultiStep from "./multi-step.mdx";
import SubmitButton from "./submit-button.mdx";
import TailwindHelper from "./tailwind-helper.mdx";
import UseCarouselApi from "./use-carousel-api.mdx";
import UseMediaQuery from "./use-media-query.mdx";

const blocks = [
  { Component: MetaPixel, name: "meta-pixel" },
  { Component: TailwindHelper, name: "tailwind-helper" },
  { Component: UseCarouselApi, name: "use-carousel-api" },
  { Component: MultiStep, name: "multi-step" },
  { Component: SubmitButton, name: "submit-button" },
  { Component: UseMediaQuery, name: "use-media-query" },
];

export const BLOCKS = blocks.map((block) => {
  const registryItem = registry.items.find((item) => item.name === block.name);
  return {
    ...block,
    documentationMarkdown: getDocumentationMarkdown(block.name),
    type: registryItem?.type || "registry:component",
  };
});
