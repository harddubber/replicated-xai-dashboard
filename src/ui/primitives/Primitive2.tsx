import React from "react";
import { cn } from "@/lib/utils";

export interface PrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, forwardedRef) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref: forwardedRef
          ? (node: HTMLElement) => {
              if (typeof forwardedRef === "function") {
                forwardedRef(node);
              } else {
                forwardedRef.current = node;
              }
            }
          : undefined,
      } as any);
    }
    return null;
  }
);
Slot.displayName = "Slot";

export const Primitive = React.forwardRef<HTMLElement, PrimitiveProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";

    if (typeof window !== "undefined") {
      (window as any)[Symbol.for("radix-ui")] = true;
    }

    return (
      <Component
        {...(className ? { className } : {})}
        {...props}
        ref={forwardedRef as any}
      />
    );
  }
);

Primitive.displayName = "Primitive";
