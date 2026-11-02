import { TestBed } from '@angular/core/testing';
import { PromptLibrary } from './prompt-library';
import { PROMPTS } from '../../data/prompt-catalog';
import { isPreviewId } from '../../previews/preview-registry';

describe('PromptLibrary', () => {
  it('loads all reference prompts with unique IDs and declared preview IDs', () => {
    expect(PROMPTS.length).toBe(15);
    expect(new Set(PROMPTS.map(item => item.id)).size).toBe(PROMPTS.length);
    expect(new Set(PROMPTS.map(item => item.slug)).size).toBe(PROMPTS.length);
    expect(PROMPTS.every(item => item.prompt.length > 40 && isPreviewId(item.previewId))).toBeTrue();
  });

  it('filters cards, opens details, and closes with Escape', async () => {
    const fixture = TestBed.createComponent(PromptLibrary);
    fixture.detectChanges();
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('app-prompt-card').length).toBe(15);

    const search = root.querySelector<HTMLInputElement>('input[type=search]')!;
    search.value = 'magnetic';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(root.querySelectorAll('app-prompt-card').length).toBe(1);
    expect(root.querySelector('app-prompt-card h3')?.textContent).toContain('Magnetic');

    search.value = '';
    search.dispatchEvent(new Event('input'));
    [...root.querySelectorAll<HTMLButtonElement>('.pl-filters button')]
      .find(button => button.textContent?.trim() === 'Motion')?.click();
    fixture.detectChanges();
    expect(root.querySelectorAll('app-prompt-card').length).toBe(3);

    root.querySelector<HTMLButtonElement>('app-prompt-card .pl-view')?.click();
    fixture.detectChanges();
    expect(root.querySelector('[role=dialog] h2')?.textContent).toContain('Magnetic');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(root.querySelector('[role=dialog]')).toBeNull();
    fixture.destroy();
  });
});
