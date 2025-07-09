"use client";

import { Popover } from "@/raw/popover";
import { Dialog } from "@/raw/dialog";
import { useEffect, useRef } from "react";
import { ContentPlaceholder } from "@/components/content-placeholder";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  });

  return (
    <>
      <div className="p-8 w-full">
        {/* Test 1: Basic anchor positioning */}
        <div className="flex size-full items-center justify-center gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Existing Popover Component
            </h3>
            <Popover.Root anchor="bottom" flip>
              <Popover.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-sm">
                Click me
              </Popover.Trigger>
              <Popover.Panel className="bg-white border m-2 border-gray-300 shadow-lg rounded-sm p-4">
                <div>
                  <p>This popover should appear below the trigger button</p>
                  <Popover.Close className="mt-2 text-xs text-gray-500 hover:text-gray-900">
                    ✕ Close
                  </Popover.Close>
                </div>
              </Popover.Panel>
            </Popover.Root>
          </div>

          <dialog ref={dialogRef}>
            <p>Greetings, one and all!</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">New Dialog Component</h3>
            <Dialog.Root modal>
              <Dialog.Trigger className="bg-green-600 text-white px-4 py-2 rounded-sm">
                Open Modal Dialog
              </Dialog.Trigger>
              <Dialog.Panel className="bg-white border border-gray-300 shadow-2xl m-auto rounded-xl p-6 max-w-md max-h-fit">
                <div className="space-y-4">
                  <Dialog.Title className="text-xl font-bold">
                    Confirm Action
                  </Dialog.Title>
                  <Dialog.Description>
                    This is a modal dialog using native HTML dialog element with
                    modern DX. The title and description are properly linked
                    with ARIA attributes for accessibility.
                  </Dialog.Description>
                  <div className="flex gap-2 justify-end">
                    <Dialog.Close
                      returnValue="cancel"
                      className="px-3 py-1 text-sm border border-gray-300 rounded-sm hover:bg-gray-50"
                    >
                      Cancel
                    </Dialog.Close>
                    <Dialog.Close
                      returnValue="confirm"
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded-sm hover:bg-green-700"
                    >
                      Confirm
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog.Root>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Non-Modal Dialog</h3>
            <Dialog.Root modal={false}>
              <Dialog.Trigger className="bg-purple-600 text-white px-4 py-2 rounded-sm">
                Open Non-Modal
              </Dialog.Trigger>
              <Dialog.Panel className="bg-white border border-gray-300 shadow-2xl m-auto rounded-xl p-6 max-w-md max-h-fit">
                <div className="space-y-2">
                  <Dialog.Title className="font-semibold">
                    Information Panel
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-600">
                    This dialog doesn't block interaction with the rest of the
                    page. It's properly accessible with ARIA labels.
                  </Dialog.Description>
                  <Dialog.Close className="text-xs text-gray-500 hover:text-gray-900">
                    ✕ Close
                  </Dialog.Close>
                </div>
              </Dialog.Panel>
            </Dialog.Root>
          </div>
        </div>
      </div>

      {/* Content placeholders */}
      <div className="space-y-16">
        <ContentPlaceholder />
        <ContentPlaceholder />
        <ContentPlaceholder />
        <ContentPlaceholder />
      </div>
    </>
  );
}
