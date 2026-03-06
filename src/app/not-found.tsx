import { Button, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="flex items-center justify-center py-32">
      <div className="text-center">
        <p className="text-5xl font-bold text-primary sm:text-7xl">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </Section>
  );
}
