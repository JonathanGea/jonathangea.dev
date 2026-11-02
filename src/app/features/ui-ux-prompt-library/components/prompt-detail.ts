import { NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { Prompt } from '../models/prompt';
import { getPreview } from '../previews/preview-registry';

@Component({
  selector: 'app-prompt-detail',
  imports: [NgComponentOutlet],
  template: `<div class="pl-overlay" (click)="close.emit()"><section class="pl-dialog" role="dialog" aria-modal="true" [attr.aria-labelledby]="'pl-title-'+prompt().id" (click)="$event.stopPropagation()"><div class="pl-dialog-head"><div><span class="pl-eyebrow">{{prompt().category}}</span><h2 [id]="'pl-title-'+prompt().id">{{prompt().title}}</h2></div><button type="button" class="pl-close" aria-label="Close prompt details" (click)="close.emit()">×</button></div><p class="pl-dialog-description">{{prompt().description}}</p>@if (preview) {<div class="pl-detail-preview">@if (showPreview()) {<ng-container *ngComponentOutlet="preview" />}</div><button type="button" class="pl-outline-button pl-replay" (click)="replay()">↻ Replay preview</button>}<div class="pl-tags">@for (tag of prompt().tags; track tag) {<span>#{{tag}}</span>}</div><div class="pl-prompt-heading"><h3>AI prompt</h3><small>Editable after copying</small></div><pre class="pl-prompt-text">{{prompt().prompt}}</pre><div class="pl-copy-row"><span role="status">{{copyStatus()}}</span><button type="button" class="pl-primary-button" (click)="copyPrompt()">⧉ Copy prompt</button></div></section></div>`
})
export class PromptDetail implements AfterViewInit {
  prompt = input.required<Prompt>();
  close = output<void>();
  showPreview = signal(true);
  copyStatus = signal('');
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private returnFocus = document.activeElement as HTMLElement | null;
  get preview() { return getPreview(this.prompt().previewId); }
  ngAfterViewInit() { this.host.nativeElement.querySelector<HTMLButtonElement>('.pl-close')?.focus(); }
  ngOnDestroy() { this.returnFocus?.focus(); }
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); this.close.emit(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...this.host.nativeElement.querySelectorAll<HTMLElement>('button, input, select, a[href]')]
      .filter(element => !element.hasAttribute('disabled'));
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  replay() { this.showPreview.set(false); setTimeout(() => this.showPreview.set(true), 0); }
  async copyPrompt() {
    try {
      await navigator.clipboard.writeText(this.prompt().prompt);
      this.copyStatus.set('Prompt copied ✓');
    } catch {
      this.copyStatus.set('Clipboard unavailable. Select the prompt text to copy.');
    }
  }
}
