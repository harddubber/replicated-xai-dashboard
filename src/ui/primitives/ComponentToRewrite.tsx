import React, { useContext, useEffect, useRef } from "react";
import { Primitive, type PrimitiveProps } from "@/ui/primitives/Primitive2";

/**
 * A utility to compose multiple refs into one.
 */
function useComposedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  }, [refs]);
}

// Context for managing branches, likely from a Menu, Dialog, or similar Radix-like primitive
export const BranchContext = React.createContext<{
  branches: Set<HTMLElement>;
}>({
  branches: new Set(),
});

export interface BranchElementProps extends PrimitiveProps {}

export const ComponentToRewrite = React.forwardRef<HTMLDivElement, BranchElementProps>(
  (props, forwardedRef) => {
    const context = useContext(BranchContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, nodeRef);

    useEffect(() => {
      const node = nodeRef.current;
      if (node && context.branches) {
        context.branches.add(node);
        return () => {
          context.branches.delete(node);
        };
      }
    }, [context.branches]);

    return <Primitive.div {...props} ref={composedRefs} />;
  }
);

ComponentToRewrite.displayName = "ComponentToRewrite";
