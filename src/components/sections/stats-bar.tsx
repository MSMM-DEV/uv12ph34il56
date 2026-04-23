"use client";

import { Container } from "@/components/ui";
import { useInView } from "@/lib/hooks/use-in-view";
import { useCountUp } from "@/lib/hooks/use-count-up";

interface Stat {
  value: string;
  label: string;
}

const FALLBACK_STATS: Stat[] = [
  { value: "14+", label: "Years of Experience" },
  { value: "2011", label: "Year Founded" },
  { value: "4", label: "Office Locations" },
  { value: "150+", label: "Years Combined Experience" },
];

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) return { num: parseInt(match[1], 10), suffix: match[2] };
  return { num: 0, suffix: value };
}

function AnimatedStat({ stat, isInView, index }: { stat: Stat; isInView: boolean; index: number }) {
  const { num, suffix } = parseStatValue(stat.value);
  const count = useCountUp(num, isInView, 1800);

  return (
    <div
      className="text-center"
      style={{
        opacity: isInView ? 1 : 0,
        animation: isInView
          ? `fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms both`
          : "none",
      }}
    >
      <div className="text-xl font-bold text-primary tabular-nums sm:text-2xl md:text-3xl lg:text-4xl">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-muted">
        {stat.label}
      </div>
    </div>
  );
}

interface StatsBarProps {
  stats?: Stat[];
}

export function StatsBar({ stats = FALLBACK_STATS }: StatsBarProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section className="bg-white border-b border-border" ref={ref}>
      <Container>
        <div className="grid grid-cols-2 gap-6 py-10 sm:gap-8 sm:py-12 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} isInView={isInView} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
