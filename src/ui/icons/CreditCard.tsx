import React, { forwardRef } from "react";
import { LucideIcon, type LucideIconProps } from "@/ui/primitives/LucideIcon";
import { cn } from "@/lib/utils";

export interface CreditCardProps extends Omit<LucideIconProps, "iconNode"> {}

const iconNode: [string, Record<string, any>][] = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "svg-0" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "svg-1" }],
];

/**
 * CreditCard icon component.
 * 
 * @param className - Additional CSS classes to apply to the SVG element.
 * @param props - Additional SVG attributes and LucideIcon properties.
 * @returns A React component rendering the CreditCard icon.
 */
export const CreditCard = forwardRef<SVGSVGElement, CreditCardProps>(
  ({ className, ...props }, ref) => {
    return (
      <LucideIcon
        ref={ref}
        iconNode={iconNode}
        className={cn("lucide-credit-card", className)}
        {...props}
      />
    );
  }
);

CreditCard.displayName = "CreditCard";
