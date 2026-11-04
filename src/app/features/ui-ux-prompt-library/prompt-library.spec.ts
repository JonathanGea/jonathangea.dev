import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PROMPTS, CATEGORIES } from './data/prompt-catalog';
import { PREVIEW_REGISTRY } from './previews/preview-registry';
import { PromptLibrary } from './pages/prompt-library/prompt-library';
import { PromptDetail } from './components/prompt-detail/prompt-detail';
import { TabsPreview } from './previews/tabs-preview/tabs-preview';
import { ToastPreview } from './previews/toast-preview/toast-preview';
import { SkeletonPreview } from './previews/skeleton-preview/skeleton-preview';

// Exercise the actual JSON-to-component path, including Angular template compilation.
describe('Prompt Library', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('renders every reference prompt with a registered independent preview', () => {
    const fixture = TestBed.createComponent(PromptLibrary);
    fixture.detectChanges();
    expect(PROMPTS.length).toBe(27);
    expect(CATEGORIES.length).toBe(7);
    expect(new Set(PROMPTS.map(item => item.slug)).size).toBe(PROMPTS.length);
    expect(fixture.nativeElement.querySelectorAll('app-prompt-card').length).toBe(PROMPTS.length);
    for (const item of PROMPTS) {
      const component = PREVIEW_REGISTRY[item.previewId];
      expect(component).withContext(item.id).toBeDefined();
      expect(fixture.nativeElement.querySelector(`[data-prompt-id="${item.id}"] app-prompt-preview`)?.children.length)
        .withContext(item.id).toBeGreaterThan(0);
    }
  });

  it('includes all twelve reference layouts in the existing filter and detail flow', () => {
    const fixture = TestBed.createComponent(PromptLibrary);
    fixture.componentInstance.category = 'Layout';
    fixture.detectChanges();
    const layouts = PROMPTS.filter(item => item.id.startsWith('layout-'));
    expect(layouts.length).toBe(12);
    for (const layout of layouts) {
      const card = fixture.nativeElement.querySelector(`[data-prompt-id="${layout.id}"]`);
      expect(card).withContext(layout.title).not.toBeNull();
      expect(card.querySelector('.canvas').classList.contains(layout.previewId.slice(7))).toBeTrue();
      expect(layout.prompt).toContain('existing project');
      fixture.componentInstance.query = layout.title;
      expect(fixture.componentInstance.filteredPrompts).toContain(layout);
    }
    fixture.componentInstance.query = 'Holy Grail';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('app-prompt-card .view').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('dialog .canvas.holy-grail')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('dialog .prompt-text').textContent).toContain('three-column body');
  });

  it('combines case-insensitive search and category filters, then resets empty results', () => {
    const fixture = TestBed.createComponent(PromptLibrary);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const input = root.querySelector<HTMLInputElement>('input[type=search]')!;
    input.value = '  NOTIFICATION  ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(root.querySelectorAll('app-prompt-card').length).toBe(1);
    const layout = Array.from(root.querySelectorAll<HTMLButtonElement>('app-prompt-filter button')).find(button => button.textContent?.trim() === 'Layout')!;
    layout.click(); fixture.detectChanges();
    expect(root.querySelectorAll('app-prompt-card').length).toBe(0);
    expect(root.textContent).toContain('No matching prompts.');
    root.querySelector<HTMLButtonElement>('.empty button')!.click(); fixture.detectChanges();
    expect(root.querySelectorAll('app-prompt-card').length).toBe(PROMPTS.length);
    expect(input.value).toBe('');
  });

  it('keeps embedded controls independent of opening details and replays only their own preview', () => {
    const fixture = TestBed.createComponent(PromptLibrary); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const tabs = root.querySelector<HTMLElement>('[data-prompt-id=animated-tabs]')!;
    tabs.querySelectorAll<HTMLButtonElement>('[role=tab]')[1].click(); fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBeNull();
    expect(tabs.querySelector('[role=tabpanel]')?.textContent).toContain('Maya published');
    const dashboard = root.querySelector('[data-prompt-id=saas-dashboard] app-prompt-preview > *');
    tabs.querySelector<HTMLButtonElement>('.replay')!.click(); fixture.detectChanges();
    expect(tabs.querySelector('[role=tab]')?.getAttribute('aria-selected')).toBe('true');
    expect(root.querySelector('[data-prompt-id=saas-dashboard] app-prompt-preview > *')).toBe(dashboard);
  });

  it('supports tab arrow, Home and End keys and moves focus with the selection', () => {
    const fixture = TestBed.createComponent(TabsPreview); fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('[role=tablist]') as HTMLElement;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true })); fixture.detectChanges();
    expect(fixture.componentInstance.active).toBe(2);
    expect(document.activeElement?.textContent).toBe('Settings');
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); fixture.detectChanges();
    expect(fixture.componentInstance.active).toBe(0);
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true })); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=tabpanel]').getAttribute('aria-labelledby')).toBe(fixture.nativeElement.querySelector('[role=tab]').id);
  });

  it('pauses toast auto-dismiss while the user reads it and resumes afterward', fakeAsync(() => {
    const fixture = TestBed.createComponent(ToastPreview); fixture.detectChanges();
    tick(2000); fixture.componentInstance.pause(); tick(10000);
    expect(fixture.componentInstance.visible).toBeTrue();
    fixture.componentInstance.resume(); tick(4000); tick(200);
    expect(fixture.componentInstance.visible).toBeFalse();
    fixture.componentInstance.show('error'); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('Could not save');
    fixture.destroy();
  }));

  it('keeps toast paused until both pointer and keyboard focus leave', fakeAsync(() => {
    const fixture = TestBed.createComponent(ToastPreview); fixture.detectChanges();
    const toast = fixture.componentInstance;
    tick(1000); toast.setHovered(true); toast.setFocused(true);
    toast.setHovered(false); tick(10000);
    expect(toast.visible).toBeTrue();
    toast.setFocused(false); tick(5000); tick(200);
    expect(toast.visible).toBeFalse();
    fixture.destroy();
  }));

  it('finishes loading and provides meaningful empty, error and retry states', fakeAsync(() => {
    const fixture = TestBed.createComponent(SkeletonPreview); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[aria-busy=true]')).not.toBeNull();
    tick(1800); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Designed to last.');
    fixture.componentInstance.setState('empty'); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No articles yet.');
    fixture.componentInstance.setState('error'); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('Could not load');
    fixture.nativeElement.querySelector('.text-button').click(); fixture.detectChanges(); tick(1800); fixture.detectChanges();
    expect(fixture.componentInstance.state).toBe('ready');
    fixture.destroy();
  }));
});

describe('Prompt details', () => {
  let fixture: ComponentFixture<PromptDetail>;
  let trigger: HTMLButtonElement;
  beforeEach(() => {
    trigger = document.createElement('button'); document.body.append(trigger); trigger.focus();
    fixture = TestBed.createComponent(PromptDetail);
    fixture.componentRef.setInput('prompt', PROMPTS[0]); fixture.detectChanges();
  });
  afterEach(() => { fixture.destroy(); trigger.remove(); });

  it('opens a native modal and restores focus and scrolling on teardown', () => {
    expect(fixture.nativeElement.querySelector('dialog').open).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');
    fixture.destroy();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('wraps Tab and Shift+Tab inside the modal', () => {
    const close = fixture.nativeElement.querySelector('.close') as HTMLButtonElement;
    const copy = fixture.nativeElement.querySelector('.copy') as HTMLButtonElement;
    close.focus();
    close.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(copy);
    copy.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(close);
  });

  it('copies the complete JSON prompt and reports success only after clipboard confirmation', async () => {
    const copy = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    await fixture.componentInstance.copy(); fixture.detectChanges();
    expect(copy).toHaveBeenCalledWith(PROMPTS[0].prompt);
    expect(fixture.nativeElement.textContent).toContain('Prompt copied');
  });

  it('selects the text and explains a denied clipboard instead of claiming success', async () => {
    spyOn(navigator.clipboard, 'writeText').and.rejectWith(new Error('Denied'));
    await fixture.componentInstance.copy(); fixture.detectChanges();
    expect(fixture.componentInstance.copyStatus).toContain('Clipboard unavailable');
    expect(document.getSelection()?.toString()).toBe(PROMPTS[0].prompt);
  });
});
