import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {
  heartRate!: number;
  bloodPressure!: number;
  oxygenLevel!: number;

  constructor() {
    this.heartRate = parseInt(localStorage.getItem('heartRate') || '0');
    this.bloodPressure = parseInt(localStorage.getItem('bloodPressure') || '0');
    this.oxygenLevel = parseInt(localStorage.getItem('oxygenLevel') || '0');
  }
}
