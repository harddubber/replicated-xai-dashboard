import React from "react";
import { cn } from "@/lib/utils";
import { Avatar as BaseAvatar } from "@/ui/primitives/Avatar1";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof BaseAvatar> {}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof BaseAvatar>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <BaseAvatar
    ref={ref}
    className={cn(
      "border-foreground/10 relative box-border flex h-10 w-10 shrink-0 overflow-hidden rounded-full border",
      className
    )}
    {...props}
  />
));

Avatar.displayName = "Avatar";
