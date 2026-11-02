import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-reveal-preview',
  templateUrl: './reveal-preview.html',
  styleUrls: ['../preview.css', './reveal-preview.css']
})
export class RevealPreview {
  private element = inject(ElementRef<HTMLElement>);
  visible = false;
  private observer?: IntersectionObserver;
  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') { this.visible = true; return; }
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { this.visible = true; this.observer?.disconnect(); }
    }, { threshold: .25 });
    this.observer.observe(this.element.nativeElement);
  }
  ngOnDestroy() { this.observer?.disconnect(); }

}
