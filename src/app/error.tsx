"use client";

import { Button, Section } from "@/components/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section className="flex items-center justify-center py-32">
      <div className="text-center">
        <p className="text-5xl font-bold text-primary sm:text-7xl">500</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Something Went Wrong
        </h1>
        <p className="mt-4 text-base text-muted sm:text-lg">
          We apologize for the inconvenience. It&apos;s not you, it&apos;s us. We are fixing it as we speak.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    </Section>
  );
}
