import { Popover } from "@/raw/popover";

export default function Home() {
  return (
    <div className="p-8 w-full h-[1080px]">
      {/* Test 1: Basic anchor positioning */}
      <div className="flex bg-red-100 size-full items-center justify-center gap-4">
        <Popover.Root anchor="right">
          <Popover.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-sm">
            Click me
          </Popover.Trigger>
          <Popover.Panel className="bg-white border border-gray-300 rounded-sm p-4 shadow-lg">
            <div className="text-gray-900">
              <p>This popover should appear below the trigger button</p>
              <Popover.Close className="mt-2 text-xs text-gray-500 hover:text-gray-900">
                ✕ Close
              </Popover.Close>
            </div>
          </Popover.Panel>
        </Popover.Root>
      </div>
    </div>
  );
}
