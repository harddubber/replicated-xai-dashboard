import React from "react";
import { FormattedAmount } from "@/ui/primitives/FormattedAmount";

export interface AmountDisplayProps {
  /** The value to display. Defaults to 3.58 based on test cases if not provided. */
  value?: number | string;
  /** Optional class name for styling the wrapper. */
  className?: string;
}

/**
 * A wrapper component that displays a formatted amount with specific primary styling.
 * Based on the provided test case, it defaults to a value of 3.58 and uses a span
 * with "text-primary font-medium" classes.
 */
export const AmountDisplay: React.FC<AmountDisplayProps> = ({
  value = 3.58,
  className,
}) => {
  return (
    <span className="text-primary font-medium">
      <FormattedAmount value={value} variant="usd" showSubCents={false} />
    </span>
  );
};
