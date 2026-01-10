import React from "react";
import { cn } from "@/lib/utils";

export interface MoonIconProps extends React.SVGProps<SVGSVGElement> {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export function MoonIcon({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
  ...props
}: MoonIconProps) {
  const isHidden = !ariaLabel;

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

  const svgClasses = cn({
    "w-4 h-4": isXSmall,
    "w-5 h-5": isSmall,
    "w-6 h-6": isMedium,
    "w-8 h-8": isLarge,
    "w-full h-full": isFill,
  });

  const svgStyles = {
    fill: "currentColor",
    ...sizeStyles,
  };

  return (
    <span
      className={containerClasses}
      data-namespace="@xai/icons"
      data-slot="icon"
      style={containerStyles}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden={isHidden}
        aria-label={ariaLabel}
        className={svgClasses}
        focusable="false"
        style={svgStyles}
        {...props}
      >
        <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 8 8 0 0 0 4 12" />
      </svg>
    </span>
  );
}
