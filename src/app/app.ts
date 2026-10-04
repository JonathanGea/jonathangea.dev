import { Component } from '@angular/core';
import { Navbar } from "./core/layout/navbar/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'fe-public';
}
