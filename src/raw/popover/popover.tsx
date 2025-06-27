"use client";

import { createContext, useContext } from "react";
import { useRawId } from "@/raw/internal/useRawId";

type PopoverRootContextType = {
  id: string;
};

const PopoverRootContext = createContext<PopoverRootContextType | null>(null);

function usePopoverRootContext() {
  const context = useContext(PopoverRootContext);

  if (!context) {
    throw new Error(
      "Raw UI: PopoverRootContext is missing. Popover parts must be used within <Popover.Root>.",
    );
  }

  return context;
}

export function PopoverRoot({ children }: { children: React.ReactNode }) {
  const id = useRawId();

  return (
    <PopoverRootContext.Provider value={{ id }}>
      {children}
    </PopoverRootContext.Provider>
  );
}

export function PopoverTrigger({
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "popoverTarget">) {
  const { id } = usePopoverRootContext();

  return (
    <button {...props} popoverTarget={id}>
      {children}
    </button>
  );
}

export function PopoverClose({
  children,
  ...props
}: Omit<
  React.ComponentProps<"button">,
  "popoverTarget" | "popoverTargetAction"
>) {
  const { id } = usePopoverRootContext();

  return (
    <button {...props} popoverTarget={id} popoverTargetAction="hide">
      {children}
    </button>
  );
}

export function PopoverPopup({
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "popover">) {
  const { id } = usePopoverRootContext();

  return (
    <div {...props} id={id} popover="auto">
      {children}
    </div>
  );
}
