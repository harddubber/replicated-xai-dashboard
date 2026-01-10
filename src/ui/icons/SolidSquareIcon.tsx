import React from "react";
import { cn } from "@/lib/utils";

export interface SolidSquareIconProps extends React.SVGProps<SVGSVGElement> {}

/**
 * A simple filled square icon.
 */
export function SolidSquareIcon({
  className,
  ...props
}: SolidSquareIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      <path d="M12.917 13A6.002 6.002 0 0 1 1 12a6 6 0 0 1 11.917-1H23v2h-2v4h-2v-4h-2v4h-2v-4zM7 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
    </svg>
  );
}
