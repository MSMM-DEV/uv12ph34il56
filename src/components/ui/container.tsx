import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, as: Component = "div" }, ref) {
    return (
      <Component ref={ref as React.Ref<HTMLDivElement>} className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
        {children}
      </Component>
    );
  }
);
