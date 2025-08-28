"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Safe string conversion helper with proper typing
const safeStringify = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (typeof value === "string") return value;

  try {
    // Handle Response objects specially
    if (value instanceof Response) {
      return `Error ${value.status}: ${value.statusText}`;
    }

    // Handle Error objects specially
    if (value instanceof Error) {
      return value.message || String(value);
    }

    // For other objects, try to convert to JSON string
    return JSON.stringify(value, null, 2);
  } catch (err) {
    // Fallback for circular references or other JSON errors
    return String(value);
  }
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
