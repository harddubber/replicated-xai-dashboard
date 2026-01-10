import React from "react";
import { cn } from "@/lib/utils";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CardHeader({
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}
