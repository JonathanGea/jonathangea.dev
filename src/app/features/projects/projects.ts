import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectsService } from './services/project-api';

export interface Project {
  title: string;
  description: string;
  images: string[];
  tags?: string[];
  livePreviewUrl?: string;
  sourceCodeUrl?: string;
  currentIndex: number; 
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  providers: [ProjectsService],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projects = this.projectsService.getProjects();
  }

  // Fungsi untuk slide selanjutnya
  nextImage(project: Project): void {
    if (typeof project.currentIndex !== 'number') {
      project.currentIndex = 0;
    }
    project.currentIndex = (project.currentIndex + 1) % project.images.length;
  }

  // Fungsi untuk slide sebelumnya
  prevImage(project: Project): void {
    if (typeof project.currentIndex !== 'number') {
      project.currentIndex = 0;
    }
    project.currentIndex = (project.currentIndex - 1 + project.images.length) % project.images.length;
  }
}
