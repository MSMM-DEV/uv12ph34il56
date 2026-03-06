import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "light" | "dark" | "primary";
  id?: string;
}

const bgStyles = {
  white: "bg-white",
  light: "bg-gray-50",
  dark: "bg-secondary text-white",
  primary: "bg-primary text-white",
};

export function Section({
  children,
  className,
  containerClassName,
  background = "white",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", bgStyles[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
