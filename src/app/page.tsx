import { Popover } from "@/raw/popover";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">Popover Example</h1>

      <div>
        <Popover.Root>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Popup>
            <div className="p-4">Content</div>
          </Popover.Popup>
        </Popover.Root>
      </div>
    </div>
  );
}
