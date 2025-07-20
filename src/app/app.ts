import { Component } from '@angular/core';
import { Navbar } from "./core/layout/navbar/navbar";
import { Hero } from "./features/hero/hero";
import { Projects } from "./features/projects/projects";

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Projects],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'fe-public';
}
