import React from "react";
import { cn } from "@/lib/utils";
import { AvatarFallback as RadixAvatarFallback } from "@/ui/primitives/AvatarFallback1";

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatarFallback> {}

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatarFallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => {
  return (
    <RadixAvatarFallback
      ref={ref}
      className={cn(
        "bg-primary/10 text-primary flex h-full w-full items-center justify-center",
        className
      )}
      {...props}
    />
  );
});

AvatarFallback.displayName = "AvatarFallback";
