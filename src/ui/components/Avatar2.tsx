import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  __scopeAvatar?: any;
}

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarContextValue {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: (status: ImageLoadingStatus) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | undefined>(
  undefined
);

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ __scopeAvatar, className, ...props }, ref) => {
    const [imageLoadingStatus, setImageLoadingStatus] =
      React.useState<ImageLoadingStatus>("idle");

    return (
      <AvatarContext.Provider
        value={{
          imageLoadingStatus,
          onImageLoadingStatusChange: setImageLoadingStatus,
        }}
      >
        <span
          ref={ref}
          className={cn(className)}
          {...props}
        />
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";
