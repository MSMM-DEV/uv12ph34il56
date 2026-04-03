"use client";

import { useState } from "react";
import { Card, CardContent, Badge } from "@/components/ui";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import type { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hover>
      <div className="group relative aspect-[16/17] overflow-hidden bg-gray-100">
        {member.photo ? (
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary/5">
            <svg className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <CardContent>
        <h3 className="text-lg font-semibold text-foreground">
          {member.name}
          {member.credentials && (
            <span className="text-sm font-normal text-muted">, {member.credentials}</span>
          )}
        </h3>
        <p className="text-sm font-medium text-primary">{member.title}</p>
        {member.shortBio && (
          <div className="mt-3">
            <p
              className={`text-sm text-muted${expanded ? "" : " line-clamp-3"}`}
            >
              {member.shortBio}
            </p>
            {member.shortBio.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#e10d0d]/80 hover:text-[#e10d0d] transition-colors cursor-pointer"
                aria-expanded={expanded}
              >
                {expanded ? "Show Less" : "Show More"}
                <svg
                  className={`h-3 w-3 transition-transform duration-200${expanded ? " rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            )}
          </div>
        )}
        {Array.isArray(member.specialties) && member.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {member.specialties.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-muted transition-all duration-200 cursor-pointer hover:text-primary hover:scale-110"
              aria-label={`Email ${member.name}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-all duration-200 cursor-pointer hover:text-primary hover:scale-110"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
