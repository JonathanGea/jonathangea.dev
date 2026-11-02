import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-filter',
  template: `<div class="filters" role="group" aria-label="Filter prompt category">
    @for (category of categories; track category) {
      <button type="button" [class.active]="selected === category" [attr.aria-pressed]="selected === category" (click)="selectedChange.emit(category)">{{category}}</button>
    }
  </div>`,
  styles: `:host{display:block;min-width:0}.filters{display:flex;gap:8px;overflow-x:auto;padding:24px 2px}button{white-space:nowrap;border:1px solid #444752;color:#c0c2cd;padding:10px 16px;border-radius:999px;font-size:13px;cursor:pointer;background:transparent;min-height:44px}button:hover{border-color:#989ba9;color:white}button.active{background:#eeeef2;color:#15161b;border-color:#eeeef2}button:focus-visible{outline:2px solid #d5ff78;outline-offset:3px}`,
})
export class PromptFilter {
  @Input({ required: true }) categories: readonly string[] = [];
  @Input() selected = 'All';
  @Output() selectedChange = new EventEmitter<string>();
}
