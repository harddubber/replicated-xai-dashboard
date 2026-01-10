import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("flex flex-col gap-6 py-10 lg:flex-row lg:justify-between", className)}>
      {children}
    </div>
  );
}
