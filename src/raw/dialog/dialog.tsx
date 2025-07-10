"use client";

import { useContext } from "react";
import { useId } from "../internal/use-id";
import type { DialogOptions } from "../internal/use-dialog-api";
import { chain } from "../internal/compose-event-handlers";
import { useDialog } from "./use-dialog";
import {
  DialogRootContext,
  NestedDialogContext,
  useDialogRootContext,
} from "./dialog-context";

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
  const isNested = useContext(NestedDialogContext);

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
    handleEscapeClose,
    handleBackdropClick,
  } = useDialog({
    dialogId: propDialogId || id,
    isNested,
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
        isNested,
        isModal: modal,
        dismissable,
        handleEscapeClose,
        handleBackdropClick,
      }}
    >
      <NestedDialogContext.Provider value={true}>
        {children}
      </NestedDialogContext.Provider>
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
    <button {...props} onClick={chain(onClick, triggerProps.onClick)}>
      {children}
    </button>
  );
}

export function DialogPanel({
  children,
  onClose,
  onClick,
  ...props
}: React.ComponentProps<"dialog">) {
  const {
    dialogProps,
    dismissable,
    isNested,
    handleEscapeClose,
    handleBackdropClick,
  } = useDialogRootContext();

  return (
    <dialog
      {...props}
      {...dialogProps}
      onClose={chain(onClose, handleEscapeClose)}
      onClick={chain(onClick, (e) => handleBackdropClick(e, dismissable))}
      data-nested={isNested ? "true" : undefined}
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
  const { closeDialog } = useDialogRootContext();

  return (
    <button {...props} onClick={chain(onClick, () => closeDialog(returnValue))}>
      {children}
    </button>
  );
}
