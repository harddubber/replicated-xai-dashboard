import React from "react";
import { cn } from "@/lib/utils";
import { AvatarImage as BaseAvatarImage } from "@/ui/components/AvatarImage2";
import { AvatarImageProps } from "@/ui/components/AvatarImage2";

/**
 * AvatarImage component that handles image loading states and provides callbacks.
 * It renders the image only when it has successfully loaded and applies square aspect ratio styling.
 */
export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarImageProps
>(({ className, ...props }, ref) => {
  return (
    <BaseAvatarImage
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});

AvatarImage.displayName = "AvatarImage";
