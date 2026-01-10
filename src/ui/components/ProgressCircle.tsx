import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/ui/primitives/Typography";

export interface ProgressCircleProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  progress?: number;
  size?: number;
  strokeWidth?: number;
  activeClassName?: string;
  backgroundClassName?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function ProgressCircle({
  title,
  description,
  progress = 0,
  size = 64,
  strokeWidth = 6,
  activeClassName = "text-primary",
  backgroundClassName = "text-surface",
  actions,
  className,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * radius * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const viewBox = `0 0 ${size} ${size}`;
  const svgStyle = { width: size, height: size };

  const backgroundCircle = (
    <circle
      className={cn("", backgroundClassName)}
      strokeWidth={strokeWidth}
      strokeDasharray={progress === 0 ? 2 : undefined}
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx={size / 2}
      cy={size / 2}
    />
  );

  const progressCircle = progress !== 0 && (
    <circle
      className={cn(activeClassName, "transition-all duration-300 ease-in-out")}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="round"
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx={size / 2}
      cy={size / 2}
      style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
    />
  );

  return (
    <div className={cn("group/progress flex flex-col gap-4", className)}>
      <div className="relative flex shrink-0 items-center gap-2">
        <svg
          className="h-full w-full flex-shrink-0"
          viewBox={viewBox}
          style={svgStyle}
        >
          {backgroundCircle}
          {progressCircle}
        </svg>
        {actions}
      </div>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && (
            <Typography variant="body5" className="font-medium">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body5" color="subtle">
              {description}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
