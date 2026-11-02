import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-preview',
  templateUrl: './skeleton-preview.html',
  styleUrls: ['../preview.css', './skeleton-preview.css']
})
export class SkeletonPreview {
  state = 'loading';
  reading = false;
  private timer?: ReturnType<typeof setTimeout>;
  ngOnInit() { this.load(); }
  load() { clearTimeout(this.timer); this.state = 'loading'; this.reading = false; this.timer = setTimeout(() => { this.state = 'ready'; }, 1800); }
  setState(state: string) { clearTimeout(this.timer); if (state === 'loading') this.load(); else this.state = state; }
  ngOnDestroy() { clearTimeout(this.timer); }

}
