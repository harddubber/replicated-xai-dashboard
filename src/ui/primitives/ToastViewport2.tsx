import React from "react";

// Standard HTML tags for Primitive fallback
const Primitive = {
  ol: React.forwardRef<HTMLOlElement, React.OlHTMLAttributes<HTMLOlElement>>(
    (props, ref) => <ol {...props} ref={ref} />
  ),
  span: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    (props, ref) => <span {...props} ref={ref} />
  ),
};

// Simplified Slot implementation since @/components/C154/Slot might be causing issues
const Slot = ({ children, ...props }: any) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { ...props, ...children.props } as any);
  }
  return null;
};

// Constants from minified code analysis
const VIEWPORT_NAME = "ToastViewport";
const HOTKEY = ["F8"];
const VIEWPORT_PAUSE_EVENT = "toast.viewportPause";
const VIEWPORT_RESUME_EVENT = "toast.viewportResume";

// Internal helper for focus management
function focusFirst(elements: HTMLElement[]) {
  const existingActiveElement = document.activeElement;
  for (const element of elements) {
    if (element === existingActiveElement) return true;
    element.focus();
    if (document.activeElement !== existingActiveElement) return true;
  }
  return false;
}

// Mocking these for now as they are likely provided by a context provider not in the dependencies list
const ToastContext = React.createContext({
  onViewportChange: (node: HTMLOlElement | null) => {},
  toastCount: 0,
  isClosePausedRef: { current: false },
});

const ToastViewportContext = React.createContext(() => [] as Array<{ ref: React.RefObject<HTMLElement> }>);

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof Primitive.ol> {
  hotkey?: string[];
  label?: string;
  /**
   * Internal scope for Radix UI context.
   */
  __scopeToast?: any;
}

export const ToastViewport = React.forwardRef<HTMLOlElement, ToastViewportProps>(
  (props, forwardedRef) => {
    const {
      __scopeToast,
      hotkey = HOTKEY,
      label = "Notifications ({hotkey})",
      ...viewportProps
    } = props;

    const context = React.useContext(ToastContext);
    const getItems = React.useContext(ToastViewportContext);
    
    const viewportRootRef = React.useRef<HTMLDivElement>(null);
    const headFocusSentinelRef = React.useRef<HTMLSpanElement>(null);
    const tailFocusSentinelRef = React.useRef<HTMLSpanElement>(null);
    const listRef = React.useRef<HTMLOlElement>(null);

    // Compose refs manually since useComposedRefs isn't imported from a known location
    const handleRef = React.useCallback(
      (node: HTMLOlElement | null) => {
        (listRef as any).current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as any).current = node;
        }
        context.onViewportChange(node);
      },
      [forwardedRef, context]
    );

    const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    const hasToasts = context.toastCount > 0;

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        const isHotkeyPressed = hotkey.every((key) => (event as any)[key] || event.code === key);
        if (isHotkeyPressed) {
          listRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [hotkey]);

    React.useEffect(() => {
      const viewportRoot = viewportRootRef.current;
      const list = listRef.current;
      if (hasToasts && viewportRoot && list) {
        const handlePause = () => {
          if (!context.isClosePausedRef.current) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE_EVENT);
            list.dispatchEvent(pauseEvent);
            context.isClosePausedRef.current = true;
          }
        };

        const handleResume = () => {
          if (context.isClosePausedRef.current) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME_EVENT);
            list.dispatchEvent(resumeEvent);
            context.isClosePausedRef.current = false;
          }
        };

        const handleFocusOut = (event: FocusEvent) => {
          if (!viewportRoot.contains(event.relatedTarget as Node)) {
            handleResume();
          }
        };

        const handlePointerLeave = () => {
          if (!viewportRoot.contains(document.activeElement)) {
            handleResume();
          }
        };

        viewportRoot.addEventListener("focusin", handlePause);
        viewportRoot.addEventListener("focusout", handleFocusOut);
        viewportRoot.addEventListener("pointermove", handlePause);
        viewportRoot.addEventListener("pointerleave", handlePointerLeave);
        window.addEventListener("blur", handlePause);
        window.addEventListener("focus", handleResume);

        return () => {
          viewportRoot.removeEventListener("focusin", handlePause);
          viewportRoot.removeEventListener("focusout", handleFocusOut);
          viewportRoot.removeEventListener("pointermove", handlePause);
          viewportRoot.removeEventListener("pointerleave", handlePointerLeave);
          window.removeEventListener("blur", handlePause);
          window.removeEventListener("focus", handleResume);
        };
      }
    }, [hasToasts, context.isClosePausedRef]);

    const getTabbableCandidates = React.useCallback(
      ({ tabbingDirection }: { tabbingDirection: "forwards" | "backwards" }) => {
        const items = getItems();
        const tabbableItems = items.map((item) => {
          const toastElement = item.ref.current;
          if (!toastElement) return [];
          
          const candidates: HTMLElement[] = [toastElement];
          const treeWalker = document.createTreeWalker(toastElement, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (node: HTMLElement) => {
              const isHiddenInput = node.tagName === "INPUT" && (node as HTMLInputElement).type === "hidden";
              if (node.disabled || node.hidden || isHiddenInput) {
                return NodeFilter.FILTER_SKIP;
              }
              return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            },
          } as any);

          while (treeWalker.nextNode()) {
            candidates.push(treeWalker.currentNode as HTMLElement);
          }
          
          return tabbingDirection === "forwards" ? candidates : candidates.reverse();
        });

        return (tabbingDirection === "forwards" ? tabbableItems.reverse() : tabbableItems).flat();
      },
      [getItems]
    );

    React.useEffect(() => {
      const list = listRef.current;
      if (list) {
        const handleKeyDown = (event: KeyboardEvent) => {
          const isModifierKey = event.altKey || event.ctrlKey || event.metaKey;
          if (event.key === "Tab" && !isModifierKey) {
            const activeElement = document.activeElement as HTMLElement;
            const isBackward = event.shiftKey;

            if (event.target === list && isBackward) {
              headFocusSentinelRef.current?.focus();
              return;
            }

            const candidates = getTabbableCandidates({
              tabbingDirection: isBackward ? "backwards" : "forwards",
            });
            const currentIndex = candidates.findIndex((el) => el === activeElement);
            const remainingCandidates = candidates.slice(currentIndex + 1);

            if (focusFirst(remainingCandidates)) {
              event.preventDefault();
            } else {
              if (isBackward) {
                headFocusSentinelRef.current?.focus();
              } else {
                tailFocusSentinelRef.current?.focus();
              }
            }
          }
        };

        list.addEventListener("keydown", handleKeyDown);
        return () => list.removeEventListener("keydown", handleKeyDown);
      }
    }, [getItems, getTabbableCandidates]);

    return (
      <div
        ref={viewportRootRef}
        role="region"
        aria-label={label.replace("{hotkey}", hotkeyLabel)}
        tabIndex={-1}
        style={{ pointerEvents: hasToasts ? undefined : "none" }}
      >
        {hasToasts && (
          <FocusSentinel
            ref={headFocusSentinelRef}
            onFocusFromOutsideViewport={() => {
              focusFirst(getTabbableCandidates({ tabbingDirection: "forwards" }));
            }}
          />
        )}
        <Slot scope={__scopeToast}>
          <Primitive.ol tabIndex={-1} {...viewportProps} ref={handleRef} />
        </Slot>
        {hasToasts && (
          <FocusSentinel
            ref={tailFocusSentinelRef}
            onFocusFromOutsideViewport={() => {
              focusFirst(getTabbableCandidates({ tabbingDirection: "backwards" }));
            }}
          />
        )}
      </div>
    );
  }
);

ToastViewport.displayName = VIEWPORT_NAME;

/* -----------------------------------------------------------------------------------------------*/

interface FocusSentinelProps extends React.ComponentPropsWithoutRef<typeof Primitive.span> {
  onFocusFromOutsideViewport(): void;
}

const FocusSentinel = React.forwardRef<HTMLSpanElement, FocusSentinelProps>(
  (props, forwardedRef) => {
    const { onFocusFromOutsideViewport, ...sentinelProps } = props;
    const isInteractingRef = React.useRef(false);

    return (
      <Primitive.span
        aria-hidden
        tabIndex={0}
        {...sentinelProps}
        ref={forwardedRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          height: "1px",
          width: "1px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          ...sentinelProps.style,
        }}
        onFocus={(event) => {
          const prevFocusedElement = event.relatedTarget as HTMLElement | null;
          const isFocusFromOutside = !event.currentTarget.parentElement?.contains(prevFocusedElement);
          if (isFocusFromOutside || !isInteractingRef.current) {
            onFocusFromOutsideViewport();
          }
        }}
      />
    );
  }
);

export const ComponentToRewrite = ToastViewport;
