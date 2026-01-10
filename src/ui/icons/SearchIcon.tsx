import React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@/ui/icons/MagnifyingGlassIcon";

export interface SearchIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export function SearchIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}: SearchIconProps) {
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

  const containerStyle = {
    color: color,
    ...sizeStyles,
  };

  const svgClasses = cn({
    "w-4 h-4": size === "x-small",
    "w-5 h-5": size === "small",
    "w-6 h-6": size === "medium",
    "w-8 h-8": size === "large",
    "w-full h-full": size === "fill",
  });

  const svgStyle = {
    fill: "currentColor",
    ...sizeStyles,
  };

  return (
    <span
      className={containerClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={containerStyle}
    >
      <MagnifyingGlassIcon
        aria-hidden={isAriaHidden}
        aria-label={ariaLabel}
        className={svgClasses}
        focusable="false"
        style={svgStyle}
      />
    </span>
  );
}
