import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-prompt-filter',
  template: `<div class="pl-filters" role="group" aria-label="Filter categories">@for (category of categories(); track category) {<button type="button" [class.active]="selected() === category" [attr.aria-pressed]="selected() === category" (click)="selectedChange.emit(category)">{{category}}</button>}</div>`
})
export class PromptFilter {
  categories = input.required<string[]>();
  selected = input.required<string>();
  selectedChange = output<string>();
}
