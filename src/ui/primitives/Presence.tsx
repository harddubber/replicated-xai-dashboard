import React, {
  useState,
  useRef,
  useReducer,
  useEffect,
  useLayoutEffect,
  useCallback,
  Children,
  cloneElement,
} from "react";

// Helper to get animation names from computed style
function getAnimationNames(style: CSSStyleDeclaration | null): string {
  return style?.animationName || "none";
}

// Custom hook for composing refs
function useComposedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  }, refs);
}

export interface PresenceProps {
  present: boolean;
  children: React.ReactNode | ((props: { present: boolean }) => React.ReactElement);
}

type PresenceState = "mounted" | "unmountSuspended" | "unmounted";
type PresenceEvent = "MOUNT" | "UNMOUNT" | "ANIMATION_OUT" | "ANIMATION_END";

const presenceReducer = (state: PresenceState, event: PresenceEvent): PresenceState => {
  const transitions: Record<PresenceState, Partial<Record<PresenceEvent, PresenceState>>> = {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended",
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted",
    },
    unmounted: {
      MOUNT: "mounted",
    },
  };

  return transitions[state][event] ?? state;
};

export const Presence: React.FC<PresenceProps> = ({ present, children }) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const stylesRef = useRef<CSSStyleDeclaration | null>(null);
  const prevPresentRef = useRef(present);
  const prevAnimationNameRef = useRef("none");

  const [state, dispatch] = useReducer(
    presenceReducer,
    present ? "mounted" : "unmounted"
  );

  useEffect(() => {
    const animationNames = getAnimationNames(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? animationNames : "none";
  }, [state]);

  useLayoutEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;

    if (wasPresent !== present) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationNames(styles);

      if (present) {
        dispatch("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        dispatch("UNMOUNT");
      } else {
        const isAnimating = wasPresent && prevAnimationName !== currentAnimationName;
        if (isAnimating) {
          dispatch("ANIMATION_OUT");
        } else {
          dispatch("UNMOUNT");
        }
      }

      prevPresentRef.current = present;
    }
  }, [present]);

  useLayoutEffect(() => {
    if (node) {
      const win = node.ownerDocument.defaultView ?? window;
      let timeoutId: number;

      const handleAnimationEnd = (event: AnimationEvent) => {
        const currentAnimationName = getAnimationNames(stylesRef.current);
        const isOurAnimation = currentAnimationName.includes(event.animationName);

        if (event.target === node && isOurAnimation && !prevPresentRef.current) {
          dispatch("ANIMATION_END");

          // Keep the element visible during the final frame of exit animation
          const originalFillMode = node.style.animationFillMode;
          node.style.animationFillMode = "forwards";
          timeoutId = win.setTimeout(() => {
            if (node.style.animationFillMode === "forwards") {
              node.style.animationFillMode = originalFillMode;
            }
          }) as unknown as number;
        }
      };

      const handleAnimationStart = (event: AnimationEvent) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationNames(stylesRef.current);
        }
      };

      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);

      return () => {
        win.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      dispatch("ANIMATION_END");
    }
  }, [node]);

  const isPresent = state === "mounted" || state === "unmountSuspended";

  const presenceRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      stylesRef.current = window.getComputedStyle(node);
    } else {
      stylesRef.current = null;
    }
    setNode(node);
  }, []);

  const child = typeof children === "function" 
    ? children({ present: isPresent }) 
    : Children.only(children) as React.ReactElement;

  // Attempt to extract ref from the child to compose it
  // In the minified code, there's a lot of logic checking for React warnings on refs
  // which usually implies handling both `ref` and `props.ref` (for older/different React versions)
  const childRef = (child as any).ref || (child.props as any)?.ref;
  const composedRefs = useComposedRefs(presenceRef, childRef);

  if (typeof children === "function" || isPresent) {
    return cloneElement(child, { ref: composedRefs });
  }

  return null;
};
