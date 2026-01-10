import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";

export interface HouseIconProps extends Omit<LucideIconProps, "iconNode"> {}

const iconNode: [string, Record<string, any>][] = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "svg-0" }],
  ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "svg-1" }],
];

export const House = React.forwardRef<SVGSVGElement, HouseIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-house", className)}
        {...props}
      />
    );
  }
);

House.displayName = "House";
