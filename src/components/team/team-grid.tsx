"use client";

import type { TeamMember } from "@/types";
import { TeamMemberCard } from "./team-member-card";
import { useInView } from "@/lib/hooks/use-in-view";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  if (!members.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted">No team members to display.</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, i) => (
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
  );
}
