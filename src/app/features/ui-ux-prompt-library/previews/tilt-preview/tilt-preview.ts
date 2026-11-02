import { Component } from '@angular/core';
import { allowsPointerMotion } from '../preview-utils';
@Component({
  selector: 'app-tilt-preview',
  templateUrl: './tilt-preview.html',
  styleUrls: ['../preview.css', './tilt-preview.css']
})
export class TiltPreview {
  transform = '';
  expanded = false;
  move(event: PointerEvent) {
    if (!allowsPointerMotion(event)) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    this.transform = `perspective(500px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-3px)`;
  }

}
