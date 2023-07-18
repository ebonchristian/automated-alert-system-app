import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  heartRate!: number;
  systolic!: number;
  diastolic!: number;
  oxygenLevel!: number;

  constructor(private navCtrl: NavController, private router: Router) {}

  submitData() {
    if (this.isSystolicNormal(this.systolic) && this.isDiastolicNormal(this.diastolic)) {
      const newReport = {
        date: new Date(),
        heartRate: this.heartRate || 0,
        bloodPressure: `${this.systolic}/${this.diastolic}`,
        oxygenLevel: this.oxygenLevel || 0
      };
  
      let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
      storedReports.push(newReport);
      localStorage.setItem('reports', JSON.stringify(storedReports));
  
      this.heartRate = 0;
      this.systolic = 0;
      this.diastolic = 0;
      this.oxygenLevel = 0;
    }
  }
  

  checkVitalSigns() {
    const isHeartRateNormal = this.heartRate >= 60 && this.heartRate <= 100;
    const isSystolicNormal = this.isSystolicNormal(this.systolic);
    const isDiastolicNormal = this.isDiastolicNormal(this.diastolic);
    const isOxygenLevelNormal = this.oxygenLevel >= 95 && this.oxygenLevel <= 99;

    if (isHeartRateNormal && isSystolicNormal && isDiastolicNormal && isOxygenLevelNormal) {
      const newReport = {
        heartRate: this.heartRate,
        bloodPressure: `${this.systolic}/${this.diastolic}`,
        oxygenLevel: this.oxygenLevel
      };

      let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
      storedReports.push(newReport);
      localStorage.setItem('reports', JSON.stringify(storedReports));

      this.heartRate = 0;
      this.systolic = 0;
      this.diastolic = 0;
      this.oxygenLevel = 0;
    } else {
      this.router.navigate(['/not-normal'], {
        queryParams: {
          heartRate: this.heartRate,
          bp: `${this.systolic}/${this.diastolic}`,
          oxygenLevel: this.oxygenLevel
        }
      });
    }
  }

  isHeartRateNormal(): boolean {
    return this.heartRate >= 60 && this.heartRate <= 100;
  }

  isSystolicNormal(systolic: number): boolean {
    return systolic < 120;
  }

  isDiastolicNormal(diastolic: number): boolean {
    return diastolic < 80;
  }

  isOxygenLevelNormal(): boolean {
    return this.oxygenLevel >= 95 && this.oxygenLevel <= 99;
  }

  isNotNormal(value: number | string): boolean {
    // Define your condition to determine if the value is "not normal"
    // Example condition: If the value is '1' for blood pressure, consider it "not normal"
    return String(value) === '1';
  }

  viewReport() {
    this.router.navigateByUrl('/report');
  }
}
