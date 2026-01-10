import React from "react";

/**
 * UseComposedRefs is a utility that merges multiple refs into a single callback ref.
 * Replicating it here to satisfy dependencies.
 */
function useComposedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T>).current = node;
        }
      });
    },
    [refs]
  );
}

const ANCHOR_NAME = "PopperAnchor";

export interface PopperAnchorProps {
  asChild?: boolean;
  children?: React.ReactNode;
  virtualRef?: React.RefObject<any>;
  __scopePopper?: any;
}

export const PopperAnchor = React.forwardRef<HTMLDivElement, PopperAnchorProps>(
  (props, forwardedRef) => {
    return props.children;
  }
);

PopperAnchor.displayName = ANCHOR_NAME;
