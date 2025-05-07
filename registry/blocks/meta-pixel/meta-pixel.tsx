import Script from "next/script";

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export function event(name: string, options = {}) {
  window.fbq("track", name, options);
}

export function MetaPixel({ mpId }: { mpId: string }) {
  const handleOnLoad = () => {
    window.fbq("track", "PageView");
  };

  return (
    <Script
      id="fb-pixel"
      src="/scripts/pixel.js"
      strategy="afterInteractive"
      onLoad={handleOnLoad}
      data-pixel-id={mpId}
    />
  );
}
