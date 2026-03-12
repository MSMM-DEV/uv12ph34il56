import Link from "next/link";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn("relative bg-secondary py-12 sm:py-16 md:py-20 overflow-hidden", className)}>
      {/* Background orb */}
      <div
        className="absolute -right-1/4 -top-1/4 h-[200px] w-[200px] rounded-full opacity-[0.06] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />
      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4"
            style={{ animation: "hero-text-reveal 500ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both" }}
          >
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors cursor-pointer hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span>/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors cursor-pointer hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-300">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
          style={{ animation: "hero-text-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-300"
            style={{ animation: "hero-text-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both" }}
          >
            {subtitle}
          </p>
        )}
        {/* Decorative line */}
        <div
          className="mt-6 h-0.5 w-16 rounded-full bg-primary origin-left"
          style={{ animation: "draw-line 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms both" }}
        />
      </Container>
    </div>
  );
}
