import React, { forwardRef } from "react";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";
import { cn } from "@/lib/utils";

export interface KeyRoundProps extends Omit<LucideIconProps, "iconNode"> {}

/**
 * KeyRound icon component.
 * Renders an outline-style key with a circular head and a toothed shaft.
 */
export const KeyRound = forwardRef<SVGSVGElement, KeyRoundProps>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      [
        "path",
        {
          d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
          key: "key-path",
        },
      ],
      [
        "circle",
        {
          cx: "16.5",
          cy: "7.5",
          r: ".5",
          fill: "currentColor",
          key: "key-circle",
        },
      ],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-key-round", className)}
        {...props}
      />
    );
  }
);

KeyRound.displayName = "KeyRound";
