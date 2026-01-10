import React from "react";
import { cn } from "@/lib/utils";
import { AppsGridIcon } from "@/ui/icons/AppsGridIcon";

export interface TokensGridFillIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

/**
 * A component that renders a grid icon wrapper around the AppsGridIcon.
 * It supports various sizes and custom colors.
 */
export function TokensGridFillIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: TokensGridFillIconProps) {
  const isHidden = !ariaLabel;

  const sizeStyle = typeof size === "number" ? { height: size, width: size } : undefined;

  const isXSmall = size === "x-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";
  const isFill = size === "fill";

  const wrapperClasses = cn(
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

  const iconClasses = cn({
    "w-4 h-4": isXSmall,
    "w-5 h-5": isSmall,
    "w-6 h-6": isMedium,
    "w-8 h-8": isLarge,
    "w-full h-full": isFill,
  });

  const wrapperStyle = {
    color: color,
    ...sizeStyle,
  };

  const iconStyle = {
    fill: "currentColor",
    ...sizeStyle,
  };

  return (
    <span
      className={wrapperClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={wrapperStyle}
    >
      <AppsGridIcon
        aria-hidden={isHidden}
        aria-label={ariaLabel}
        className={iconClasses}
        focusable="false"
        style={iconStyle}
      />
    </span>
  );
}
