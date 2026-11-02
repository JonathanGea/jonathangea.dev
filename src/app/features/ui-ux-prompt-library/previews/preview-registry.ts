import { Type } from '@angular/core';

// Issues #5–#7 add the actual preview components here. IDs stay stable in JSON.
export const PREVIEW_IDS = [
  'saas-dashboard', 'editorial-blog', 'commerce-product', 'bento-grid',
  'glass-card', 'editorial-type', 'magnetic-button', 'text-reveal',
  'toast-notification', 'hover-card', 'animated-tabs', 'form-field',
  'before-after', 'mobile-navigation', 'loading-skeleton'
] as const;

export type PreviewId = typeof PREVIEW_IDS[number];
export const PREVIEW_REGISTRY: Partial<Record<PreviewId, Type<unknown>>> = {};

export function isPreviewId(value: string): value is PreviewId {
  return (PREVIEW_IDS as readonly string[]).includes(value);
}

export function getPreview(previewId: string): Type<unknown> | undefined {
  return isPreviewId(previewId) ? PREVIEW_REGISTRY[previewId] : undefined;
}
