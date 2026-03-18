import Script from "next/script";

// https://developers.facebook.com/docs/facebook-pixel/advanced/
/**
 * Track a Meta Pixel event after the pixel script has been initialized.
 *
 * @param name The Meta event name to track.
 * @param options Optional payload sent along with the event.
 */
export function event(name: string, options = {}) {
  window.fbq("track", name, options);
}

/**
 * Inject the Meta Pixel script and send the initial `PageView` event.
 *
 * @param mpId Your Meta Pixel ID.
 */
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
