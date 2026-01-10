import React, { forwardRef } from "react";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";
import { cn } from "@/lib/utils";

/**
 * Box icon component.
 * Renders an isometric 3D cube outline with rounded corners showing the top and two side faces.
 */
export const Box = forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      [
        "path",
        {
          d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
          key: "path-1",
        },
      ],
      [
        "path",
        {
          d: "m3.3 7 8.7 5 8.7-5",
          key: "path-2",
        },
      ],
      [
        "path",
        {
          d: "M12 22V12",
          key: "path-3",
        },
      ],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-box", className)}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";
