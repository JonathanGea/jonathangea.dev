import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-preview',
  templateUrl: './dashboard-preview.html',
  styleUrls: ['../preview.css', './dashboard-preview.css']
})
export class DashboardPreview {
  collapsed = false;
  section = 'Overview';
  period = '30';
  reports = true;
  sections = ['Overview', 'Customers', 'Settings'];
  bars = [30, 55, 38, 73, 48, 88, 60, 97, 70, 82];
}
