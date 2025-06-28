"use client";

import { createContext, useContext } from "react";
import { useId } from "@/raw/internal/use-id";
import { useAnchorPositionApi } from "@/raw/internal/use-anchor-position-api";
import type { AnchorOptions } from "@/raw/internal/use-anchor-position-api";

type PopoverRootContextType = {
  id: string;
  anchorStyles: React.CSSProperties;
  targetStyles: React.CSSProperties;
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

export function PopoverRoot({
  children,
  anchor = "bottom",
  flip = true,
}: {
  children: React.ReactNode;
  anchor?: AnchorOptions["area"];
  flip?: boolean;
}) {
  const id = useId("raw-ui-popover-");

  const { anchorStyles, targetStyles } = useAnchorPositionApi({
    area: anchor,
    anchorId: id,
  });

  return (
    <PopoverRootContext.Provider value={{ id, anchorStyles, targetStyles }}>
      {children}
    </PopoverRootContext.Provider>
  );
}

export function PopoverTrigger({
  children,
  style,
  ...props
}: Omit<React.ComponentProps<"button">, "popoverTarget">) {
  const { id, anchorStyles } = usePopoverRootContext();

  return (
    <button {...props} popoverTarget={id} style={{ ...anchorStyles, ...style }}>
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

export function PopoverPanel({
  children,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "popover">) {
  const { id, targetStyles } = usePopoverRootContext();

  return (
    <div
      {...props}
      id={id}
      popover="auto"
      style={{ ...targetStyles, ...style }}
    >
      {children}
    </div>
  );
}
