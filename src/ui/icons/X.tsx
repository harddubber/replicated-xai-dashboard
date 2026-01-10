import React, { forwardRef } from "react";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";
import { cn } from "@/lib/utils";

/**
 * The X icon component (also known as "Close").
 * Renders a standard cross mark using the Lucide icon set.
 */
export const X = forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "M18 6 6 18", key: "svg-0" }],
      ["path", { d: "m6 6 12 12", key: "svg-1" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-x", className)}
        {...props}
      />
    );
  }
);

X.displayName = "X";
