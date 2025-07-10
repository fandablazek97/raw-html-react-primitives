"use client";

import { createContext, useContext } from "react";
import { useId } from "../internal/use-id";
import type { DialogOptions } from "../internal/use-dialog-api";
import { useDialog } from "./use-dialog";

type DialogRootContextType = {
  dialogId: string;
  titleId: string;
  descriptionId: string;
  showDialog: () => void;
  showModalDialog: () => void;
  closeDialog: (returnValue?: string) => void;
  toggleDialog: () => void;
  triggerProps: {
    onClick: () => void;
  };
  dialogProps: {
    id: string;
    "aria-labelledby": string;
    "aria-describedby": string;
  };
  modal: boolean;
  dismissable: boolean;
};

const DialogRootContext = createContext<DialogRootContextType | undefined>(
  undefined,
);

function useDialogRootContext() {
  const context = useContext(DialogRootContext);

  if (!context) {
    throw new Error(
      "Raw UI: DialogRootContext is missing. Dialog parts must be used within <Dialog.Root>.",
    );
  }

  return context;
}

export function DialogRoot({
  children,
  modal = true,
  dismissable = true,
  dialogId: propDialogId,
}: {
  children: React.ReactNode;
  modal?: DialogOptions["modal"];
  dismissable?: boolean;
  dialogId?: string;
}) {
  const id = useId("raw-ui-dialog-");
  const titleId = useId("raw-ui-dialog-title-");
  const descriptionId = useId("raw-ui-dialog-description-");

  const {
    dialogId,
    dialogProps,
    triggerProps,
    showDialog,
    showModalDialog,
    closeDialog,
    toggleDialog,
  } = useDialog({
    dialogId: propDialogId || id,
    modal,
  });

  return (
    <DialogRootContext.Provider
      value={{
        dialogId,
        titleId,
        descriptionId,
        showDialog,
        showModalDialog,
        closeDialog,
        toggleDialog,
        triggerProps,
        dialogProps: {
          ...dialogProps,
          "aria-labelledby": titleId,
          "aria-describedby": descriptionId,
        },
        modal,
        dismissable,
      }}
    >
      {children}
    </DialogRootContext.Provider>
  );
}

export function DialogTrigger({
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { triggerProps } = useDialogRootContext();

  return (
    <button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        triggerProps.onClick();
      }}
    >
      {children}
    </button>
  );
}

export function DialogPanel({
  children,
  onClick,
  ...props
}: React.ComponentProps<"dialog">) {
  const { dialogProps, dismissable, closeDialog } = useDialogRootContext();

  function handleClose(event: React.MouseEvent<HTMLDialogElement>) {
    if (!dismissable) return;

    const dialog = event.currentTarget;

    // Fixed bug: Prevent closing if the dialog is already closed.
    if (!dialog.open) {
      return;
    }

    const rect = dialog.getBoundingClientRect();

    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      closeDialog();
      // Prevents event propagation to parent elements
      event.stopPropagation();
    }
  }

  return (
    <dialog
      {...props}
      {...dialogProps}
      onClick={(e) => {
        onClick?.(e);
        handleClose(e);
      }}
    >
      {children}
    </dialog>
  );
}

export function DialogTitle({
  children,
  ...props
}: React.ComponentProps<"h2">) {
  const { titleId } = useDialogRootContext();

  return (
    <h2 {...props} id={titleId}>
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { descriptionId } = useDialogRootContext();

  return (
    <p {...props} id={descriptionId}>
      {children}
    </p>
  );
}

export function DialogClose({
  children,
  onClick,
  returnValue,
  ...props
}: React.ComponentProps<"button"> & {
  returnValue?: string;
}) {
  const { closeDialog, dialogId } = useDialogRootContext();

  return (
    <button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        closeDialog(returnValue);
      }}
    >
      {children}
    </button>
  );
}
