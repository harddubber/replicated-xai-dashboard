import React from "react";
import { cn } from "@/lib/utils";

// Mocking the dependencies suggested by minified code
// u.StackedSkeleton
const StackedSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// a.Text
const Text = ({
  variant,
  color,
  children,
}: {
  variant?: string;
  color?: string;
  children: React.ReactNode;
}) => (
  <div className={cn(variant === "body5" && "text-xs", color === "subtle" && "text-gray-500")}>
    {children}
  </div>
);

// m.default / useTranslation-like hook
const useTranslation = (ns: string | string[], key: string) => {
  return {
    t: (k: string) => (k === "error" ? "An error occurred" : k),
  };
};

export interface ContentWrapperProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  error?: boolean | string | React.ReactNode;
}

/**
 * A wrapper component that handles loading and error states for its children.
 * If loading, it shows a skeleton loader.
 * If there's an error, it shows an error message.
 * Otherwise, it renders the children.
 */
export function ContentWrapper({
  children,
  isLoading,
  error,
}: ContentWrapperProps) {
  const { t } = useTranslation(["base"], "content");

  if (isLoading) {
    return <StackedSkeleton />;
  }

  if (error) {
    const errorMessage = typeof error === "boolean" ? t("error") : error;
    return (
      <Text variant="body5" color="subtle">
        {errorMessage}
      </Text>
    );
  }

  return <>{children}</>;
}
