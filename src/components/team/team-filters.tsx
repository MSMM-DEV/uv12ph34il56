"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const DEFAULT_DEPARTMENTS = ["Leadership", "Engineering", "Operations/Finance", "AI"];

interface TeamFiltersProps {
  departments?: string[];
}

export function TeamFilters({ departments }: TeamFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeDept = searchParams.get("department") || "";
  const deptList = departments && departments.length > 0 ? departments : DEFAULT_DEPARTMENTS;

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
        <button
          onClick={() => handleFilter("")}
          className={cn(
            "filter-chip cursor-pointer",
            !activeDept && "filter-chip-active"
          )}
        >
          All
        </button>
        {deptList.map((dept) => (
          <button
            key={dept}
            onClick={() => handleFilter(dept)}
            className={cn(
              "filter-chip cursor-pointer",
              activeDept === dept && "filter-chip-active"
            )}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
}
