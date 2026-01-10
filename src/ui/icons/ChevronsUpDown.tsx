import React, { forwardRef } from "react";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";
import { cn } from "@/lib/utils";

export interface ChevronsUpDownProps extends Omit<LucideIconProps, "iconNode"> {}

/**
 * ChevronsUpDown icon component.
 * Renders a Lucide icon with two chevrons stacked vertically, one pointing up and one pointing down.
 */
export const ChevronsUpDown = forwardRef<SVGSVGElement, ChevronsUpDownProps>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "m7 15 5 5 5-5", key: "svg-0" }],
      ["path", { d: "m7 9 5-5 5 5", key: "svg-1" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-chevrons-up-down", className)}
        {...props}
      />
    );
  }
);

ChevronsUpDown.displayName = "ChevronsUpDown";
