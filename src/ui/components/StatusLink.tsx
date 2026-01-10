import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

// Assuming these are standard UI components or from a local library
// Since they aren't in dependencies, I'll mock them/implement them based on usage.
// In a real scenario, these might be imported from "@radix-ui/react-tooltip" or similar.

/**
 * Mocking Tooltip components based on common patterns if they aren't provided.
 * Since the prompt mentions "renderToStaticMarkup", standard Radix-like Tooltips
 * often don't render content unless open, but we'll follow the minified structure.
 */
const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <>{children}</>;
const TooltipContent = ({ children, side }: { children: React.ReactNode; side?: string }) => (
  <div className="tooltip-content" data-side={side}>
    {children}
  </div>
);

/**
 * Status Indicator Component
 */
interface StatusIndicatorProps {
  severity: "outage" | "disruption" | "info";
}

const StatusIndicator = ({ severity }: StatusIndicatorProps) => {
  const colorClass = {
    outage: "bg-red-500",
    disruption: "bg-orange-500",
    info: "bg-blue-500",
  }[severity];

  return (
    <div className={cn("size-2 rounded-full", colorClass)} />
  );
};

/**
 * Icons
 */
const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    [[SVG:0|PATH:0|NAME:arrow-up-right|DESCRIPTION:Arrow pointing up and to the right]]
  </svg>
);

/**
 * Types for the status data
 */
interface StatusItem {
  guid: string;
  title: string;
  link: string;
  categories: string[];
}

interface StatusData {
  outages?: StatusItem[];
  disruptions?: StatusItem[];
}

/**
 * Mocking useQuery and useTranslation hooks based on minified code
 */
const useTranslation = (namespaces: string[], keyPrefix: string) => {
  return {
    t: (key: string) => {
      const keys: Record<string, string> = {
        "systems-disrupted": "Systems Disrupted",
        "system-notice": "System Notice",
        "loading": "Loading...",
        "error": "Failed to load status",
      };
      return keys[key] || key;
    },
  };
};

// This would typically come from a React Query setup
const useStatusQuery = () => {
  // In a real environment, this would be: return useQuery({ queryKey: ['status'], queryFn: fetchStatus });
  return {
    data: null as StatusData | null,
    isError: false,
    isPending: false,
  };
};

export interface StatusLinkProps {
  // Add any props if needed, though the minified version doesn't seem to take any
}

export const StatusLink: React.FC<StatusLinkProps> = () => {
  const { t } = useTranslation(["base"], "components.status-link");
  const { data, isError, isPending } = useStatusQuery();

  const statusInfo = useMemo(() => {
    if (!data) return undefined;

    const hasOutages = data.outages && data.outages.length > 0;
    const hasDisruptions = data.disruptions && data.disruptions.length > 0;

    if (hasOutages) {
      return { label: t("systems-disrupted"), status: "outage" as const };
    }

    if (hasDisruptions) {
      const isActualDisruption = data.disruptions?.some((d) =>
        d.categories.includes("disruption")
      );
      if (isActualDisruption) {
        return { label: t("systems-disrupted"), status: "disruption" as const };
      }
      return { label: t("system-notice"), status: "info" as const };
    }

    return undefined;
  }, [data, t]);

  if (!statusInfo) {
    return null;
  }

  const triggerLink = (
    <a
      href="https://status.x.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted flex w-full items-center justify-between gap-2 border-t bg-surface-inset p-3 font-mono hover:bg-overlay-hover"
    >
      <div className="flex items-center gap-2">
        <StatusIndicator severity={statusInfo.status} />
        <span className="text-xs font-medium uppercase">{statusInfo.label}</span>
      </div>
      <ArrowUpRightIcon className="size-4" />
    </a>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{triggerLink}</TooltipTrigger>
      <TooltipContent side="right">
        <div className="px-1 py-2.5">
          {isPending ? (
            <p className="text-center text-sm">{t("loading")}</p>
          ) : isError ? (
            <p className="text-center text-sm text-red-500">{t("error")}</p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium">{statusInfo.label}:</p>
              {data.disruptions?.map((item) => (
                <a
                  key={item.guid}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-400"
                >
                  <StatusIndicator severity="disruption" />
                  <p className="text-sm">{item.title}</p>
                </a>
              ))}
              {data.outages?.map((item) => (
                <a
                  key={item.guid}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-400"
                >
                  <StatusIndicator severity="outage" />
                  <p className="text-sm">{item.title}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
