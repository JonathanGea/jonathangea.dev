import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-preview',
  templateUrl: './mobile-preview.html',
  styleUrls: ['../preview.css', './mobile-preview.css']
})
export class MobilePreview {
  active = 'Home';
  items = [{name: 'Home', icon: '⌂'}, {name: 'Search', icon: '⌕'}, {name: 'Saved', icon: '♡'}, {name: 'Profile', icon: '☺'}];
  messages: Record<string, string> = {Home: 'Welcome back, Maya.', Search: 'Explore projects and ideas.', Saved: 'Keep your favorite ideas close.', Profile: 'Maya Chen · Designer'};

}
