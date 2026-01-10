import React from "react";
import { PageHeader, PageHeaderProps } from "@/ui/components/PageHeader";

export interface PageHeaderWrapperProps extends PageHeaderProps {}

/**
 * A wrapper component for PageHeader that applies specific responsive width constraints.
 * It constrains the width on large screens (lg) and extra-large screens (xl).
 */
export const PageHeaderWrapper: React.FC<PageHeaderWrapperProps> = (props) => {
  return (
    <div className="w-full lg:max-w-44 xl:max-w-64">
      <PageHeader {...props} />
    </div>
  );
};
