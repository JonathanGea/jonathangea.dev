import data from './prompts.json';
import { Prompt } from '../models/prompt';
import { isPreviewId } from '../previews/preview-registry';

function readPrompts(value: unknown): Prompt[] {
  if (!Array.isArray(value)) throw new Error('Prompt catalog must be an array');
  const ids = new Set<string>();
  const slugs = new Set<string>();
  return value.map((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) throw new Error('Invalid prompt entry');
    const item = entry as Record<string, unknown>;
    for (const key of ['id', 'slug', 'title', 'description', 'category', 'prompt', 'previewId']) {
      if (typeof item[key] !== 'string' || !(item[key] as string).trim()) throw new Error(`Missing prompt field: ${key}`);
    }
    if (!Array.isArray(item['tags']) || !item['tags'].every(tag => typeof tag === 'string')) throw new Error('Invalid prompt tags');
    const id = item['id'] as string, slug = item['slug'] as string, previewId = item['previewId'] as string;
    if (ids.has(id) || slugs.has(slug)) throw new Error(`Duplicate prompt: ${id}`);
    if (!isPreviewId(previewId)) throw new Error(`Unknown preview ID: ${previewId}`);
    ids.add(id); slugs.add(slug);
    return item as unknown as Prompt;
  });
}

export const PROMPTS = readPrompts(data);
