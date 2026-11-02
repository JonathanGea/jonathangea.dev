import { Component } from '@angular/core';

@Component({
  selector: 'app-commerce-preview',
  templateUrl: './commerce-preview.html',
  styleUrls: ['../preview.css', './commerce-preview.css']
})
export class CommercePreview {
  color = '#d9dce4';
  colorName = 'Cloud';
  view = 'Front';
  adding = false;
  failed = false;
  message = '';
  colors = [{name: 'Cloud', value: '#d9dce4'}, {name: 'Sand', value: '#ddd0b8'}, {name: 'Sage', value: '#bdd3c0'}];
  private timer?: ReturnType<typeof setTimeout>;
  addToBag(fail = false) {
    this.adding = true;
    this.failed = false;
    this.timer = setTimeout(() => { this.adding = false; this.failed = fail; this.message = fail ? 'Could not add bag. Please retry.' : `${this.colorName} bag added ✓`; }, 500);
  }
  ngOnDestroy() { clearTimeout(this.timer); }

}
