import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-filter',
  template: `<div class="filters" role="group" aria-label="Filter kategori prompt">
    @for (category of categories; track category) {
      <button type="button" [class.active]="selected === category" [attr.aria-pressed]="selected === category" (click)="selectedChange.emit(category)">{{category === 'All' ? 'Semua' : category}}</button>
    }
  </div>`,
  styles: `:host{display:block;min-width:0}.filters{display:flex;gap:8px;overflow-x:auto;padding:24px 2px}button{white-space:nowrap;border:1px solid #d1d5db;color:#4b5563;padding:10px 16px;border-radius:999px;font-size:13px;cursor:pointer;background:transparent;min-height:44px}button:hover{border-color:#111111;color:#111111}button.active{background:#111111;color:#ffffff;border-color:#111111}button:focus-visible{outline:2px solid #111111;outline-offset:3px}`,
})
export class PromptFilter {
  @Input({ required: true }) categories: readonly string[] = [];
  @Input() selected = 'All';
  @Output() selectedChange = new EventEmitter<string>();
}
