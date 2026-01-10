import React from "react";
import { Card } from "@/ui/components/Card1";
import { CardContent } from "@/ui/components/CardContent";

// The minified code references s.SplitSection, n.SplitSectionTitle, and a.SplitSectionContents.
// These appear to be internal sub-components or components from a layout library.
// Based on the usage pattern and the context of "SplitSection", I will define them as local sub-components.

interface SplitSectionProps {
  children?: React.ReactNode;
  className?: string;
}

const SplitSection: React.FC<SplitSectionProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

interface SplitSectionTitleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const SplitSectionTitle: React.FC<SplitSectionTitleProps> = ({
  title,
  description,
  children,
}) => (
  <div>
    <div>{title}</div>
    {description && <div>{description}</div>}
    {children}
  </div>
);

interface SplitSectionContentsProps {
  children?: React.ReactNode;
}

const SplitSectionContents: React.FC<SplitSectionContentsProps> = ({
  children,
}) => <div>{children}</div>;

export interface SplitSectionCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * A card component that displays a section split into title and content areas.
 * It uses a SplitSection layout within a Card, featuring a title, description, and actions.
 */
export const SplitSectionCard: React.FC<SplitSectionCardProps> = ({
  title,
  description,
  children,
  actions,
}) => {
  const titleSection = (
    <SplitSectionTitle title={title} description={description}>
      {actions}
    </SplitSectionTitle>
  );

  const contentSection = (
    <SplitSectionContents>{children}</SplitSectionContents>
  );

  return (
    <Card className="flex h-full w-full grow items-center">
      <div className="flex h-full grow items-end">
        <CardContent className="w-full">
          <SplitSection className="py-0">
            {titleSection}
            {contentSection}
          </SplitSection>
        </CardContent>
      </div>
    </Card>
  );
};
