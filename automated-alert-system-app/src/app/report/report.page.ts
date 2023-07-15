import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {
  reports: { heartRate: number; bloodPressure: number; oxygenLevel: number }[] = [];

  constructor(private routerOutlet: IonRouterOutlet) {}

  ionViewWillEnter() {
    this.loadReports();
  }

  loadReports() {
    const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    this.reports = storedReports
      .filter((report: any) => report.heartRate || report.bloodPressure || report.oxygenLevel) // Filter out empty objects
      .reverse()
      .map((report: any) => ({
        heartRate: report.heartRate,
        bloodPressure: report.bloodPressure,
        oxygenLevel: report.oxygenLevel,
        isNormal: this.isReportNormal(report),
      }));
  }
  

  deleteReport(index: number) {
    this.reports.splice(index, 1);
    localStorage.setItem('reports', JSON.stringify(this.reports));
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
  
}
