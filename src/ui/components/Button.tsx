import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@/ui/primitives/Slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "accent"
    | "secondary"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
  asChild?: boolean;
  loading?: boolean;
  disabledTooltip?: React.ReactNode;
  testId?: string;
}

const buttonVariants = ({
  variant,
  size,
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) => {
  const baseStyles =
    "focus-visible:ring-ring inline-flex items-center justify-center gap-x-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4";

  const variants: Record<string, string> = {
    default:
      "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md",
    accent:
      "bg-foreground border-foreground text-background hover:bg-foreground/90 border shadow rounded-full",
    outline:
      "border-input text-primary hover:border-primary/15 border hover:bg-overlay-hover",
    secondary:
      "text-primary border-input hover:border-primary/15 border bg-surface-l2 shadow-sm hover:bg-surface-l3",
    ghost: "text-primary hover:bg-overlay-hover",
    destructive:
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes: Record<string, string> = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-7 px-3 text-xs",
    lg: "h-10 px-8 text-base",
    icon: "h-9 w-9 text-sm",
    xs: "h-6 px-2 text-xs",
  };

  return cn(baseStyles, variants[variant || "default"], sizes[size || "default"], className);
};

// Mock Spinner for the loading state
const Spinner = ({
  size,
  color,
  className,
}: {
  size?: string;
  color?: string;
  className?: string;
  testId?: string;
}) => (
  <div className={cn("animate-spin", className)} data-testid="spinner">
    [[SVG:0|PATH:0|NAME:spinner|DESCRIPTION:A simple loading spinner]]
  </div>
);

// Mock Tooltip components as they are used in the minified code
const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => <>{children}</>;
const TooltipContent = ({ children }: { children: React.ReactNode }) => (
  <div className="tooltip-content">{children}</div>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      loading,
      disabledTooltip,
      testId,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = loading ? (
      <div className="relative">
        <div className="absolute flex h-full w-full items-center justify-center">
          <Spinner
            size="xs"
            testId="spinner"
            color={variant === "accent" ? "light" : "default"}
            className={cn(variant === "accent" ? "text-background" : "text-primary")}
          />
        </div>
        <div className="opacity-0">{props.children}</div>
      </div>
    ) : (
      props.children
    );

    const buttonElement = (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        data-testid={testId}
        type={type}
        {...props}
      >
        {content}
      </Comp>
    );

    if (props.disabled && disabledTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{buttonElement}</span>
          </TooltipTrigger>
          <TooltipContent>{disabledTooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";
