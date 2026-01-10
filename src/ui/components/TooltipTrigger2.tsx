import { Primitive } from "@/ui/primitives/Primitive1";
import React from "react";

export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<
  typeof Primitive.button
> {
  asChild?: boolean;
}

/**
 * A TooltipTrigger component that acts as an anchor for tooltip content.
 * It manages pointer and focus events to toggle the tooltip's visibility state.
 */
export const ComponentToRewrite = React.forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(({ className, ...props }, ref) => {
  return props.children;
  // return (
  //   <Primitive.button
  //     type="button"
  //     ref={ref}
  //     className={cn("flex items-center", className)}
  //     data-state="closed"
  //     {...props}
  //   />
  // );
});

ComponentToRewrite.displayName = "TooltipTrigger";

export { ComponentToRewrite as TooltipTrigger };
