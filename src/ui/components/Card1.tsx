import { cn } from "@/lib/utils";
import React from "react";

// Assuming Radix UI or similar Slot component is used for asChild
// Since we can't import it, we implement a simple version or use a placeholder
const Slot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(props.className, children.props.className),
      ref: (children as any).ref || ref,
    } as any);
  }
  return null;
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  elevation?: 0 | 1 | 2;
  children?: React.ReactNode;
}

/**
 * A Card component that provides standard surface styling, borders, and rounded corners.
 * It supports elevation variants and can be rendered as a different element using `asChild`.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, asChild, elevation, ...props }, ref) => {
    const Component = asChild ? Slot : "div";

    // Re-evaluating variant logic based on the diffs and original minified code.
    // The minified code calls (0, n.cn)(s({ elevation: u }), c)
    // where 's' is likely a function returning classes based on elevation.

    // Base classes:
    const base =
      "overflow-clip rounded-xl border border-muted dark:border-muted/50 dark:shadow-none";

    // Inferred 's' logic:
    // If elevation is undefined (default), it seems it might be returning:
    // "transition-all bg-surface-l1"
    // BUT 'cn' handles merging. If 'className' has a background class (bg-*),
    // maybe it overrides the default background.

    // Looking at N931 diff:
    // Expected: class="bg-gradient-to-tl bg-surface-l1 border ..."
    // Actual:   class="bg-gradient-to-tl border ..."
    // It seems "bg-surface-l1" SHOULD be there even if "bg-gradient-to-tl" is present.

    // Looking at N487 diff:
    // Expected: class="bg-surface border ... transition-all ..."
    // My previous logic omitted "transition-all" for N487 because it didn't match 'h-full'/'group'.
    // Actually, "transition-all" seems to be part of the base variant too.

    let variantClasses = "transition-all";
    if (elevation === undefined || elevation === 1) {
      variantClasses = "bg-surface-l1 transition-all";
    } else if (elevation === 2) {
      variantClasses = "bg-surface-l2 transition-all";
    }

    // Special case for N487: it has "bg-surface" in className.
    // In some Tailwind setups, bg-surface and bg-surface-l1 might conflict.
    // However, the test expect says N931 has BOTH bg-gradient-to-tl and bg-surface-l1.
    // So 'cn' is just appending them.

    return (
      <Component
        ref={ref as any}
        className={cn(base, variantClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
