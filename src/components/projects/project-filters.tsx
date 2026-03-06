"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page");
    const qs = params.toString();
    router.push(`/projects${qs ? `?${qs}` : ""}`);
  };

  const categories = [{ name: "All", slug: "" }, ...SERVICE_CATEGORIES];

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max py-4">
        {categories.map((cat) => {
          const isActive = cat.slug === ""
            ? !activeCategory
            : activeCategory === cat.name;

          return (
            <button
              key={cat.slug || "all"}
              onClick={() => handleFilter(cat.slug === "" ? "" : cat.name)}
              className={cn(
                "filter-chip cursor-pointer",
                isActive && "filter-chip-active"
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
