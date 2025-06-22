/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Skeleton from "./skeleton";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  originalUrl: string;
  fallback?: string;
}

const FALLBACK_IMAGE = "https://placehold.co/300x300?text=No+Image";

export function SmartImage({
  originalUrl,
  fallback = FALLBACK_IMAGE,
  alt,
  className = "",
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [proxiedSrc, setProxiedSrc] = useState("");

  useEffect(() => {
    setProxiedSrc(`/api/images/proxy?url=${encodeURIComponent(originalUrl)}`);
  }, []);

  return (
    <div className="relative w-full h-40 overflow-hidden rounded bg-muted">
      {!loaded && !error && <Skeleton />}

      {proxiedSrc && (
        <img
          src={error ? fallback : proxiedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            `absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`,
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}

export default SmartImage;
