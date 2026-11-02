import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-prompt-search',
  template: `<label class="pl-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search prompts" placeholder="Search prompts, tags..." [value]="value()" (input)="valueChange.emit($any($event.target).value)"></label>`
})
export class PromptSearch {
  value = input('');
  valueChange = output<string>();
}
