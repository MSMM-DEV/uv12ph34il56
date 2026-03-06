"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProjectPagination({ currentPage, totalPages }: ProjectPaginationProps) {
  const searchParams = useSearchParams();

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return `/projects${qs ? `?${qs}` : ""}`;
  }

  // Build page numbers array with ellipsis logic
  function getPageNumbers(): (number | "ellipsis")[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Projects pagination"
      className="mt-16 flex items-center justify-center gap-2"
      style={{ animation: "fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both" }}
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="group flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary cursor-pointer"
          scroll={false}
          aria-label="Previous page"
        >
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-gray-300 cursor-default">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-muted"
            >
              &hellip;
            </span>
          ) : (
            <Link
              key={page}
              href={buildHref(page)}
              scroll={false}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                page === currentPage
                  ? "bg-secondary text-white shadow-sm"
                  : "text-foreground hover:bg-accent hover:text-primary"
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="group flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary cursor-pointer"
          scroll={false}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-gray-300 cursor-default">
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </nav>
  );
}
