import React from "react";
import { ConsoleAppShell } from "@/pages/ConsoleAppShell";

export interface ConsoleAppRootProps {
  initialRSCPayload: {
    G?: [React.ComponentType<{ error: any }>, any];
    [key: string]: any;
  };
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
  webSocket?: any;
  staticIndicatorState?: any;
}

/**
 * ConsoleAppRoot is the root component for the console application.
 * It initializes the ConsoleAppShell with necessary state and metadata.
 */
export function ConsoleAppRoot({
  initialRSCPayload,
  actionQueue,
  webSocket,
  staticIndicatorState,
}: ConsoleAppRootProps) {
  return (
    <ConsoleAppShell
      actionQueue={actionQueue}
      globalErrorState={initialRSCPayload.G}
      webSocket={webSocket}
      staticIndicatorState={staticIndicatorState}
    />
  );
}
