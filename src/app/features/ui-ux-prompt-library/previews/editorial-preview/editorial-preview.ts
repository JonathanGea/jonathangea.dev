import { Component } from '@angular/core';

@Component({
  selector: 'app-editorial-preview',
  templateUrl: './editorial-preview.html',
  styleUrls: ['../preview.css', './editorial-preview.css']
})
export class EditorialPreview {
  category = 'Design';
  expanded = false;
}
