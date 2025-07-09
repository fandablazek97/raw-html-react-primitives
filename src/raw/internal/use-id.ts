"use client";

import { useId as useReactId } from "react";

export function useId(prefix: string = "raw-ui-") {
  const id = useReactId();
  return `${prefix}-${id}`;
}
