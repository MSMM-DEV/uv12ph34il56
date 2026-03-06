import { Button, Container, AnimateIn } from "@/components/ui";

export function CTABanner() {
  return (
    <section
      className="relative bg-primary overflow-hidden"
    >
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          background: "linear-gradient(135deg, transparent 0%, var(--primary-dark) 50%, transparent 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />
      <Container className="relative py-16 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <AnimateIn animation="slide-in-left" duration={700} className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">
              Get In Touch
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Ready to Start Your Next Project?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/60 sm:text-lg">
              Our team of experienced engineers is ready to help bring your
              infrastructure vision to life.
            </p>
          </AnimateIn>
          <AnimateIn animation="slide-in-right" delay={200} duration={700}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" variant="white" size="lg" className="btn-shine">
                Contact Us Today
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Our Services
              </Button>
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
