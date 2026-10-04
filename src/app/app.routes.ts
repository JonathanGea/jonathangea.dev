import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'JonathanGea | Portfolio', loadComponent: () => import('./features/home/home').then(module => module.Home) },
  { path: 'projects/:slug', loadComponent: () => import('./features/projects/detail/project-detail').then(module => module.ProjectDetail) },
  { path: '**', loadComponent: () => import('./features/projects/detail/project-detail').then(module => module.ProjectDetail) }
];
