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
  const isModal = modal;
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
    if (!isModal) {
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
    if (isModal && !isNested) {
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

  function handleEscapeClose(event: React.SyntheticEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget as HTMLDialogElement;
    closeDialog(dialog.returnValue);
    event.stopPropagation();
  }

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDialogElement>,
    dismissable: boolean,
  ) {
    if (!dismissable) return;

    const dialog = event.currentTarget;

    // Prevent closing if the dialog is already closed
    if (!dialog.open) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      closeDialog();
      event.stopPropagation();
    }
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
    handleEscapeClose,
    handleBackdropClick,
  };
}
