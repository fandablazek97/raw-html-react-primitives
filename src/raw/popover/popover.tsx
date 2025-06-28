"use client";

import { createContext, useContext } from "react";
import { useId } from "@/raw/internal/use-id";
import { useAnchorPositionApi } from "@/raw/internal/use-anchor-position-api";
import { usePopoverApi } from "@/raw/internal/use-popover-api";
import type { AnchorOptions } from "@/raw/internal/use-anchor-position-api";
import type { PopoverOptions } from "@/raw/internal/use-popover-api";

type PopoverRootContextType = {
  id: string;
  anchorStyles: React.CSSProperties;
  targetStyles: React.CSSProperties;
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
  triggerProps: {
    popoverTarget: string;
    popoverTargetAction?: "toggle" | "show" | "hide";
  };
  popoverProps: {
    id: string;
    popover: "auto" | "manual";
  };
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
  mode = "auto",
  popoverId,
}: {
  children: React.ReactNode;
  anchor?: AnchorOptions["area"];
  flip?: boolean;
  mode?: PopoverOptions["mode"];
  popoverId?: string;
}) {
  const id = useId("raw-ui-popover-");

  // Use the popover API hook
  const {
    popoverId: hookPopoverId,
    popoverProps,
    triggerProps,
    showPopover,
    hidePopover,
    togglePopover,
  } = usePopoverApi({
    popoverId: popoverId || id,
    mode,
  });

  // Use anchor positioning for the popover
  const { anchorStyles, targetStyles } = useAnchorPositionApi({
    area: anchor,
    anchorId: hookPopoverId,
    tryFallbacks: flip ? "flip-block, flip-inline, flip-start" : "none",
  });

  return (
    <PopoverRootContext.Provider
      value={{
        id: hookPopoverId,
        anchorStyles,
        targetStyles,
        showPopover,
        hidePopover,
        togglePopover,
        triggerProps,
        popoverProps,
      }}
    >
      {children}
    </PopoverRootContext.Provider>
  );
}

export function PopoverTrigger({
  children,
  style,
  onClick,
  ...props
}: Omit<React.ComponentProps<"button">, "popoverTarget">) {
  const { anchorStyles, triggerProps } = usePopoverRootContext();

  return (
    <button
      {...props}
      {...triggerProps}
      onClick={(e) => {
        onClick?.(e);
      }}
      style={{ ...anchorStyles, ...style }}
    >
      {children}
    </button>
  );
}

export function PopoverClose({
  children,
  onClick,
  ...props
}: Omit<
  React.ComponentProps<"button">,
  "popoverTarget" | "popoverTargetAction"
>) {
  const { hidePopover } = usePopoverRootContext();

  return (
    <button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        hidePopover();
      }}
    >
      {children}
    </button>
  );
}

export function PopoverPanel({
  children,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "popover">) {
  const { targetStyles, popoverProps } = usePopoverRootContext();

  return (
    <div {...props} {...popoverProps} style={{ ...targetStyles, ...style }}>
      {children}
    </div>
  );
}
