import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * A layout component that provides consistent padding and max-width constraints.
 */
export function Container({ children, className, size }: ContainerProps) {
  const containerVariants = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  const combinedClassName = cn(
    "mx-auto px-4 w-full",
    size && containerVariants[size],
    className
  );

  return <div className={combinedClassName}>{children}</div>;
}
