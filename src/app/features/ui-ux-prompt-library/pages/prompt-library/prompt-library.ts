import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROMPTS, CATEGORIES } from '../../data/prompt-catalog';
import { Prompt } from '../../models/prompt';
import { PromptCard } from '../../components/prompt-card/prompt-card';
import { PromptDetail } from '../../components/prompt-detail/prompt-detail';
import { PromptFilter } from '../../components/prompt-filter/prompt-filter';
import { PromptSearch } from '../../components/prompt-search/prompt-search';

@Component({
  selector: 'app-prompt-library',
  imports: [RouterLink, PromptCard, PromptDetail, PromptFilter, PromptSearch],
  templateUrl: './prompt-library.html',
  styleUrl: './prompt-library.css',
})
export class PromptLibrary {
  readonly prompts = PROMPTS;
  readonly categories = CATEGORIES;
  category = 'All';
  query = '';
  selected: Prompt | null = null;

  get filteredPrompts() {
    const query = this.query.trim().toLocaleLowerCase();
    return this.prompts.filter(item =>
      (this.category === 'All' || item.category === this.category) &&
      `${item.title} ${item.description} ${item.category} ${item.tags.join(' ')}`.toLocaleLowerCase().includes(query));
  }

  reset() { this.category = 'All'; this.query = ''; }
}
