import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideIconProps } from "@/ui/primitives/LucideIcon";

/**
 * Users icon component.
 * Renders a Lucide icon representing a group of users.
 */
export const Users = React.forwardRef<SVGSVGElement, Omit<LucideIconProps, "iconNode">>(
  ({ className, ...props }, ref) => {
    const iconNode: [string, Record<string, any>][] = [
      ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "svg-14-0" }],
      ["circle", { cx: "9", cy: "7", r: "4", key: "svg-14-1" }],
      ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "svg-14-2" }],
      ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "svg-14-3" }],
    ];

    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-users", className)}
        {...props}
      />
    );
  }
);

Users.displayName = "Users";
