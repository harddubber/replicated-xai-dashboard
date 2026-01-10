import React from "react";
import { cn } from "@/lib/utils";
import { TooltipPortal } from "@/ui/components/TooltipPortal";

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** The distance from the trigger. */
  sideOffset?: number;
  /**
   * Used to force mounting when more control is needed. In this case,
   * it is helpful for animations.
   */
  forceMount?: boolean;
  /**
   * Specify a container element to portal the content into.
   */
  container?: HTMLElement;
}

/**
 * TooltipContent is the component that pops out when the tooltip is open.
 * It is styled to be a small, dark label by default and includes
 * entry/exit animations.
 */
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>(({ className, sideOffset = 4, container, ...props }, ref) => {
  return (
    <TooltipPortal container={container}>
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          "bg-primary text-primary-foreground z-[500] max-w-sm overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={{
          // Note: sideOffset is usually passed to a primitive that handles positioning.
          // In Radix-like systems, this prop is consumed by the 'Content' primitive.
          // Since we are wrapping primitives (likely Tooltip.Content as 'I'), 
          // we pass it through.
          ...props.style,
        }}
        {...props}
      />
    </TooltipPortal>
  );
});

TooltipContent.displayName = "TooltipContent";
