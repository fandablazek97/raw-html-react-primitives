"use client";

type EventHandler<E = any> = (event: E) => void;

/**
 * Composes multiple event handlers into a single handler.
 * Handlers are called in order, and if any handler calls stopPropagation(),
 * subsequent handlers will not be called.
 *
 * @example
 * <button onClick={chain(onClick, internalHandler)} />
 */
export function chain<E = any>(
  ...handlers: Array<EventHandler<E> | undefined>
): EventHandler<E> {
  return function chained(event: E) {
    for (const handler of handlers) {
      if (!handler) continue;

      handler(event);

      // Check if propagation was stopped
      if (
        event &&
        typeof event === "object" &&
        "defaultPrevented" in event &&
        event.defaultPrevented
      ) {
        return;
      }
    }
  };
}

/**
 * Calls all handlers regardless of event propagation state.
 * Use this when you need all handlers to execute even if propagation is stopped.
 *
 * @example
 * <button onClick={callAll(onClick, cleanupHandler)} />
 */
export function callAll<E = any>(
  ...handlers: Array<EventHandler<E> | undefined>
): EventHandler<E> {
  return function allHandlers(event: E) {
    for (const handler of handlers) {
      handler?.(event);
    }
  };
}
