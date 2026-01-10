import React from "react";
import { cn } from "@/lib/utils";
import { SolidSquareIcon } from "@/ui/icons/SolidSquareIcon";

export interface KeyIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export function KeyIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: KeyIconProps) {
  const isAriaHidden = !ariaLabel;

  const sizeStyles = typeof size === "number" ? { height: size, width: size } : undefined;

  const isXSmall = size === "x-small";
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const isLarge = size === "large";
  const isFill = size === "fill";

  const containerClasses = cn(
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

  const containerStyles = {
    color,
    ...sizeStyles,
  };

  const iconClasses = cn({
    "w-4 h-4": isXSmall,
    "w-5 h-5": isSmall,
    "w-6 h-6": isMedium,
    "w-8 h-8": isLarge,
    "w-full h-full": isFill,
  });

  const iconStyles = {
    fill: "currentcolor",
    ...sizeStyles,
  };

  return (
    <span
      className={containerClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={containerStyles}
    >
      <SolidSquareIcon
        aria-hidden={isAriaHidden}
        aria-label={ariaLabel}
        className={iconClasses}
        focusable="false"
        style={iconStyles}
      />
    </span>
  );
}
