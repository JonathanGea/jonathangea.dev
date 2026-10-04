import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { ProjectsService } from '../services/project-api';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail {
  private service = inject(ProjectsService);
  private title = inject(Title);
  project = toSignal(inject(ActivatedRoute).paramMap.pipe(
    map(params => this.service.getProject(params.get('slug') ?? '')),
    tap(project => this.title.setTitle(project ? `${project.title} | JonathanGea` : 'Proyek tidak ditemukan | JonathanGea'))
  ));
}
