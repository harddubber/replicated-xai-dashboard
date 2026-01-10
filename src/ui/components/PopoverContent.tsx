import React from "react";
import { cn } from "@/lib/utils";
import { PopoverPortal } from "@/ui/components/PopoverPortal";

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null | Array<Element | null>;
  collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  forceMount?: boolean;
}

/**
 * PopoverContent is the component that pops out when the popover is open.
 * It is typically wrapped in a PopoverPortal to render at the end of the body.
 */
export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    return (
      <PopoverPortal>
        <div
          ref={ref}
          align={align}
          // @ts-ignore - these attributes are often handled by underlying Radix primitives
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-72 rounded-md border bg-surface-l4 p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        />
      </PopoverPortal>
    );
  }
);

PopoverContent.displayName = "PopoverContent";
