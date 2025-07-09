"use client";

import { useDialogApi } from "../internal/use-dialog-api";
import { scrollLock } from "../internal/scroll-lock";

export function useDialog({
  dialogId,
  modal = true,
}: {
  dialogId: string;
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
      scrollLock.lock();
      nativeShowModalDialog();
    } else {
      nativeShowDialog();
    }
  }

  function closeDialog(returnValue?: string) {
    if (modal) {
      scrollLock.unlock();
    }
    nativeCloseDialog(returnValue);
  }

  function toggleDialog() {
    if (scrollLock.isLocked()) {
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
