import React from "react";
import { cn } from "@/lib/utils";
import { Primitive } from "@/ui/primitives/Primitive2";

export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export interface SeparatorProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Whether the component is purely decorative.
   * When true, accessibility role "none" is used and it is hidden from assistive technology.
   * @default true
   */
  decorative?: boolean;
  /**
   * The orientation of the separator.
   * @default "horizontal"
   */
  orientation?: Orientation;
  /**
   * Whether to render as a child.
   */
  asChild?: boolean;
  /**
   * Elevation level for styling.
   */
  elevation?: number;
}

/**
 * A separator component that visually or semantically separates content,
 * with support for horizontal/vertical orientations and accessibility roles.
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      elevation,
      decorative = true,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const semanticProps = decorative
      ? { role: "none" }
      : {
          role: "separator",
          "aria-orientation": orientation === "vertical" ? "vertical" : undefined,
        };

    const Tag = asChild ? Primitive : "div";

    return (
      <Tag
        ref={ref}
        data-orientation={orientation}
        {...semanticProps}
        className={cn(
          "bg-border shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          "bg-foreground/10",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export const ComponentToRewrite = Separator;
