import React from "react";
import { cn } from "@/lib/utils";
import { SquareIcon } from "@/ui/icons/SquareIcon";

export interface CubeIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

/**
 * CubeIcon component that wraps a SquareIcon with specific sizing and styling.
 * Despite the name "CubeIcon" in the tests, it uses the SquareIcon internally based on the provided path description.
 */
export function CubeIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: CubeIconProps) {
  const isHidden = !ariaLabel;

  const sizeStyles = typeof size === "number" ? { height: size, width: size } : undefined;

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
    color,
    ...sizeStyles,
  };

  const iconStyle = {
    fill: "currentcolor",
    ...sizeStyles,
  };

  return (
    <span
      className={wrapperClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={wrapperStyle}
    >
      <SquareIcon
        aria-hidden={isHidden}
        aria-label={ariaLabel}
        className={iconClasses}
        focusable="false"
        style={iconStyle}
      />
    </span>
  );
}
