"use client";

import Image from "next/image";
import type { GalleryImage, ProjectVideo } from "@/types";

interface ProjectCarouselProps {
  coverImage: string | null;
  gallery: GalleryImage[];
  videos: ProjectVideo[];
  projectName: string;
}

export function ProjectCarousel({
  coverImage,
  gallery,
  videos,
  projectName,
}: ProjectCarouselProps) {
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasVideos = (videos?.length ?? 0) > 0;
  const totalMedia = (gallery?.length ?? 0) + (videos?.length ?? 0);

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
      {coverImage ? (
        <Image
          src={coverImage}
          alt={projectName}
          fill
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <p className="text-sm text-gray-400">No image available</p>
        </div>
      )}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />

      {/* Media count badge — shown when gallery/videos exist in Sanity */}
      {totalMedia > 0 && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          {totalMedia} {totalMedia === 1 ? "item" : "items"}
        </div>
      )}
    </div>
  );
}
