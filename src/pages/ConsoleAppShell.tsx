import React from "react";
import { Toaster } from "@/ui/components/Toaster1";
import { AppRouterAnnouncer } from "@/ui/components/AppRouterAnnouncer";
import { DashboardTemplate } from "@/ui/components/DashboardTemplate";

export interface ConsoleAppShellProps {
  actionQueue: {
    state: {
      tree: any[];
      cache?: {
        rsc?: React.ReactNode;
      };
      [key: string]: any;
    };
    [key: string]: any;
  };
  globalErrorState?: [React.ComponentType<{ error: any }>, any];
  webSocket?: any;
  staticIndicatorState?: any;
}

/**
 * A fallback error boundary component for the console application.
 */
const ErrorBoundary: React.FC<{
  errorComponent?: React.ComponentType<{ error: any }>;
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

/**
 * ConsoleAppShell is the root layout component for the xAI Console.
 * It manages the navigation failure handler, wraps the application in a Toaster for notifications,
 * and provides an error boundary.
 */
export function ConsoleAppShell({
  actionQueue,
  globalErrorState,
}: ConsoleAppShellProps) {
  const errorComponent = globalErrorState?.[0];
  const rscContent = actionQueue.state.cache?.rsc;

  return (
    <ErrorBoundary errorComponent={errorComponent}>
      <Toaster>
        <div hidden></div>
        {rscContent}
        <AppRouterAnnouncer segmentPath={actionQueue.state.tree[1]?.children || []}>
          <DashboardTemplate />
        </AppRouterAnnouncer>
      </Toaster>
    </ErrorBoundary>
  );
}
