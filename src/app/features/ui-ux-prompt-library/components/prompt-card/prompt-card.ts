import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prompt } from '../../models/prompt';
import { PromptPreview } from '../prompt-preview/prompt-preview';

@Component({
  selector: 'app-prompt-card',
  imports: [PromptPreview],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.css',
})
export class PromptCard {
  @Input({ required: true }) prompt!: Prompt;
  @Output() open = new EventEmitter<Prompt>();
  generation = 0;
}
