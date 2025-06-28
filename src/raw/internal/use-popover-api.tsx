"use client";

import { useId } from "./use-id";

export type PopoverOptions = {
  popoverId?: string;
  mode?: "auto" | "manual";
};

export type PopoverApiReturn = {
  popoverId: string;
  popoverProps: {
    id: string;
    popover: "auto" | "manual";
  };
  triggerProps: {
    popoverTarget: string;
    popoverTargetAction?: "toggle" | "show" | "hide";
  };
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
};

export function usePopoverApi({
  popoverId,
  mode = "auto",
}: PopoverOptions = {}): PopoverApiReturn {
  const internalId = useId("raw-ui-popover");
  const id = popoverId || internalId;

  function showPopover() {
    const element = document.getElementById(id) as HTMLElement & {
      showPopover?: () => void;
    };
    element?.showPopover?.();
  }

  function hidePopover() {
    const element = document.getElementById(id) as HTMLElement & {
      hidePopover?: () => void;
    };
    element?.hidePopover?.();
  }

  function togglePopover() {
    const element = document.getElementById(id) as HTMLElement & {
      togglePopover?: () => void;
    };
    element?.togglePopover?.();
  }

  return {
    popoverId: id,
    popoverProps: {
      id,
      popover: mode,
    },
    triggerProps: {
      popoverTarget: id,
      popoverTargetAction: "toggle",
    },
    showPopover,
    hidePopover,
    togglePopover,
  };
}
