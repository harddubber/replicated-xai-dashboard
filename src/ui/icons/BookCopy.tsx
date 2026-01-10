import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * BookCopy icon component.
 * 
 * Renders a Lucide icon representing a book copy action or duplicated books.
 */
export const BookCopy = React.forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "M2 16V4a2 2 0 0 1 2-2h11", key: "svg-1" }],
      ["path", { d: "M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12", key: "svg-2" }],
      ["path", { d: "M5 14H4a2 2 0 1 0 0 4h1", key: "svg-3" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-book-copy", className)}
        {...props}
      />
    );
  }
);

BookCopy.displayName = "BookCopy";
