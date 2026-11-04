import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-search',
  template: `<label><span class="sr-only">Cari prompt</span><span aria-hidden="true">⌕</span><input type="search" [value]="value" (input)="valueChange.emit($any($event.target).value)" placeholder="Cari prompt, tag…" /></label>`,
  styles: `:host{display:block;width:100%;max-width:340px}label{display:flex;align-items:center;gap:12px;border:1px solid #d1d5db;border-radius:12px;padding:0 14px;background:#ffffff}label:focus-within{outline:2px solid #111111;outline-offset:2px}input{width:100%;min-width:0;border:0;background:none;color:#111827;padding:13px 0;outline:none;font-size:14px}input::placeholder{color:#6b7280}label>span{font-size:22px;color:#4b5563}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}`,
})
export class PromptSearch {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
}
