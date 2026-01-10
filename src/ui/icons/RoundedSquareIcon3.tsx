import React from "react";
import { cn } from "@/lib/utils";

export interface RoundedSquareIconProps extends React.SVGProps<SVGSVGElement> {}

export function RoundedSquareIcon({
  className,
  ...props
}: RoundedSquareIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      <path d="M3.005 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m17 8h-16v8h16zm0-2V5h-16v4zm-6 6h4v2h-4z" />
    </svg>
  );
}
