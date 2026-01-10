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
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </svg>
  );
}
