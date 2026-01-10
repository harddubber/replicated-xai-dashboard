import React from "react";
import { cn } from "@/lib/utils";
import { CircleWithTopTabIcon } from "@/ui/icons/CircleWithTopTabIcon";

export interface GroupIconProps {
  "aria-label"?: string;
  className?: string;
  color?: string;
  size?: "x-small" | "small" | "medium" | "large" | "fill" | number;
}

export const GroupIcon: React.FC<GroupIconProps> = ({
  "aria-label": ariaLabel,
  className,
  color,
  size = "medium",
}) => {
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

  const svgClasses = cn({
    "w-4 h-4": isXSmall,
    "w-5 h-5": isSmall,
    "w-6 h-6": isMedium,
    "w-8 h-8": isLarge,
    "w-full h-full": isFill,
  });

  const svgStyle = {
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
      <CircleWithTopTabIcon
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        className={svgClasses}
        focusable="false"
        style={svgStyle}
      />
    </span>
  );
};
