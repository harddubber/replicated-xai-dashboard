import React from "react";

/**
 * TemplateContext provides the content to be rendered by the DashboardTemplate.
 * Based on minified code: (0, o.useContext)(l.TemplateContext)
 */
export const TemplateContext = React.createContext<React.ReactNode>(null);

export interface DashboardTemplateProps {}

/**
 * DashboardTemplate is a component that renders content from the TemplateContext.
 * It is used to inject layout or page-specific content into a wrapper.
 */
export function DashboardTemplate({}: DashboardTemplateProps) {
  const content = React.useContext(TemplateContext);
  return <>{content}</>;
}

export { DashboardTemplate as ComponentToRewrite };
