import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * Cog icon component representing a mechanical gear or settings.
 * Renders as an SVG using the LucideIcon base component.
 */
export const Cog = React.forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", key: "svg-0" }],
      ["path", { d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z", key: "svg-1" }],
      ["path", { d: "M12 2v2", key: "svg-2" }],
      ["path", { d: "M12 22v-2", key: "svg-3" }],
      ["path", { d: "m17 20.66-1-1.73", key: "svg-4" }],
      ["path", { d: "M11 10.27 7 3.34", key: "svg-5" }],
      ["path", { d: "m20.66 17-1.73-1", key: "svg-6" }],
      ["path", { d: "m3.34 7 1.73 1", key: "svg-7" }],
      ["path", { d: "M14 12h8", key: "svg-8" }],
      ["path", { d: "M2 12h2", key: "svg-9" }],
      ["path", { d: "m20.66 7-1.73 1", key: "svg-10" }],
      ["path", { d: "m3.34 17 1.73-1", key: "svg-11" }],
      ["path", { d: "m17 3.34-1 1.73", key: "svg-12" }],
      ["path", { d: "m11 13.73-4 6.93", key: "svg-13" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide lucide-cog", className)}
        {...props}
      />
    );
  }
);

Cog.displayName = "Cog";
