import { useId } from "react";

export function useRawId() {
  const id = useId();
  return `raw-ui-${id}`;
}
