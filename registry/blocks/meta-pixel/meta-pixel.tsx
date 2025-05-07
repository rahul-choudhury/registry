import Script from "next/script";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export function event(name: string, options = {}) {
  window.fbq("track", name, options);
}

export function MetaPixel() {
  const handleOnLoad = () => {
    window.fbq("track", "PageView");
  };

  return (
    <Script
      id="fb-pixel"
      src="/scripts/pixel.js"
      strategy="afterInteractive"
      onLoad={handleOnLoad}
      data-pixel-id={META_PIXEL_ID}
    />
  );
}
