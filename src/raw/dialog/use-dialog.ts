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

  function showDialog() {
    if (modal) {
      if (!isNested) {
        scrollLock.lock();
      }
      nativeShowModalDialog();
    } else {
      nativeShowDialog();
    }
  }

  function closeDialog(returnValue?: string) {
    if (modal && !isNested) {
      scrollLock.unlock();
    }
    nativeCloseDialog(returnValue);
  }

  function toggleDialog() {
    const element = document.getElementById(hookDialogId) as HTMLDialogElement;
    if (!element) return;

    if (element.open) {
      closeDialog();
    } else {
      showDialog();
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
  };
}
