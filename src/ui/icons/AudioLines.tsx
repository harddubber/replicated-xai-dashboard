import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * AudioLines icon component.
 * Renders an SVG icon representing audio levels or an equalizer.
 */
export const AudioLines = React.forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "M2 10v3", key: "svg-0" }],
      ["path", { d: "M6 6v11", key: "svg-1" }],
      ["path", { d: "M10 3v18", key: "svg-2" }],
      ["path", { d: "M14 8v7", key: "svg-3" }],
      ["path", { d: "M18 5v13", key: "svg-4" }],
      ["path", { d: "M22 10v3", key: "svg-5" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-audio-lines", className)}
        {...props}
      />
    );
  }
);

AudioLines.displayName = "AudioLines";

export type { LucideIconProps as AudioLinesProps };
