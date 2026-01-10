import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * A styled container component that provides a card-like appearance
 * with consistent padding, border, and background.
 */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border bg-surface p-3",
        "dark:border-none",
        className
      )}
    >
      {children}
    </div>
  );
}
