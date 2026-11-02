let nextId = 0;
export function previewId(prefix: string): string {
  return `${prefix}-${++nextId}`;
}

export function allowsPointerMotion(event: PointerEvent): boolean {
  return event.pointerType === 'mouse' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
