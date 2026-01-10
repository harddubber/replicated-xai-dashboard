import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Note: This component appears to be part of a Radix UI-like Avatar primitive.
 * It depends on a context provider that tracks the image loading status.
 * Since the dependencies for the context/primitive are not provided, 
 * I will define the internal structure based on the minified code logic.
 */

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<"span"> {
  delayMs?: number;
  __scopeAvatar?: any;
}

// Mocking the context hook 'm(g, n)' and the Primitive 's.Primitive.span'
// as they are not provided in the dependencies but are used in the minified code.

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, className, ...fallbackProps } = props;
    
    // In a real Radix implementation, this would come from the Avatar context.
    // Since we don't have the context, we'll assume a default 'idle' or similar status 
    // if the context isn't available, but the minified code expects 'l.imageLoadingStatus'.
    // For the purpose of this conversion, we'll treat it as a placeholder.
    const imageLoadingStatus = "idle"; // This would normally come from useAvatarContext(__scopeAvatar)

    const [canRender, setCanRender] = useState(delayMs === undefined);

    useEffect(() => {
      if (delayMs !== undefined) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);

    // The logic from the minified code:
    // return c && "loaded" !== l.imageLoadingStatus ? (0, t.jsx)(s.Primitive.span, { ...o, ref: a }) : null
    if (canRender && imageLoadingStatus !== "loaded") {
      return (
        <span
          {...fallbackProps}
          ref={forwardedRef}
          className={cn(className)}
        />
      );
    }

    return null;
  }
);

AvatarFallback.displayName = "AvatarFallback";
