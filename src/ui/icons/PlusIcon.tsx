import React from "react";
import { cn } from "@/lib/utils";
import { RoundedSquareIcon } from "@/ui/icons/RoundedSquareIcon1";

export interface PlusIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export function PlusIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: PlusIconProps) {
  const isAriaHidden = !ariaLabel;

  const sizeStyles = typeof size === "number" ? { height: size, width: size } : undefined;

  const containerClasses = cn(
    "inline-flex items-center justify-center p-0 m-0",
    {
      "w-4 h-4": size === "x-small",
      "w-5 h-5": size === "small",
      "w-6 h-6": size === "medium",
      "w-8 h-8": size === "large",
      "w-full h-full": size === "fill",
    },
    className
  );

  const iconClasses = cn({
    "w-4 h-4": size === "x-small",
    "w-5 h-5": size === "small",
    "w-6 h-6": size === "medium",
    "w-8 h-8": size === "large",
    "w-full h-full": size === "fill",
  });

  const containerStyle = {
    color,
    ...sizeStyles,
  };

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
        aria-hidden={isAriaHidden}
        aria-label={ariaLabel}
        className={iconClasses}
        focusable="false"
        style={iconStyle}
      />
    </span>
  );
}
