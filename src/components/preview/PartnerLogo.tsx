import Image from "next/image";

/**
 * Partner logo.
 *
 * `next/image` for raster logos: the source PNGs in `public/logos` are full
 * size (apollo-energy.png is 75 KB) and render here at 26 to 32 px, so serving
 * them unoptimised was the single heaviest thing on the page.
 *
 * SVGs fall back to a plain <img>, because `next/image` refuses SVG unless
 * `dangerouslyAllowSVG` is set in next.config.ts, and this brief forbids
 * touching that file. knose.svg is the only one affected, and an SVG is already
 * small.
 *
 * Both branches carry explicit width and height, which is what keeps CLS at 0.
 */
export function PartnerLogo({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  if (src.endsWith(".svg")) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
