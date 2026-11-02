import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Prompt } from '../models/prompt';
import { getPreview } from '../previews/preview-registry';

@Component({
  selector: 'app-prompt-card',
  imports: [NgComponentOutlet],
  template: `<article class="pl-card"><div class="pl-card-top">@if (preview) {<ng-container *ngComponentOutlet="preview" />} @else {<div class="pl-card-art" aria-hidden="true"><span>{{index() < 10 ? '0' : ''}}{{index() + 1}}</span><strong>{{prompt().category}}</strong><i>✳</i></div>}</div><div class="pl-card-body"><span class="pl-category">{{prompt().category}}</span><h3>{{prompt().title}}</h3><p>{{prompt().description}}</p><div class="pl-tags">@for (tag of prompt().tags; track tag) {<span>{{tag}}</span>}</div><button type="button" class="pl-view" (click)="open.emit(prompt())" [attr.aria-label]="'View prompt: ' + prompt().title">Read prompt ↗</button></div></article>`
})
export class PromptCard {
  prompt = input.required<Prompt>();
  index = input.required<number>();
  open = output<Prompt>();
  get preview() { return getPreview(this.prompt().previewId); }
}
