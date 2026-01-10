import { cn } from "@/lib/utils";
import { Button } from "@/ui/components/Button";
import { DropdownMenuTrigger } from "@/ui/components/DropdownMenuTrigger";
import { MenuContent as DropdownMenuContent } from "@/ui/components/MenuContent";
import { MoonIcon } from "@/ui/icons/MoonIcon1";
import { SunIcon } from "@/ui/icons/SunIcon1";

/**
 * We'll use the Radix UI primitives directly for parts not provided in dependencies,
 * or assume they are exported from the same place if we had a combined registry.
 * Based on the minified code, O and T come from a useTheme hook.
 * Since we can't import next-themes, we'll provide a placeholder/stub or
 * assume a similar interface if we were to define it.
 */

// Mocking useTheme since it's not in the provided dependencies
const useTheme = () => {
  return {
    theme: "light",
    setTheme: (theme: string) => {},
  };
};

/**
 * Since we cannot import @radix-ui/react-dropdown-menu directly,
 * we must rely on the fact that the provided components (like DropdownMenuTrigger and MenuContent)
 * handle the underlying logic.
 * We'll define simple wrappers for the items and root based on common patterns.
 */
const DropdownMenu = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const DropdownMenuItem = ({
  children,
  className,
  onClick,
  disabled,
  ...props
}: any) => {
  return (
    <div
      className={cn(className, disabled && "opacity-50 cursor-not-allowed")}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

// CheckIcon placeholder if not provided
const CheckIcon = ({ className }: { className?: string }) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface ThemeToggleProps {
  className?: string;
  triggerClassName?: string;
}

/**
 * ModeToggle component allows users to switch between Light, Dark, and System themes.
 * It uses a DropdownMenu and displays different icons based on the active theme.
 */
export function ModeToggle({ className, triggerClassName }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={triggerClassName}>
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("rounded-2xl", className)}>
        <DropdownMenuItem
          className="justify-between rounded-xl"
          onClick={() => setTheme("light")}
          disabled={theme === "light"}
        >
          Light
          {theme === "light" && <CheckIcon className="size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between rounded-xl"
          onClick={() => setTheme("dark")}
          disabled={theme === "dark"}
        >
          Dark
          {theme === "dark" && <CheckIcon className="size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between rounded-xl"
          onClick={() => setTheme("system")}
          disabled={theme === "system"}
        >
          System
          {theme === "system" && <CheckIcon className="size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
