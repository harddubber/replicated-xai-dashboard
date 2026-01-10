import React from "react";
import { cn } from "@/lib/utils";
import { RoundedSquareIcon } from "@/ui/icons/RoundedSquareIcon3";

export interface CreditCardIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

/**
 * A CreditCardIcon component that wraps a RoundedSquareIcon.
 * It supports various sizes (predefined or numeric) and handles accessibility labels.
 */
export function CreditCardIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: CreditCardIconProps) {
  const ariaHidden = !ariaLabel;

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

  const containerStyle = {
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

  const iconStyle = {
    fill: "currentcolor",
    ...sizeStyles,
  };

  return (
    <span
      className={containerClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={containerStyle}
    >
      <RoundedSquareIcon
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        className={iconClasses}
        focusable="false"
        style={iconStyle}
      />
    </span>
  );
}
