import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'JonathanGea | Portfolio', loadComponent: () => import('./features/home/home').then(module => module.Home) },
  { path: 'projects/:slug', loadComponent: () => import('./features/projects/detail/project-detail').then(module => module.ProjectDetail) },
  { path: 'ui-ux-prompt-library', title: 'UI/UX Prompt Library | JonathanGea', loadComponent: () => import('./features/ui-ux-prompt-library/pages/prompt-library/prompt-library').then(module => module.PromptLibrary) },
  { path: '**', loadComponent: () => import('./features/projects/detail/project-detail').then(module => module.ProjectDetail) }
];
