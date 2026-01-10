import React from "react";
import { cn } from "@/lib/utils";
import * as PrimitiveModule from "@/ui/primitives/Primitive1";
import * as PopperAnchorModule from "@/ui/primitives/PopperAnchor";

const Primitive = PrimitiveModule.Primitive;
const Anchor = PopperAnchorModule.PopperAnchor;

const POPOVER_NAME = "Popover";

const [createPopoverContext, createPopoverScope] = (function createContextScope(
  name: string
) {
  const scopeContext = React.createContext<any>(undefined);
  function createContext<ContextValueType>(
    rootName: string,
    defaultContext?: ContextValueType
  ) {
    const Context = React.createContext<ContextValueType | undefined>(
      defaultContext
    );
    function useContext(consumerName: string, scope?: any) {
      const context = React.useContext(Context);
      if (context) return context;
      return defaultContext;
    }
    return [Context, useContext] as const;
  }
  return [createContext, (scope: any) => scopeContext] as const;
})(POPOVER_NAME);

interface PopoverContextValue {
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenToggle(): void;
  hasCustomAnchor: boolean;
}

const [PopoverContextProvider, usePopoverContext] =
  createPopoverContext<PopoverContextValue>(POPOVER_NAME, {
    triggerRef: { current: null } as any,
    contentId: "radix-_R_339fiv5jb_",
    open: false,
    onOpenToggle: () => {},
    hasCustomAnchor: false,
  });

/**
 * Hook to compose multiple refs into one.
 * In a real scenario, this would come from a utility library like @radix-ui/react-compose-refs.
 */
function useComposedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  }, refs);
}

/**
 * Utility to compose event handlers.
 */
function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: any) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !event.defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

export interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.button> {
  __scopePopover?: any;
}

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>((props, forwardedRef) => {
  const { __scopePopover, ...triggerProps } = props;
  const context = usePopoverContext("PopoverTrigger", __scopePopover);
  const scope = createPopoverScope(__scopePopover);

  const composedTriggerRef = useComposedRefs(forwardedRef, context!.triggerRef);

  const trigger = (
    <Primitive.button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context!.open}
      aria-controls={context!.contentId}
      data-state={context!.open ? "open" : "closed"}
      {...triggerProps}
      ref={composedTriggerRef}
      onClick={composeEventHandlers(props.onClick, context!.onOpenToggle)}
    />
  );

  return context!.hasCustomAnchor ? (
    trigger
  ) : (
    <Anchor asChild __scopePopper={__scopePopover}>
      {trigger}
    </Anchor>
  );
});

PopoverTrigger.displayName = "PopoverTrigger";
