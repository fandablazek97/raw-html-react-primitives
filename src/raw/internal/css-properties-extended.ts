import type { CSSProperties } from "react";

// Anchor name types - spec: "none | <dashed-ident>#"
export type AnchorNameValue = "none" | string;

// Anchor scope types - spec: "none | all | <dashed-ident>#"
export type AnchorScopeValue = "none" | "all" | string;

// Position anchor types - spec: "auto | <anchor-name>"
export type PositionAnchorValue = "auto" | string;

// Position area types based on CSS Anchor Positioning specification
// Physical keywords
export type PositionAreaPhysical =
  | "top"
  | "bottom" 
  | "left"
  | "right";

// Logical keywords  
export type PositionAreaLogical =
  | "block-start"
  | "block-end"
  | "inline-start"
  | "inline-end"
  | "start"
  | "end";

// Coordinate keywords
export type PositionAreaCoordinate =
  | "x-start"
  | "x-end"
  | "y-start"
  | "y-end";

// Center keyword (works for both axes)
export type PositionAreaCenter = "center";

// Self keywords (for anchor-positioning)
export type PositionAreaSelf =
  | "self-start"
  | "self-end"
  | "self-block-start"
  | "self-block-end"
  | "self-inline-start"
  | "self-inline-end"
  | "self-left"
  | "self-right";

// Base position keywords (single keywords that can be used alone)
export type PositionAreaBase =
  | PositionAreaPhysical
  | PositionAreaLogical
  | PositionAreaCoordinate
  | PositionAreaCenter
  | PositionAreaSelf;

// Span keywords (with span- prefix)
export type PositionAreaSpan =
  | "span-top"
  | "span-bottom"
  | "span-left" 
  | "span-right"
  | "span-block-start"
  | "span-block-end"
  | "span-inline-start"
  | "span-inline-end"
  | "span-start"
  | "span-end"
  | "span-x-start"
  | "span-x-end"
  | "span-y-start"
  | "span-y-end"
  | "span-all";

// All position area keywords
export type PositionAreaKeyword = 
  | PositionAreaBase
  | PositionAreaSpan;

export type PositionAreaValue =
  | "none"
  | PositionAreaKeyword
  | `${PositionAreaKeyword} ${PositionAreaKeyword}`;

// Position visibility types - spec: "always | [ anchors-valid | anchors-visible | no-overflow ]"
export type PositionVisibilityValue =
  | "always"
  | "anchors-valid"
  | "anchors-visible"
  | "no-overflow";

// Position try order types - spec: "normal | <try-size>"
export type PositionTryOrderValue =
  | "normal"
  | "most-width"
  | "most-height"
  | "most-block-size"
  | "most-inline-size";

// Try tactic types from the spec
export type TryTacticValue =
  | "flip-block"
  | "flip-inline"
  | "flip-start";

// Position try fallbacks types - spec: "none | [ [<dashed-ident> | <try-tactic>] | <'position-area'> ]#"
export type PositionTryFallbackValue =
  | "none"
  | TryTacticValue
  | PositionAreaValue
  | string; // for <dashed-ident> and comma-separated lists

// Position try shorthand types - spec: "<'position-try-order'>? <'position-try-fallbacks'>"
export type PositionTryValue =
  | PositionTryOrderValue
  | PositionTryFallbackValue
  | `${PositionTryOrderValue} ${PositionTryFallbackValue}`;

// Extended CSS Properties with anchor positioning support
export type CSSPropertiesExtended = CSSProperties & {
  // Anchor naming and scoping
  anchorName?: AnchorNameValue;
  anchorScope?: AnchorScopeValue;
  
  // Anchor positioning
  positionAnchor?: PositionAnchorValue;
  positionArea?: PositionAreaValue;

  // Position visibility
  positionVisibility?: PositionVisibilityValue;

  // Position try properties
  positionTryOrder?: PositionTryOrderValue;
  positionTryFallbacks?: PositionTryFallbackValue;
  positionTry?: PositionTryValue;
};
