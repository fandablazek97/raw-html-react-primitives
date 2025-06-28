"use client";

import { useId } from "./use-id";
import type { CSSPropertiesExtended } from "./css-properties-extended";

export type AnchorOptions = {
  anchorId?: string;
  area?: CSSPropertiesExtended["positionArea"];
  tryFallbacks?: CSSPropertiesExtended["positionTryFallbacks"];
  tryOrder?: CSSPropertiesExtended["positionTryOrder"];
};

type AnchorPositionApiReturn = {
  anchorStyles: CSSPropertiesExtended;
  targetStyles: CSSPropertiesExtended;
};

export function useAnchorPositionApi({
  anchorId,
  area = "bottom",
  tryFallbacks = "flip-block, flip-inline",
  tryOrder = "most-width",
}: AnchorOptions): AnchorPositionApiReturn {
  const internalId = `--${useId("raw-ui-anchor")}`;
  const providedId = `--${anchorId}`;
  const id = anchorId ? providedId : internalId;

  return {
    anchorStyles: {
      anchorName: id,
    },
    targetStyles: {
      position: "absolute",
      positionAnchor: id,
      positionArea: area,
      positionTryFallbacks: tryFallbacks,
      positionTryOrder: tryOrder,
    },
  };
}
