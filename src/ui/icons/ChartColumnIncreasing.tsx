import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * ChartColumnIncreasing icon component.
 * Renders a bar chart icon showing three rounded vertical bars of increasing height.
 */
export const ChartColumnIncreasing = React.forwardRef<
  SVGSVGElement,
  Omit<LucideIconProps, "iconNode">
>(({ className, ...props }, ref) => {
  const iconNode: [string, Record<string, any>][] = [
    [
      "path",
      {
        d: "M13 17V9",
        key: "path-0",
      },
    ],
    [
      "path",
      {
        d: "M18 17V5",
        key: "path-1",
      },
    ],
    [
      "path",
      {
        d: "M3 3v16a2 2 0 0 0 2 2h16",
        key: "path-2",
      },
    ],
    [
      "path",
      {
        d: "M8 17v-3",
        key: "path-3",
      },
    ],
  ];

  return (
    <LucideIcon
      ref={ref}
      iconNode={iconNode}
      className={cn("lucide-chart-column-increasing", className)}
      {...props}
    />
  );
});

ChartColumnIncreasing.displayName = "ChartColumnIncreasing";

export { ChartColumnIncreasing as ComponentToRewrite };
