import React from "react";
import { cn } from "@/lib/utils";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6";
export type TypographyColor = "regular" | "subtle" | "muted" | "error" | "success" | "warning" | "info" | "inherit";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  asChild?: boolean;
  size?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  semibold?: boolean;
  testId?: string;
}

const variantMapping: Record<string, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
  heading6: "h6",
  body1: "p",
  body2: "p",
  body3: "p",
  body4: "p",
  body5: "p",
  body6: "p",
};

const variantClasses: Record<string, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-bold",
  h4: "text-xl font-bold",
  h5: "text-lg font-bold",
  h6: "text-base font-bold",
  heading1: "text-4xl font-bold",
  heading2: "text-3xl font-bold",
  heading3: "text-2xl font-bold",
  heading4: "text-base font-medium",
  heading5: "text-lg font-bold",
  heading6: "text-base font-bold",
  body1: "text-xl",
  body2: "text-lg",
  body3: "text-base",
  body4: "text-base",
  body5: "text-sm",
  body6: "text-xs",
};

const sizeClasses: Record<string, string> = {
  xsmall: "text-sm",
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  xlarge: "text-xl",
};

const colorClasses: Record<TypographyColor, string> = {
  regular: "text-regular",
  subtle: "text-muted", // Based on Test N205 and N341
  muted: "text-muted",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  inherit: "",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = "body1",
      color = "regular",
      asChild = false,
      size,
      bold = false,
      italic = false,
      underline = false,
      semibold = false,
      testId,
      ...props
    },
    ref
  ) => {
    // Note: 'asChild' usually implies using a Slot component from Radix or similar.
    // Since we don't have dependencies for Radix Slot, we'll fall back to variant tag.
    const Component = (variant ? variantMapping[variant] : "span") || "span";

    const classes = cn(
      variantClasses[variant],
      color !== "inherit" && colorClasses[color],
      bold && "font-bold",
      semibold && "font-semibold",
      italic && "italic",
      underline && "underline",
      size && (sizeClasses[size] || size),
      className
    );

    return (
      <Component
        className={classes}
        ref={ref as any}
        data-testid={testId}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
