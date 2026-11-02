import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { PromptCard } from '../../components/prompt-card';
import { PromptDetail } from '../../components/prompt-detail';
import { PromptFilter } from '../../components/prompt-filter';
import { PromptSearch } from '../../components/prompt-search';
import { PROMPTS } from '../../data/prompt-catalog';
import { Prompt } from '../../models/prompt';

@Component({
  selector: 'app-prompt-library',
  imports: [PromptCard, PromptDetail, PromptFilter, PromptSearch],
  templateUrl: './prompt-library.html',
  encapsulation: ViewEncapsulation.None
})
export class PromptLibrary {
  prompts = PROMPTS;
  categories = ['All', ...new Set(PROMPTS.map(prompt => prompt.category))];
  category = signal('All');
  query = signal('');
  selected = signal<Prompt | null>(null);
  filtered = computed(() => {
    const query = this.query().toLocaleLowerCase().trim();
    return this.prompts.filter(prompt => (this.category() === 'All' || prompt.category === this.category()) &&
      [prompt.title, prompt.description, prompt.category, ...prompt.tags].join(' ').toLocaleLowerCase().includes(query));
  });
  open(prompt: Prompt) { this.selected.set(prompt); document.body.style.overflow = 'hidden'; }
  close() { this.selected.set(null); document.body.style.overflow = ''; }
  ngOnDestroy() { document.body.style.overflow = ''; }
}
