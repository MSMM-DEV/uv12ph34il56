import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "secondary" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  outline: "border border-border text-foreground",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
