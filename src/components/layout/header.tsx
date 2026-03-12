"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80"
          : "border-b border-transparent bg-white"
      )}
    >
      <Container className="flex h-16 sm:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/MSMM Logo.png"
            alt="MSMM Engineering, LLC"
            width={200}
            height={50}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-gray-50"
                )}
              >
                {link.label}
                {"children" in link && link.children && (
                  <svg className="ml-1 inline-block h-3 w-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {/* Active indicator line */}
                {(pathname === link.href || pathname.startsWith(link.href + "/")) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary origin-left" style={{ animation: "draw-line 0.3s ease both" }} />
                )}
              </Link>

              {/* Dropdown with entrance animation */}
              {"children" in link && link.children && (
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="min-w-[200px] rounded-lg border border-border bg-white py-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors cursor-pointer",
                          pathname === child.href
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-gray-50"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="ml-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 cursor-pointer hover:bg-primary-dark hover:shadow-md btn-shine"
          >
            Work With Us
          </Link>
        </nav>

        {/* Mobile Hamburger with animation */}
        <button
          className="lg:hidden relative p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 origin-center",
                mobileOpen && "translate-y-[4px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300",
                mobileOpen && "opacity-0 scale-x-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 origin-center",
                mobileOpen && "-translate-y-[4px] -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Menu with slide animation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border bg-white">
          <Container className="py-4">
            <nav className="flex flex-col gap-0.5 sm:gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-[15px] sm:px-4 sm:py-3 sm:text-base font-medium transition-colors cursor-pointer",
                      pathname === link.href
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                  {"children" in link && link.children && (
                    <div className="ml-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block rounded-md px-4 py-2 text-sm transition-colors cursor-pointer",
                            pathname === child.href
                              ? "text-primary"
                              : "text-muted hover:text-primary"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-md bg-primary px-4 py-2.5 sm:py-3 text-center text-[15px] sm:text-base font-semibold text-white transition-colors cursor-pointer hover:bg-primary-dark"
              >
                Work With Us
              </Link>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
