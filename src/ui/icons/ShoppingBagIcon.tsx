import React from "react";
import { cn } from "@/lib/utils";

export interface ShoppingBagIconProps extends React.SVGProps<SVGSVGElement> {}

export function ShoppingBagIcon({ className, ...props }: ShoppingBagIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      <path d="M2 13h6v8H2zm14-5h6v13h-6zM9 3h6v18H9zM4 15v4h2v-4zm7-10v14h2V5zm7 5v9h2v-9z" />
    </svg>
  );
}
