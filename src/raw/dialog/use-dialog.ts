"use client";

import { useDialogApi } from "../internal/use-dialog-api";
import { scrollLock } from "../internal/scroll-lock";

export function useDialog({
  dialogId,
  isNested = false,
  modal = true,
}: {
  dialogId: string;
  isNested: boolean;
  modal?: boolean;
}) {
  const {
    dialogId: hookDialogId,
    dialogProps,
    triggerProps,
    showDialog: nativeShowDialog,
    showModalDialog: nativeShowModalDialog,
    closeDialog: nativeCloseDialog,
  } = useDialogApi({
    dialogId,
    modal,
  });

  function getParentDialog(dialogElement: HTMLElement | null) {
    if (!dialogElement) return null;

    return dialogElement.closest(
      `dialog:not([id="${hookDialogId}"])`,
    ) as HTMLDialogElement | null;
  }

  function updateParentDialogState(isOpening: boolean) {
    if (!isNested) return;

    const dialog = document.getElementById(hookDialogId);
    const parentDialog = getParentDialog(dialog);

    if (!parentDialog) return;

    if (isOpening) {
      parentDialog.setAttribute("data-nested-dialog-open", "true");
      return;
    }

    const otherOpenNestedDialogs = parentDialog.querySelectorAll(
      `dialog[data-nested="true"][open]:not([id="${hookDialogId}"])`,
    );

    if (otherOpenNestedDialogs.length === 0) {
      parentDialog.removeAttribute("data-nested-dialog-open");
    }
  }

  function showDialog() {
    if (!modal) {
      nativeShowDialog();
      updateParentDialogState(true);
      return;
    }

    if (!isNested) {
      scrollLock.lock();
    }

    nativeShowModalDialog();
    updateParentDialogState(true);
  }

  function closeDialog(returnValue?: string) {
    if (modal && !isNested) {
      scrollLock.unlock();
    }

    nativeCloseDialog(returnValue);
    updateParentDialogState(false);
  }

  function toggleDialog() {
    const element = document.getElementById(hookDialogId) as HTMLDialogElement;
    if (!element) return;

    element.open ? closeDialog() : showDialog();
  }

  return {
    dialogId: hookDialogId,
    dialogProps,
    triggerProps: {
      ...triggerProps,
      onClick: showDialog,
    },
    showDialog,
    showModalDialog: showDialog,
    closeDialog,
    toggleDialog,
  };
}
