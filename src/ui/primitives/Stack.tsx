import React from "react";
import { cn } from "@/lib/utils";

export interface StackProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * A layout component that stacks its children vertically with a space between them.
 */
export function Stack({ children, className }: StackProps) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}
