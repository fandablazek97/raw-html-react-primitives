# Component Template

This is a generic template based on the popover component structure. Use this as a starting point for creating new Raw UI components.

## How to use this template

1. **Copy the template folder** and rename it to your component's name (e.g., `dialog`, `tooltip`, etc.)

2. **Rename the files** if needed:
   - `component.tsx` → `your-component.tsx`
   - Update imports in `index.ts` and `namespace.ts`

3. **Update the component names**:
   - Replace `Component` with your component name (e.g., `Dialog`, `Tooltip`)
   - Replace `ComponentRoot`, `ComponentTrigger`, `ComponentContent` with appropriate names
   - Update the context name and error messages

4. **Implement your component logic**:
   - Add specific props and functionality to each component part
   - Add any additional state to the context type
   - Remove or add component parts as needed

5. **Update exports**:
   - Modify `index.ts` and `namespace.ts` to export your component parts
   - Update the namespace exports to match your component structure

## Structure

The template follows this pattern:

```
ComponentName/
├── component.tsx      # Main implementation
├── index.ts          # Named exports
├── namespace.ts      # Namespace exports (for ComponentName.Root syntax)
└── README.md         # This file
```

## Usage Pattern

```tsx
// Named imports
import { ComponentRoot, ComponentTrigger, ComponentContent } from './component-name';

// Or namespace imports
import { Component } from './component-name';

// Usage
<Component.Root>
  <Component.Trigger>Open</Component.Trigger>
  <Component.Content>Content here</Component.Content>
</Component.Root>
```

## TODO Checklist

- [ ] Rename component files and folder
- [ ] Update component names throughout the files
- [ ] Define the context type with your component's state
- [ ] Implement component-specific functionality
- [ ] Update the component parts (Trigger, Content, etc.) to match your needs
- [ ] Add any additional component parts
- [ ] Update exports in index.ts and namespace.ts
- [ ] Remove this README or replace with component-specific documentation 