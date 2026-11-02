import { Component } from '@angular/core';
import { previewId } from '../preview-utils';
@Component({
  selector: 'app-tabs-preview',
  templateUrl: './tabs-preview.html',
  styleUrls: ['../preview.css', './tabs-preview.css']
})
export class TabsPreview {
  id = previewId('tabs');
  active = 0;
  names = ['Overview', 'Activity', 'Settings'];
  panels = ['Your team has completed 12 projects this month.', 'Maya published the latest design update 2 hours ago.', 'Manage your workspace preferences and notifications.'];
  navigate(event: KeyboardEvent) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    this.active = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (this.active + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[role=tab]')[this.active].focus();
  }

}
