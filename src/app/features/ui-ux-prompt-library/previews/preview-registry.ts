import { LayoutPreview } from './layout-preview/layout-preview';
import { Type } from '@angular/core';
import { DashboardPreview } from './dashboard-preview/dashboard-preview';
import { EditorialPreview } from './editorial-preview/editorial-preview';
import { CommercePreview } from './commerce-preview/commerce-preview';
import { BentoPreview } from './bento-preview/bento-preview';
import { GlassPreview } from './glass-preview/glass-preview';
import { TypographyPreview } from './typography-preview/typography-preview';
import { MagneticPreview } from './magnetic-preview/magnetic-preview';
import { RevealPreview } from './reveal-preview/reveal-preview';
import { ToastPreview } from './toast-preview/toast-preview';
import { TiltPreview } from './tilt-preview/tilt-preview';
import { TabsPreview } from './tabs-preview/tabs-preview';
import { FormPreview } from './form-preview/form-preview';
import { ComparePreview } from './compare-preview/compare-preview';
import { MobilePreview } from './mobile-preview/mobile-preview';
import { SkeletonPreview } from './skeleton-preview/skeleton-preview';

export const PREVIEW_REGISTRY: Readonly<Record<string, Type<unknown>>> = Object.freeze({
  page: DashboardPreview,
  'layout-single-column': LayoutPreview,
  'layout-two-column': LayoutPreview,
  'layout-grid': LayoutPreview,
  'layout-f-pattern': LayoutPreview,
  'layout-z-pattern': LayoutPreview,
  'layout-split-screen': LayoutPreview,
  'layout-magazine': LayoutPreview,
  'layout-asymmetrical': LayoutPreview,
  'layout-holy-grail': LayoutPreview,
  'layout-masonry': LayoutPreview,
  'layout-hero-landing': LayoutPreview,
  'layout-full-screen': LayoutPreview,

  editorial: EditorialPreview,
  commerce: CommercePreview,
  bento: BentoPreview,
  glass: GlassPreview,
  type: TypographyPreview,
  magnetic: MagneticPreview,
  reveal: RevealPreview,
  toast: ToastPreview,
  tilt: TiltPreview,
  tabs: TabsPreview,
  form: FormPreview,
  compare: ComparePreview,
  mobile: MobilePreview,
  skeleton: SkeletonPreview,
});
