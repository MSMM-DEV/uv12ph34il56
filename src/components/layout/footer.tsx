import Link from "next/link";
import Image from "next/image";
import { Container, AnimateIn } from "@/components/ui";
import { OFFICES, SERVICE_CATEGORIES, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <Container className="py-8 sm:py-10">
        {/* Top: logo + nav columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
          {/* Company Info */}
          <AnimateIn animation="fade-up">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/MSMM%20Logo.png"
                alt="MSMM Engineering, LLC"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 cursor-pointer hover:bg-white/20 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
              Civil engineering design across the Gulf South — flood protection,
              water &amp; wastewater, and public infrastructure.
            </p>
          </AnimateIn>

          {/* Quick Links */}
          <AnimateIn animation="fade-up" delay={100}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Leadership", href: "/about/leadership" },
                { label: "Projects", href: "/projects" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors duration-200 cursor-pointer hover:text-white link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimateIn>

          {/* Services */}
          <AnimateIn animation="fade-up" delay={200}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Services
            </h3>
            <ul className="mt-3 space-y-2">
              {SERVICE_CATEGORIES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-gray-300 transition-colors duration-200 cursor-pointer hover:text-white link-underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>

        {/* Offices row */}
        <AnimateIn animation="fade-up" delay={300}>
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
              {OFFICES.map((office) => (
                <div key={office.name} className="flex items-start gap-2 text-sm">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <div className="min-w-0">
                    <span className="font-medium text-gray-300">{office.name}</span>
                    <br className="sm:hidden" />
                    <span className="mx-1.5 hidden text-gray-600 sm:inline">&middot;</span>
                    <a
                      href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
                      className="text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="flex items-center justify-center py-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
