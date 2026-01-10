import React from "react";
import { cn } from "@/lib/utils";
import { Typography as Text } from "@/ui/primitives/Typography";

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * A layout component typically used at the top of a section or page.
 * It displays a title, an optional description, and optional action elements (children).
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}) => {
  const headerContent = (
    <div className="space-y-3">
      <Text variant="heading4">{title}</Text>
      {description && (
        <>
          {typeof description === "string" ? (
            <Text
              variant="body5"
              color="subtle"
              className="max-w-sm"
            >
              {description}
            </Text>
          ) : (
            <div className="text-body5 text-subtle max-w-sm">
              {description}
            </div>
          )}
        </>
      )}
    </div>
  );

  const actionsContent = children && (
    <div className="space-y-3">
      {children}
    </div>
  );

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row lg:flex-col lg:justify-start">
      {headerContent}
      {actionsContent}
    </div>
  );
};
