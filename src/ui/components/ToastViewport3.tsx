import React from "react";
import { cn } from "@/lib/utils";
import { ToastViewport as RadixToastViewport } from "@/ui/primitives/ToastViewport1";

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof RadixToastViewport> {}

/**
 * ToastViewport is a wrapper around the Radix UI Toast.Viewport component.
 * It provides default styling for the toast container, positioning it on the screen.
 */
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToastViewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => {
  return (
    <RadixToastViewport
      ref={ref}
      className={cn(
        "pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 max-sm:left-0 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px] sm:flex-col",
        className
      )}
      {...props}
    />
  );
});

ToastViewport.displayName = "ToastViewport";
