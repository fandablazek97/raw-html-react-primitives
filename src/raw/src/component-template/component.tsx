"use client";

import { createContext, useContext, useId } from "react";

// TODO: Define your component's context type
type ComponentRootContextType = {
  id: string;
  // TODO: Add other shared state properties here
};

const ComponentRootContext = createContext<ComponentRootContextType | null>(null);

function useComponentRootContext() {
  const context = useContext(ComponentRootContext);

  if (!context) {
    throw new Error(
      "Raw UI: ComponentRootContext is missing. Component parts must be used within <Component.Root>.",
    );
  }

  return context;
}

export function ComponentRoot({ children }: { children: React.ReactNode }) {
  const id = useId();
  // TODO: Add other state management here

  return (
    <ComponentRootContext.Provider value={{ id }}>
      {children}
    </ComponentRootContext.Provider>
  );
}

// TODO: Replace with your actual component parts
export function ComponentTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { id } = useComponentRootContext();

  return (
    <button {...props}>
      {children}
    </button>
  );
}

export function ComponentContent({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { id } = useComponentRootContext();

  return (
    <div {...props} id={id}>
      {children}
    </div>
  );
} 