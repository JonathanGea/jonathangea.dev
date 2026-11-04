import { Component, Input, OnChanges, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PREVIEW_REGISTRY } from '../../previews/preview-registry';

@Component({
  selector: 'app-prompt-preview',
  template: '<ng-container #outlet />',
  styles: ':host {display:block; width:100%; height:100%;}',
})
export class PromptPreview implements OnInit, OnChanges {
  @Input({ required: true }) previewId!: string;
  @Input() generation = 0;
  @ViewChild('outlet', { read: ViewContainerRef, static: true }) outlet!: ViewContainerRef;
  private initialized = false;

  ngOnInit() { this.initialized = true; this.render(); }
  ngOnChanges() { if (this.initialized) this.render(); }

  private render() {
    const component = PREVIEW_REGISTRY[this.previewId];
    if (!component) throw new Error(`Unknown preview: ${this.previewId}`);
    this.outlet.clear();
    const ref = this.outlet.createComponent(component);
    if (this.previewId.startsWith('layout-')) ref.setInput('layout', this.previewId.slice(7));
  }
}
