import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "span"; // The minified code shows a Slot-like behavior, but since we don't have Radix UI dependencies, we default to span.

    if (typeof window !== "undefined") {
      (window as any)[Symbol.for("radix-ui")] = true;
    }

    return (
      <Component
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
