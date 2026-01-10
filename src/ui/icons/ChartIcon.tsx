import React from "react";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon } from "@/ui/icons/ShoppingBagIcon";

export interface ChartIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export function ChartIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: ChartIconProps) {
  const isAriaHidden = !ariaLabel;

  const sizeStyles =
    typeof size === "number" ? { height: size, width: size } : undefined;

  const isXSmall = size === "x-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";
  const isFill = size === "fill";

  const containerClassName = cn(
    "inline-flex items-center justify-center p-0 m-0",
    {
      "w-4 h-4": isXSmall,
      "w-5 h-5": isSmall,
      "w-6 h-6": isMedium,
      "w-8 h-8": isLarge,
      "w-full h-full": isFill,
    },
    className
  );

  const containerStyle = {
    color,
    ...sizeStyles,
  };

  const iconClassName = cn({
    "w-4 h-4": isXSmall,
    "w-5 h-5": isSmall,
    "w-6 h-6": isMedium,
    "w-8 h-8": isLarge,
    "w-full h-full": isFill,
  });

  const iconStyle = {
    fill: "currentcolor",
    ...sizeStyles,
  };

  return (
    <span
      className={containerClassName}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={containerStyle}
    >
      <ShoppingBagIcon
        aria-hidden={isAriaHidden}
        aria-label={ariaLabel}
        className={iconClassName}
        focusable="false"
        style={iconStyle}
      />
    </span>
  );
}
