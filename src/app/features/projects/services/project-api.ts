import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECTS } from '../generated-projects';
import { Project } from '../project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getProject(slug: string): Project | undefined {
    return PROJECTS.find(project => project.slug === slug);
  }
}
