import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LucideIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
  iconNode: [string, Record<string, any>][];
}

export const LucideIcon = forwardRef<SVGSVGElement, LucideIconProps>(
  (
    {
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...props
    },
    ref,
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={
          absoluteStrokeWidth ? (24 * Number(strokeWidth)) / Number(size) : strokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide", className)}
        {...props}
      >
        {iconNode.map(([tag, attrs], index) =>
          React.createElement(tag, { ...attrs, key: attrs.key || index }),
        )}
        {children}
      </svg>
    );
  },
);

LucideIcon.displayName = "LucideIcon";
