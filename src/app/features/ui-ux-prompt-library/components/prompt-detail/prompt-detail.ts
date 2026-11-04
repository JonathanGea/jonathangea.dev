import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Prompt } from '../../models/prompt';
import { PromptPreview } from '../prompt-preview/prompt-preview';

@Component({
  selector: 'app-prompt-detail',
  imports: [PromptPreview],
  templateUrl: './prompt-detail.html',
  styleUrl: './prompt-detail.css',
})
export class PromptDetail implements AfterViewInit, OnDestroy {
  @Input({ required: true }) prompt!: Prompt;
  @Output() dismissed = new EventEmitter<void>();
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('promptText', { static: true }) promptText!: ElementRef<HTMLElement>;
  private document = inject(DOCUMENT);
  private previousOverflow = '';
  private previousFocus: HTMLElement | null = null;
  generation = 0;
  copyStatus = '';

  ngAfterViewInit() {
    this.previousFocus = this.document.activeElement as HTMLElement;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.dialog.nativeElement.showModal();
  }

  backdrop(event: MouseEvent) {
    if (event.target !== this.dialog.nativeElement) return;
    const bounds = this.dialog.nativeElement.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) this.close();
  }

  trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const controls = Array.from(this.dialog.nativeElement.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]'
    )).filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  close() { this.dialog.nativeElement.close(); }

  async copy() {
    try {
      await navigator.clipboard.writeText(this.prompt.prompt);
      this.copyStatus = '✓ Prompt disalin';
    } catch {
      // Keep a readable, selectable prompt available when clipboard access is denied.
      const selection = this.document.getSelection();
      const range = this.document.createRange();
      range.selectNodeContents(this.promptText.nativeElement);
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.promptText.nativeElement.focus();
      this.copyStatus = 'Clipboard tidak tersedia. Teks prompt dipilih; gunakan perintah Salin pada perangkat Anda.';
    }
  }

  ngOnDestroy() {
    this.dialog.nativeElement.close();
    this.document.body.style.overflow = this.previousOverflow;
    if (this.previousFocus?.isConnected) this.previousFocus.focus();
  }
}
