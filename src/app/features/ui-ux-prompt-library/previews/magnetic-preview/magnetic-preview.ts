import { Component } from '@angular/core';
import { allowsPointerMotion } from '../preview-utils';
@Component({
  selector: 'app-magnetic-preview',
  templateUrl: './magnetic-preview.html',
  styleUrls: ['../preview.css', './magnetic-preview.css']
})
export class MagneticPreview {
  transform = '';
  activated = false;
  move(event: PointerEvent) {
    if (!allowsPointerMotion(event)) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * .12}px, ${(event.clientY - bounds.top - bounds.height / 2) * .12}px)`;
  }

}
