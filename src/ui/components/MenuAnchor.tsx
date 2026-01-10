import React from "react";
import { PopperAnchor } from "@/ui/primitives/PopperAnchor";

export interface MenuAnchorProps {
  asChild?: boolean;
  children?: React.ReactNode;
  __scopeMenu?: any;
}

/**
 * MenuAnchor is a component used to define the element that a menu's content
 * should position itself against. It wraps Radix UI's PopperAnchor.
 */
export const MenuAnchor = React.forwardRef<HTMLElement, MenuAnchorProps>(
  (props, forwardedRef) => {
    const { __scopeMenu, ...anchorProps } = props;

    // The minified code shows `Z(n)` which likely extracts the Popper scope from the Menu scope.
    // In Radix Menu, the Menu scope usually contains a Popper scope under a specific key or as part of its internal context.
    // Since we don't have the implementation of `Z`, we pass the scope through as `__scopePopper`.
    // Radix components typically use a naming convention like `__scopePopper` for the Popper sub-scope.
    const popperScope = __scopeMenu ? { __scopePopper: __scopeMenu.Popper } : undefined;

    return (
      <PopperAnchor
        {...popperScope}
        {...anchorProps}
        ref={forwardedRef}
      />
    );
  }
);

MenuAnchor.displayName = "MenuAnchor";
