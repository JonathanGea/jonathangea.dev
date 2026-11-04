import { Component, Input } from '@angular/core';

/** Static wireframes share browser chrome while keeping each layout's geometry distinct. */
@Component({
  selector: 'app-layout-preview',
  templateUrl: './layout-preview.html',
  styleUrls: ['./wireframe.css', './layout-preview.css'],
})
export class LayoutPreview {
  @Input({ required: true }) layout = 'single-column';
}
