import React from "react";

export type FormattedAmountVariant =
  | "usd"
  | "usd_ticks"
  | "cent"
  | "cent_ticks"
  | "float"
  | "decimal";

export interface FormattedAmountProps {
  value: number | string;
  variant?: FormattedAmountVariant;
  showSubCents?: boolean;
  negate?: boolean;
}

/**
 * A component that formats numerical values into currency or decimal strings.
 * It handles various scaling factors (ticks, cents, USD) and provides
 * special formatting for "sub-cents" (fractions of a cent).
 */
export const FormattedAmount: React.FC<FormattedAmountProps> = ({
  value,
  variant,
  showSubCents = true,
  negate = false,
}) => {
  let numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Add a small epsilon to handle potential floating point precision issues
  // seen in the minified code: r += 0.001
  numericValue += 0.001;

  // Handle scaling based on variant
  if (variant === "cent_ticks") {
    numericValue /= 1e10;
  } else if (variant === "usd_ticks") {
    numericValue /= 1e8;
  } else if (variant === "cent") {
    numericValue /= 100;
  }

  // Handle negation
  if (negate) {
    numericValue *= -1;
  }

  // Currency formatting variants
  if (
    variant === "usd" ||
    variant === "usd_ticks" ||
    variant === "cent" ||
    variant === "cent_ticks"
  ) {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    }).format(numericValue);

    const dotIndex = formatted.indexOf(".");
    let head = formatted.substring(0, dotIndex);
    const tail = formatted.substring(dotIndex + 1);

    // Special case for negative zero display
    if (head === "-$0" && tail === "0000") {
      head = "$0";
    }

    if (tail.length > 2) {
      const cents = tail.substring(0, 2);
      const subCents = tail.substring(2);

      return (
        <span>
          {head}
          {"."}
          {cents}
          {showSubCents && (
            <span className="opacity-45">{subCents}</span>
          )}
        </span>
      );
    }

    return <span>{formatted}</span>;
  }

  // Float variant: 1 decimal place maximum
  if (variant === "float") {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(numericValue);

    return <span>{formatted}</span>;
  }

  // Default / Decimal variant: 0 decimal places
  const formatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(numericValue);

  return <span>{formatted}</span>;
};
