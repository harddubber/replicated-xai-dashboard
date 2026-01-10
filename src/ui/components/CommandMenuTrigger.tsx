import React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/ui/components/Button";
import { SearchIcon } from "@/ui/icons/SearchIcon";
import { Typography } from "@/ui/primitives/Typography";
import { Shortcut } from "@/ui/components/Shortcut";

// Mocking useCommandMenu based on the minified code usage
// It seems to return an 'open' function (which is used as onClick)
const useCommandMenu = () => {
  return {
    open: () => {},
  };
};

export interface CommandMenuTriggerProps {
  label?: string;
  size?: ButtonProps["size"];
  color?: "regular" | "subtle" | "muted" | "error" | "success" | "warning" | "info" | "inherit";
  className?: string;
  variant?: "default" | "small";
}

export function CommandMenuTrigger({
  label = "Open Command Menu",
  size,
  color,
  className,
  variant = "default",
}: CommandMenuTriggerProps) {
  const { open } = useCommandMenu();

  const buttonClasses = cn(
    "shadow-none w-auto max-w-full px-3",
    className
  );

  const containerClasses = cn(
    "flex items-center justify-between sm:w-full",
    variant === "small" ? "gap-4 transition-all duration-150 hover:gap-8" : "gap-4"
  );

  return (
    <Button
      variant="outline"
      className={buttonClasses}
      size={size}
      onClick={open}
    >
      <div className={containerClasses}>
        <div className="flex items-center justify-start gap-2">
          <SearchIcon size="x-small" className="text-muted" />
          {variant === "default" && (
            <Typography
              variant="body5"
              color={color}
              className="hidden sm:block"
            >
              {label}
            </Typography>
          )}
        </div>
        <span className="hidden sm:block">
          <Shortcut modifierKeys={["ctrl"]} primaryKey="K" />
        </span>
      </div>
    </Button>
  );
}
