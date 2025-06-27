import { Popover } from "@/raw/src/popover";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Popover Example</h1>

      <div>
        <Popover.Root>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Popup className="p-4 backdrop:bg-red-500/5 backdrop:backdrop-blur-lg">
            <div>Content</div>
            <Popover.Close>X</Popover.Close>
          </Popover.Popup>
        </Popover.Root>
      </div>

      <div className="space-y-24 mx-auto max-w-4xl">
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
        <div className="bg-amber-500/5 text-amber-500 text-3xl py-16 px-24">
          This is some content
        </div>
      </div>
    </div>
  );
}
