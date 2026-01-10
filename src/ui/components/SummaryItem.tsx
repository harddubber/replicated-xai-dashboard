import React from "react";
import { cn } from "@/lib/utils";

// Mocking icons based on the minified code references
const InfoCircledIcon = ({ className, size }: { className?: string; size?: string }) => (
  <svg className={cn(className, size === "x-small" ? "size-3" : "size-4")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

// Tooltip components stubs (usually from a UI library like Radix)
const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipContent = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden">{children}</div>
);

export interface SummaryItemProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  tooltipLabel?: string;
  onClick?: () => void;
}

/**
 * A summary item component typically used in sidebars or cards to display a label and a value/children.
 * Supports tooltips for labels and an optional click handler with a chevron icon.
 */
export function SummaryItem({
  label,
  value,
  children,
  className,
  labelClassName,
  valueClassName,
  tooltipLabel,
  onClick,
}: SummaryItemProps) {
  const isClickable = Boolean(onClick);
  
  const labelElement = (
    <div className={cn("text-subtle line-clamp-1 shrink-0 text-sm", labelClassName)}>
      {label}
    </div>
  );

  let labelContainer = labelElement;
  if (tooltipLabel) {
    labelContainer = (
      <div className="flex items-center justify-center gap-1">
        {labelElement}
        <Tooltip>
          <TooltipTrigger>
            <InfoCircledIcon className="text-subtle" size="x-small" />
          </TooltipTrigger>
          <TooltipContent>{tooltipLabel}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  const containerClasses = cn(
    "flex justify-between gap-3 text-sm",
    isClickable && "cursor-pointer hover:opacity-75",
    className
  );

  const valueContainerClasses = cn(
    "flex max-w-md grow items-center justify-end gap-2 text-right",
    valueClassName
  );

  return (
    <div onClick={onClick} className={containerClasses}>
      {labelContainer}
      <div className={valueContainerClasses}>
        {children}
        {value && (
          <div className="line-clamp-1 text-sm">
            {value}
          </div>
        )}
        {isClickable && (
          <div className="flex items-center">
            <ChevronRightIcon className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
}
