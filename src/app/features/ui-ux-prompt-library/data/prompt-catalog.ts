import data from './prompts.json';
import { Prompt } from '../models/prompt';
import { PREVIEW_REGISTRY } from '../previews/preview-registry';

export const PROMPTS: readonly Prompt[] = data;
export const CATEGORIES = ['All', ...new Set(PROMPTS.map(prompt => prompt.category))];

// Fail clearly during development if the catalog and registry drift apart.
const ids = new Set<string>();
const slugs = new Set<string>();
for (const item of PROMPTS) {
  if (!item.id || !item.slug || !item.title || !item.description || !item.category ||
      !item.prompt || !item.tags.length || !Object.hasOwn(PREVIEW_REGISTRY, item.previewId) ||
      ids.has(item.id) || slugs.has(item.slug)) {
    throw new Error(`Invalid prompt catalog entry: ${item.id}`);
  }
  ids.add(item.id);
  slugs.add(item.slug);
}
