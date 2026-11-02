import { Component } from '@angular/core';
import { previewId } from '../preview-utils';
@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.html',
  styleUrls: ['../preview.css', './form-preview.css']
})
export class FormPreview {
  id = previewId('email');
  value = '';
  touched = false;
  submitted = false;
  get valid() { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value); }
  submit(event: Event) { event.preventDefault(); this.touched = true; this.submitted = this.valid; }

}
