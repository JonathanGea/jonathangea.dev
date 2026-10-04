import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from './services/project-api';
import { Project } from './project.model';

export type { Project } from './project.model';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  projects: Project[] = [];
  selectedDomains: string[] = [];
  private slideIndexes: Record<string, number> = {};
  private swipe: { id: string; pointerId: number; x: number; y: number } | null = null;

  images(project: Project): string[] {
    return project.images.length ? project.images : [project.cover];
  }
  slideIndex(project: Project): number {
    return this.slideIndexes[project.id] ?? 0;
  }
  goToSlide(project: Project, index: number): void {
    const count = this.images(project).length;
    this.slideIndexes[project.id] = ((index % count) + count) % count;
  }
  moveSlide(project: Project, direction: number): void {
    this.goToSlide(project, this.slideIndex(project) + direction);
  }
  startSwipe(event: PointerEvent, project: Project): void {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    this.swipe = { id: project.id, pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }
  endSwipe(event: PointerEvent, project: Project): void {
    const swipe = this.swipe;
    if (!swipe || swipe.id !== project.id || swipe.pointerId !== event.pointerId) return;
    this.swipe = null;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) this.moveSlide(project, dx < 0 ? 1 : -1);
  }
  cancelSwipe(): void {
    this.swipe = null;
  }

  constructor() {
    inject(ProjectsService).getProjects().subscribe(projects => this.projects = projects);
  }
  get availableDomains(): string[] {
    return [...new Set(this.projects.map(project => project.domain))];
  }
  get filteredProjects(): Project[] {
    return this.projects.filter(project => !this.selectedDomains.length || this.selectedDomains.includes(project.domain));
  }
  toggleDomain(domain: string): void {
    this.selectedDomains = this.selectedDomains.includes(domain)
      ? this.selectedDomains.filter(selected => selected !== domain)
      : [...this.selectedDomains, domain];
  }
}
