export function isBrowser(): boolean {
  return typeof document !== "undefined";
}

export function getNavigator() {
  return isBrowser() ? window.navigator : null;
}

export function getDocument() {
  return isBrowser() ? document : null;
}

export function getWindow() {
  return isBrowser() ? window : null;
}
