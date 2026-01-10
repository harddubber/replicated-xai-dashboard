import React from "react";
import { cn } from "@/lib/utils";

// Mocking Radix UI Slot since it's not in dependencies but referenced in minified code
// In a real scenario, this would be imported from @radix-ui/react-slot
const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref: (node: any) => {
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
          const { ref: childRef } = children as any;
          if (typeof childRef === "function") childRef(node);
          else if (childRef) childRef.current = node;
        },
      } as any);
    }
    return null;
  }
);

export interface ToastViewportProps extends React.HTMLAttributes<HTMLOlElement> {
  asChild?: boolean;
}

export const ToastViewport = React.forwardRef<HTMLOlElement, ToastViewportProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "ol";

    // Radix UI marker
    if (typeof window !== "undefined") {
      (window as any)[Symbol.for("radix-ui")] = true;
    }

    return (
      <Comp
        ref={ref as any}
        className={cn(
          "pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 max-sm:left-0 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px] sm:flex-col",
          className
        )}
        {...props}
      />
    );
  }
);
