import React from "react";
import { Primitive } from "@/ui/primitives/Primitive2";

const ORIENTATIONS = ["horizontal", "vertical"] as const;
type Orientation = (typeof ORIENTATIONS)[number];

const DEFAULT_ORIENTATION: Orientation = "horizontal";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Whether the component is purely decorative.
   * When true, accessibility role "none" is used and it is hidden from assistive technology.
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
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (props, ref) => {
    const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...separatorProps } = props;
    const orientation = ORIENTATIONS.includes(orientationProp)
      ? orientationProp
      : DEFAULT_ORIENTATION;

    return (
      <Primitive.div
        data-orientation={orientation}
        {...(decorative
          ? { role: "none" }
          : {
              "aria-orientation":
                orientation === "vertical" ? orientation : undefined,
              role: "separator",
            })}
        {...separatorProps}
        ref={ref}
      />
    );
  }
);

Separator.displayName = "Separator";

export const ComponentToRewrite = Separator;
