import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filter projects using domains from metadata', () => {
    expect(component.projects.length).toBe(3);
    component.toggleDomain('Media & Pemberitaan');
    expect(component.filteredProjects.map(project => project.slug)).toEqual(['portal-berita']);
    component.toggleDomain('Media & Pemberitaan');
    expect(component.filteredProjects.length).toBe(3);
  });
  it('should wrap the gallery and keep each project on its own slide', () => {
    const [store, dashboard] = component.projects;
    component.moveSlide(store, -1);
    expect(component.slideIndex(store)).toBe(8);
    expect(component.slideIndex(dashboard)).toBe(0);
    component.moveSlide(store, 1);
    expect(component.slideIndex(store)).toBe(0);
  });

  it('should show the cover for projects without gallery images', () => {
    const project = { ...component.projects[0], images: [] };
    expect(component.images(project)).toEqual([project.cover]);
    component.moveSlide(project, 1);
    expect(component.slideIndex(project)).toBe(0);
  });

});
