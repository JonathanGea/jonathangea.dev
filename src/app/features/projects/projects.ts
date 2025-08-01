import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import yang hilang
import { ProjectsService } from './services/project-api';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  type: 'Aplikasi Web' | 'Desain UI/UX' | 'Aplikasi Mobile';
  domain: 'FnB' | 'Travel' | 'E-commerce' | 'Fintech' | 'Pendidikan' | 'Kesehatan';
  tags: string[];
  livePreviewUrl?: string;
  caseStudyUrl?: string;
  year?: number;
  currentIndex: number;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  providers: [ProjectsService],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit, OnDestroy { // Nama class harus PascalCase
  private autoSlideInterval: any;

  public availableDomains: string[] = ['FnB', 'Travel', 'E-commerce', 'Fintech', 'Pendidikan', 'Kesehatan'];
  public selectedDomains: string[] = [];

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this.projectsSubject.asObservable();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        const projectsWithIndex = projects.map(p => ({
          ...p,
          currentIndex: p.currentIndex || 0
        }));
        this.projectsSubject.next(projectsWithIndex);
        this.startAutoSlide();
      },
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      const currentProjects = this.projectsSubject.value;
      const updatedProjects = currentProjects.map(project => {
        if (project.images.length > 1) {
          return {
            ...project,
            currentIndex: (project.currentIndex + 1) % project.images.length
          };
        }
        return project;
      });
      this.projectsSubject.next(updatedProjects);
    }, 5000);
  }

  public toggleDomain(domain: string): void {
    if (this.selectedDomains.includes(domain)) {
      this.selectedDomains = this.selectedDomains.filter(d => d !== domain);
    } else {
      this.selectedDomains = [...this.selectedDomains, domain];
    }
    this.filterProjects();
  }

  public filterProjects(): void {
    this.projectsService.getProjects().pipe(
      map(projects => {
        if (this.selectedDomains.length > 0) {
          return projects.filter(project =>
            project.domain && this.selectedDomains.includes(project.domain)
          );
        }
        return projects;
      })
    ).subscribe(filteredProjects => {
      // Initialize currentIndex for filtered projects
      const projectsWithIndex = filteredProjects.map(p => ({
        ...p,
        currentIndex: p.currentIndex || 0
      }));
      this.projectsSubject.next(projectsWithIndex);
    });
  }

  public nextImage(project: Project, event: Event): void {
    event.stopPropagation();
    const currentIndex = project.currentIndex ?? 0;
    this.updateProjectIndex(project, (currentIndex + 1) % project.images.length);
  }

  public prevImage(project: Project, event: Event): void {
    event.stopPropagation();
    const currentIndex = project.currentIndex ?? 0;
    this.updateProjectIndex(
      project,
      (currentIndex - 1 + project.images.length) % project.images.length
    );
  }

  private updateProjectIndex(project: Project, newIndex: number): void {
    const projects = this.projectsSubject.value.map(p =>
      p.id === project.id ? { ...p, currentIndex: newIndex } : p
    );
    this.projectsSubject.next(projects); // Gunakan projectsSubject, bukan projects$
  }

  public goToSlide(project: Project, index: number, event: Event): void {
    event.stopPropagation();
    this.updateProjectIndex(project, index);
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private dragState: Record<string, { startX: number; deltaX: number; dragging: boolean }> = {};

  public onDragStart(event: PointerEvent, project: Project): void {
    event.preventDefault();
    const id = project.id;
    this.dragState[id] = {
      startX: event.clientX,
      deltaX: 0,
      dragging: true
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  public onDragMove(event: PointerEvent, project: Project): void {
    const state = this.dragState[project.id];
    if (!state || !state.dragging) return;
    state.deltaX = event.clientX - state.startX;
    // optional: visual feedback could be added here (e.g., temporary transform)
  }

  public onDragEnd(event: PointerEvent, project: Project): void {
    const state = this.dragState[project.id];
    if (!state || !state.dragging) return;
    const threshold = 50; // px minimal untuk dianggap swipe
    if (state.deltaX > threshold) {
      this.prevImage(project, event);
    } else if (state.deltaX < -threshold) {
      this.nextImage(project, event);
    }
    state.dragging = false;
    state.deltaX = 0;
  }

  public isDragging(project: Project): boolean {
    const state = this.dragState[project.id];
    return !!state?.dragging;
  }

  // Auto slide control
  public pauseAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  public resumeAutoSlide(): void {
    if (!this.autoSlideInterval) {
      this.startAutoSlide();
    }
  }
}