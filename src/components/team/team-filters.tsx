"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { name: "All", slug: "" },
  { name: "Leadership", slug: "Leadership" },
  { name: "Engineering", slug: "Engineering" },
  { name: "Finance", slug: "Finance" },
  { name: "AI", slug: "AI" },
];

export function TeamFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeDept = searchParams.get("department") || "";

  const handleFilter = (department: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (department) {
      params.set("department", department);
    } else {
      params.delete("department");
    }
    const qs = params.toString();
    router.push(`/about/leadership${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max py-4">
        {DEPARTMENTS.map((dept) => {
          const isActive = dept.slug === ""
            ? !activeDept
            : activeDept === dept.slug;

          return (
            <button
              key={dept.slug || "all"}
              onClick={() => handleFilter(dept.slug)}
              className={cn(
                "filter-chip cursor-pointer",
                isActive && "filter-chip-active"
              )}
            >
              {dept.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
