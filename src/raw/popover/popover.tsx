"use client";

import { createContext, useContext, useId, useState } from "react";

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
  const id = useId();

  return (
    <PopoverRootContext.Provider value={{ id }}>
      {children}
    </PopoverRootContext.Provider>
  );
}

export function PopoverTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { id } = usePopoverRootContext();

  return (
    <button {...props} popoverTarget={id}>
      {children}
    </button>
  );
}

export function PopoverPopup({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { id } = usePopoverRootContext();

  if (!open) return null;

  return (
    <div {...props} id={id} popover="auto">
      {children}
    </div>
  );
}
