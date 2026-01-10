import React from "react";
import { cn } from "@/lib/utils";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable && React.isValidElement(slottable)) {
    const slottableChild = slottable.props.children;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(slottableChild) > 1) {
          return React.Children.only(null);
        }
        return React.isValidElement(slottableChild)
          ? (slottableChild.props as any).children
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(slottableChild)
          ? React.cloneElement(slottableChild, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

interface SlotCloneProps {
  children: React.ReactNode;
}

const SlotClone = React.forwardRef<any, SlotCloneProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props as any),
      ref: forwardedRef ? composeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
    });
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});

SlotClone.displayName = "SlotClone";

export const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: any, childProps: any) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: any[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "className") {
      overrideProps[propName] = cn(slotPropValue, childPropValue);
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }
  }

  return { ...slotProps, ...overrideProps };
}

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}
