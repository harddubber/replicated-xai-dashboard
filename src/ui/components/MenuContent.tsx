import React from "react";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { MenuPortal } from "@/ui/components/MenuPortal";

export interface MenuContentProps
  extends React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content> {
  sideOffset?: number;
}

/**
 * MenuContent component provides the container for the menu items.
 * It is styled with tailwind classes and wrapped in a MenuPortal for proper layering.
 */
export const MenuContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  MenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <MenuPortal>
      <MenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-xl border bg-surface-l4 p-1 shadow-lg shadow-zinc-800/10",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenuPortal>
  );
});

MenuContent.displayName = "MenuContent";
