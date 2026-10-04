import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Projects } from '../projects/projects';

@Component({ selector: 'app-home', imports: [Hero, Projects], templateUrl: './home.html' })
export class Home {}
