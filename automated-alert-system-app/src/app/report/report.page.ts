import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {
  reports: {
    date: Date;
    heartRate: number;
    bloodPressure: string;
    oxygenLevel: number;
    isNormal: boolean;
  }[] = [];
  

  constructor() {}

  ionViewWillEnter() {
    this.loadReports();
  }

  loadReports() {
    const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    this.reports = storedReports
      .filter((report: any) => report.heartRate || report.bloodPressure || report.oxygenLevel) // Filter out empty objects
      .map((report: any) => ({
        date: new Date(report.date),
        heartRate: report.heartRate,
        bloodPressure: report.bloodPressure,
        oxygenLevel: report.oxygenLevel,
        isNormal: this.isReportNormal(report),
      }))
      .reverse();
  }
  
  
  getDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  
  getTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  }
  
  

  isBloodPressureNormal(bloodPressure: string): boolean {
    const bpValues = bloodPressure.split('/');
    const systolic = parseInt(bpValues[0]);
    const diastolic = parseInt(bpValues[1]);
    return !isNaN(systolic) && !isNaN(diastolic) && systolic < 120 && diastolic < 80;
  }

  isReportNormal(report: any): boolean {
    const isHeartRateNormal = report.heartRate >= 60 && report.heartRate <= 100;
    const bpValues = report.bloodPressure.split('/');
    const systolic = parseInt(bpValues[0]);
    const diastolic = parseInt(bpValues[1]);
    const isBPNormal = !isNaN(systolic) && !isNaN(diastolic) && systolic < 120 && diastolic < 80;
    const isOxygenLevelNormal = report.oxygenLevel >= 95 && report.oxygenLevel <= 99;
    return isHeartRateNormal && isBPNormal && isOxygenLevelNormal;
  }
  

  deleteReport(index: number) {
    this.reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(this.reports));
  }
}
