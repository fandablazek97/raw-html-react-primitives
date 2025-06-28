"use client";

import { useId } from "./use-id";

export type DialogOptions = {
  dialogId?: string;
  modal?: boolean;
};

export type DialogApiReturn = {
  dialogId: string;
  dialogProps: {
    id: string;
  };
  triggerProps: {
    onClick: () => void;
  };
  showDialog: () => void;
  showModalDialog: () => void;
  closeDialog: (returnValue?: string) => void;
  toggleDialog: () => void;
};

export function useDialogApi({
  dialogId,
  modal = true,
}: DialogOptions = {}): DialogApiReturn {
  const internalId = useId("raw-ui-dialog");
  const id = dialogId || internalId;

  function showDialog() {
    const element = document.getElementById(id) as HTMLDialogElement;
    element?.show?.();
  }

  function showModalDialog() {
    const element = document.getElementById(id) as HTMLDialogElement;
    element?.showModal?.();
  }

  function closeDialog(returnValue?: string) {
    const element = document.getElementById(id) as HTMLDialogElement;
    if (!element?.close) return;

    if (returnValue !== undefined) {
      element.returnValue = returnValue;
    }

    element.close();
  }

  function toggleDialog() {
    const element = document.getElementById(id) as HTMLDialogElement;
    if (!element) return;

    if (element.open) {
      closeDialog();
      return;
    }

    modal ? showModalDialog() : showDialog();
  }

  return {
    dialogId: id,
    dialogProps: {
      id,
    },
    triggerProps: {
      onClick: toggleDialog,
    },
    showDialog,
    showModalDialog,
    closeDialog,
    toggleDialog,
  };
}
