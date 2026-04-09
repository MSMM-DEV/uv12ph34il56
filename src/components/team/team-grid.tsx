"use client";

import { useRef, useState } from "react";
import type { TeamMember } from "@/types";
import { TeamMemberCard } from "./team-member-card";
import { useInView } from "@/lib/hooks/use-in-view";

const PER_PAGE = 9;

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [page, setPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Reset to page 1 when members change (e.g. department filter)
  const [prevMembers, setPrevMembers] = useState(members);
  if (prevMembers !== members) {
    setPrevMembers(members);
    if (page !== 1) setPage(1);
  }

  const totalPages = Math.ceil(members.length / PER_PAGE);
  const showPagination = totalPages > 1;
  const paged = showPagination ? members.slice((page - 1) * PER_PAGE, page * PER_PAGE) : members;

  const goToPage = (p: number) => {
    setPage(p);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!members.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted">No team members to display.</p>
      </div>
    );
  }

  return (
    <div ref={gridTopRef}>
      <div ref={ref} className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((member, i) => (
          <div
            key={member.id}
            style={{
              opacity: isInView ? 1 : 0,
              animation: isInView
                ? `fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms both`
                : "none",
            }}
          >
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>

      {showPagination && (
        <nav aria-label="Team pagination" className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                p === page
                  ? "bg-[#e10d0d] text-white shadow-sm"
                  : "border border-border text-muted hover:bg-gray-50 hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-gray-50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
