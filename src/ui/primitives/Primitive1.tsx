import React from "react";
import { cn } from "@/lib/utils";

export interface PrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const Primitive = React.forwardRef<HTMLElement, PrimitiveProps>(
  (props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;

    if (typeof window !== "undefined") {
      (window as any)[Symbol.for("radix-ui")] = true;
    }

    if (asChild) {
      return (
        <Slot {...primitiveProps} ref={forwardedRef}>
          {primitiveProps.children}
        </Slot>
      );
    }

    return <span {...primitiveProps} ref={forwardedRef as any} />;
  }
);

/**
 * Slot component is essentially the same as Primitive with asChild=true
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.Children.count(children) > 1) {
      React.Children.only(null);
    }

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        ref: forwardedRef ? mergeRefs(forwardedRef, (children as any).ref) : (children as any).ref,
      } as any);
    }

    return null;
  }
);

function mergeProps(slotProps: any, childProps: any) {
  // Override props from child takes precedence except for handlers, className and style
  const overrideProps = { ...childProps };

  for (const propName in slotProps) {
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
    } else if (propName === "asChild") {
        // Skip asChild
    } else {
        overrideProps[propName] = slotPropValue;
    }
  }

  return overrideProps;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}
