import { cn } from "@/lib/utils";
import React from "react";

// Mocking external hooks/components based on the minified code patterns
// In a real environment, these would be imported from their respective modules.
// Since they aren't in the provided dependencies, I'll define the interfaces for them.

interface TooltipProps {
  children: React.ReactNode;
  delayDuration?: number;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "primary" | "accent";
  className?: string;
}

// These are placeholders for the actual components/hooks which are external
// In the final environment, these should be resolved or stubbed if not provided.
function usePathname() {
  return "";
}
declare const useDevModeStandalone: () => {
  isDevMode: boolean;
  toggleDevMode: (val: boolean) => void;
};
declare const useUser: () => any; // Assuming G.default is a hook like useUser or useAuth
declare const CodeIcon: React.ComponentType<{ className?: string }>;
declare const Tooltip: React.FC<TooltipProps>;
declare const TooltipTrigger: React.FC<TooltipTriggerProps>;
declare const TooltipContent: React.FC<TooltipContentProps>;
declare const Switch: React.FC<SwitchProps>;

export interface DevModeToggleProps {}

/**
 * A toggle component for enabling/disabling Developer Mode,
 * typically used in a navigation bar or settings area.
 */
export const DevModeToggle: React.FC<DevModeToggleProps> = () => {
  const pathname = usePathname();
  const { isDevMode, toggleDevMode } = useDevModeStandalone();
  const user = useUser();

  // The component only renders on specific paths and if the user is logged in
  if (!pathname.includes("/support-agents-v2") || !user) {
    return null;
  }

  const containerClasses = cn(
    "flex h-full items-center gap-2 border-l px-3",
    "transition-colors duration-200",
    isDevMode && "bg-amber-500/10"
  );

  const iconClasses = cn(
    "size-4",
    isDevMode ? "text-amber-500" : "text-subtle"
  );

  const labelClasses = cn(
    "hidden text-xs font-medium sm:block",
    isDevMode ? "text-amber-500" : "text-subtle"
  );

  const switchVariant = isDevMode ? "accent" : "primary";

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div className={containerClasses}>
          <CodeIcon className={iconClasses} />
          <span className={labelClasses}>Dev</span>
          <Switch
            checked={isDevMode}
            onCheckedChange={toggleDevMode}
            variant={switchVariant}
            className="scale-75"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={4}>
        <div className="text-center">
          <p className="text-xs font-medium">Developer Mode</p>
          <p className="text-xs opacity-70">Enable experimental features</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
