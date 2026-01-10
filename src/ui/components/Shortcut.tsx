import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type OS = "mac" | "windows" | "linux";

export interface ShortcutProps {
  primaryKey: string;
  modifierKeys?: string[];
  label?: string;
  className?: string;
}

const getModifierSymbol = (key: string, os: OS): string => {
  switch (key.toLowerCase()) {
    case "ctrl":
      return os === "mac" ? "⌘" : "Ctrl+";
    case "alt":
      return os === "mac" ? "⌥" : "Alt+";
    case "shift":
      return "⇧";
    default:
      return key;
  }
};

export function Shortcut({
  primaryKey,
  modifierKeys,
  label,
  className,
}: ShortcutProps) {
  const [os, setOs] = useState<OS>("mac");

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent) {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("windows")) {
        setOs("windows");
      } else if (userAgent.includes("linux")) {
        setOs("linux");
      }
    }
  }, []);

  const renderedModifiers = (modifierKeys || []).map((key) => (
    <span key={key}>{getModifierSymbol(key, os)}</span>
  ));

  return (
    <div
      className={cn(
        "bg-foreground/10 text-muted inline-flex items-center rounded-md px-1 py-0.5 text-center font-sans text-xs font-normal tracking-widest rtl:space-x-reverse",
        className
      )}
    >
      {label && <span className="mr-1">{label}</span>}
      {renderedModifiers}
      <span className="text-xs">{primaryKey.toUpperCase()}</span>
    </div>
  );
}
