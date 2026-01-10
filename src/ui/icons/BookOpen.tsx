import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * An open book showing two facing pages with a centered spine detail at the bottom.
 */
export interface BookOpenProps extends Omit<LucideIconProps, "iconNode"> {}

export const BookOpen = React.forwardRef<SVGSVGElement, BookOpenProps>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      [
        "path",
        {
          d: "M12 7v14",
          key: "path-0",
        },
      ],
      [
        "path",
        {
          d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
          key: "path-1",
        },
      ],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-book-open", className)}
        {...props}
      />
    );
  }
);

BookOpen.displayName = "BookOpen";
