"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/use-in-view";

type Animation = "fade-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "scale-in" | "blur-in" | "card-reveal" | "cert-card-enter" | "icon-pop" | (string & {});

interface AnimateInProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "aside" | "article" | "span";
  threshold?: number;
}

export function AnimateIn({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  as = "div",
  threshold = 0.1,
}: AnimateInProps) {
  const { ref, isInView } = useInView({ threshold });

  const style = {
    opacity: isInView ? 1 : 0,
    animation: isInView
      ? `${animation} ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`
      : "none",
  };

  const props = {
    ref,
    className: cn(className),
    style,
  };

  switch (as) {
    case "section":
      return <section {...props}>{children}</section>;
    case "aside":
      return <aside {...props}>{children}</aside>;
    case "article":
      return <article {...props}>{children}</article>;
    case "span":
      return <span {...props}>{children}</span>;
    default:
      return <div {...props}>{children}</div>;
  }
}
