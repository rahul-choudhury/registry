import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import type { Options } from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const rehypePrettyCodeOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", rehypePrettyCodeOptions]],
  },
});

export default withMDX(nextConfig);
