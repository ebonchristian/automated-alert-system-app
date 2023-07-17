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
  bloodPressure!: string;
  oxygenLevel!: number;

  constructor(private navCtrl: NavController, private router: Router) {}

  submitData() {
    const newReport = {
      date: new Date(),
      heartRate: this.heartRate || 0,
      bloodPressure: this.bloodPressure || '',
      oxygenLevel: this.oxygenLevel || 0
    };

    let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    storedReports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(storedReports));

    this.heartRate = 0;
    this.bloodPressure = '';
    this.oxygenLevel = 0;
  }

  checkVitalSigns() {
    var heartRateInput = parseInt((<HTMLInputElement>document.getElementById('heart-rate-input')).value);
    var bpInput = (<HTMLInputElement>document.getElementById('bp-input')).value;
    var oxygenLevelInput = parseInt((<HTMLInputElement>document.getElementById('oxygen-level-input')).value);

    var isHeartRateNormal = heartRateInput >= 60 && heartRateInput <= 100;
    var bpValues = bpInput.split('/');
    var systolic = parseInt(bpValues[0]);
    var diastolic = parseInt(bpValues[1]);
    var isBPNormal = !isNaN(systolic) && !isNaN(diastolic) && systolic < 120 && diastolic < 80;
    var isOxygenLevelNormal = oxygenLevelInput >= 95 && oxygenLevelInput <= 99;

    if (isHeartRateNormal && isBPNormal && isOxygenLevelNormal) {
      const newReport = {
        heartRate: heartRateInput,
        bloodPressure: bpInput,
        oxygenLevel: oxygenLevelInput
      };

      let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
      storedReports.push(newReport);
      localStorage.setItem('reports', JSON.stringify(storedReports));

      this.heartRate = 0;
      this.bloodPressure = '';
      this.oxygenLevel = 0;
    } else {
      this.router.navigate(['/not-normal'], {
        queryParams: {
          heartRate: heartRateInput,
          bp: bpInput,
          oxygenLevel: oxygenLevelInput
        }
      });
    }
  }

  validateBloodPressure(bpInput: string): boolean {
    const regex = /^\d{2,3}\/\d{2,3}mmHg$/;
    return regex.test(bpInput);
  }

  isBloodPressureNormal(bpInput: string): boolean {
    const bpValues = bpInput.split('/');
    const systolic = parseInt(bpValues[0]);
    const diastolic = parseInt(bpValues[1]);
    return !isNaN(systolic) && !isNaN(diastolic) && systolic < 120 && diastolic < 80;
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
