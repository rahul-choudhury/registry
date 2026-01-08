import MetaPixel from "./meta-pixel.mdx";
import TailwindHelper from "./tailwind-helper.mdx";
import UseCarouselApi from "./use-carousel-api.mdx";
import UseCarouselScale from "./use-carousel-scale.mdx";
import MultiStepForm from "./multi-step-form.mdx";
import SubmitButton from "./submit-button.mdx";
import UseMediaQuery from "./use-media-query.mdx";
import registry from "../registry.json";

export const BLOCKS = [
  MetaPixel,
  TailwindHelper,
  UseCarouselApi,
  UseCarouselScale,
  MultiStepForm,
  SubmitButton,
  UseMediaQuery,
].map((Block, index) => ({
  Component: Block,
  type: registry.items[index].type,
  name: registry.items[index].name,
}));
