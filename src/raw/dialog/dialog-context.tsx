"use client";

import { createContext, useContext } from "react";

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
  isNested: boolean;
  isModal: boolean;
  dismissable: boolean;
  handleEscapeClose: (event: React.SyntheticEvent<HTMLDialogElement>) => void;
  handleBackdropClick: (
    event: React.MouseEvent<HTMLDialogElement>,
    dismissable: boolean,
  ) => void;
};

export const DialogRootContext = createContext<
  DialogRootContextType | undefined
>(undefined);

export const NestedDialogContext = createContext<boolean>(false);

export function useDialogRootContext() {
  const context = useContext(DialogRootContext);

  if (!context) {
    throw new Error(
      "Raw UI: DialogRootContext is missing. Dialog parts must be used within <Dialog.Root>.",
    );
  }

  return context;
}
