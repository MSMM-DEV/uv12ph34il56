"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage, ProjectVideo } from "@/types";

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */

/** Extract a YouTube or Vimeo embed URL from a standard watch/share URL. */
function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/(?:video\/)?)(\d+)/
  );
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

/** Get a YouTube thumbnail URL for a video. */
function getVideoThumbnail(url: string): string | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
}

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

type MediaItem =
  | { type: "image"; url: string; alt: string; caption: string }
  | { type: "video"; url: string; title: string; embedUrl: string; thumbnail: string | null };

interface ProjectGalleryProps {
  gallery: GalleryImage[];
  videos: ProjectVideo[];
  projectName: string;
}

/* ────────────────────────────────────────────────────────────
   Lightbox
   ──────────────────────────────────────────────────────────── */

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  // Close on Escape; navigate with arrow keys
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    }
    window.addEventListener("keydown", handleKey);
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev / Next arrows */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Next"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media content */}
      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <div className="relative">
            <Image
              src={item.url}
              alt={item.alt || "Gallery image"}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
              sizes="90vw"
            />
            {item.caption && (
              <p className="mt-3 text-center text-sm text-white/80">
                {item.caption}
              </p>
            )}
          </div>
        ) : (
          <div className="aspect-video w-[80vw] max-w-4xl">
            <iframe
              src={item.embedUrl}
              title={item.title || "Video"}
              className="h-full w-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Gallery Grid Item
   ──────────────────────────────────────────────────────────── */

function GalleryItem({
  item,
  onClick,
  className,
  sizes,
}: {
  item: MediaItem;
  onClick: () => void;
  className?: string;
  sizes: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg hover:ring-primary/20 focus-visible:outline-2 focus-visible:outline-primary ${className ?? ""}`}
      aria-label={
        item.type === "image"
          ? `View image: ${item.alt || "Gallery image"}`
          : `Play video: ${item.title || "Video"}`
      }
    >
      {item.type === "image" ? (
        <Image
          src={item.url}
          alt={item.alt || "Gallery image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={sizes}
        />
      ) : (
        <>
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title || "Video thumbnail"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={sizes}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-secondary" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Hover overlay with caption or title */}
      {((item.type === "image" && item.caption) || (item.type === "video" && item.title)) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm font-medium text-white">
            {item.type === "image" ? item.caption : item.title}
          </p>
        </div>
      )}

      {/* Expand icon top-right */}
      {item.type === "image" && (
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      )}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────────── */

export function ProjectGallery({ gallery, videos, projectName }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build a unified media array (images first, then videos), limited to 4
  const mediaItems: MediaItem[] = [];

  for (const img of (gallery ?? []).slice(0, 4)) {
    if (img.url) {
      mediaItems.push({
        type: "image",
        url: img.url,
        alt: img.alt || `${projectName} gallery image`,
        caption: img.caption || "",
      });
    }
  }

  const remaining = 4 - mediaItems.length;
  for (const vid of (videos ?? []).slice(0, remaining)) {
    const embedUrl = getEmbedUrl(vid.url);
    if (embedUrl) {
      mediaItems.push({
        type: "video",
        url: vid.url,
        title: vid.title || "",
        embedUrl,
        thumbnail: getVideoThumbnail(vid.url),
      });
    }
  }

  const count = mediaItems.length;

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < count - 1 ? i + 1 : i)),
    [count]
  );

  // Don't render if there are no media items
  if (count === 0) return null;

  /* Grid layout classes based on item count:
     1 item  -> full width, 16:9 aspect
     2 items -> 2-column grid, equal
     3 items -> bento: 1 large left + 2 small stacked right
     4 items -> 2x2 grid
  */

  return (
    <div className="mt-12">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          Project Gallery
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Grid */}
      {count === 1 && (
        <div className="relative aspect-[16/9] w-full">
          <GalleryItem
            item={mediaItems[0]}
            onClick={() => openLightbox(0)}
            className="absolute inset-0"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      {count === 2 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mediaItems.map((item, i) => (
            <div key={i} className="relative aspect-[4/3]">
              <GalleryItem
                item={item}
                onClick={() => openLightbox(i)}
                className="absolute inset-0"
                sizes="(max-width: 640px) 100vw, 448px"
              />
            </div>
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Large item spanning full height on left */}
          <div className="relative aspect-[4/3] sm:row-span-2 sm:aspect-auto sm:min-h-[320px]">
            <GalleryItem
              item={mediaItems[0]}
              onClick={() => openLightbox(0)}
              className="absolute inset-0"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
          {/* Two smaller items stacked on right */}
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[156px]">
            <GalleryItem
              item={mediaItems[1]}
              onClick={() => openLightbox(1)}
              className="absolute inset-0"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[156px]">
            <GalleryItem
              item={mediaItems[2]}
              onClick={() => openLightbox(2)}
              className="absolute inset-0"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
        </div>
      )}

      {count === 4 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mediaItems.map((item, i) => (
            <div key={i} className="relative aspect-[4/3]">
              <GalleryItem
                item={item}
                onClick={() => openLightbox(i)}
                className="absolute inset-0"
                sizes="(max-width: 640px) 100vw, 448px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && mediaItems[lightboxIndex] && (
        <Lightbox
          item={mediaItems[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < count - 1}
        />
      )}
    </div>
  );
}
