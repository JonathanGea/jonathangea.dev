import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-preview',
  templateUrl: './toast-preview.html',
  styleUrls: ['../preview.css', './toast-preview.css']
})
export class ToastPreview {
  variant = 'success';
  visible = true;
  leaving = false;
  private timer?: ReturnType<typeof setTimeout>;
  private exitTimer?: ReturnType<typeof setTimeout>;
  private hovered = false;
  private focused = false;
  private deadline = 0;
  private remaining = 6000;
  ngOnInit() { this.resume(); }
  show(variant: string) {
    clearTimeout(this.timer); clearTimeout(this.exitTimer);
    this.variant = variant; this.visible = true; this.leaving = false; this.remaining = 6000; this.resume();
  }
  pause() { clearTimeout(this.timer); this.remaining = Math.max(0, this.deadline - Date.now()); }
  resume() {
    if (!this.visible || this.leaving || this.hovered || this.focused) return;
    clearTimeout(this.timer); this.deadline = Date.now() + this.remaining;
    this.timer = setTimeout(() => this.dismiss(), this.remaining);
  }
  setHovered(value: boolean) {
    if (value && !this.hovered && !this.focused) this.pause();
    this.hovered = value;
    if (!value) this.resume();
  }
  setFocused(value: boolean) {
    if (value && !this.focused && !this.hovered) this.pause();
    this.focused = value;
    if (!value) this.resume();
  }
  focusOut(event: FocusEvent) {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) this.setFocused(false);
  }
  dismiss() {
    clearTimeout(this.timer); this.leaving = true;
    this.exitTimer = setTimeout(() => { this.visible = false; }, 200);
  }
  ngOnDestroy() { clearTimeout(this.timer); clearTimeout(this.exitTimer); }

}
