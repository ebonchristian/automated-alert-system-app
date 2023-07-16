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
  bloodPressure!: string; // Change the type to string
  oxygenLevel!: number;
  
  constructor(private navCtrl: NavController, private router: Router) {}
  
submitData() {
  const newReport = {
    date: new Date(), // Add the current date to the report
    heartRate: this.heartRate || 0,
    bloodPressure: this.bloodPressure || '',
    oxygenLevel: this.oxygenLevel || 0
  };

  let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
  storedReports.push(newReport);
  localStorage.setItem('reports', JSON.stringify(storedReports));

  // Clear the input fields after submitting
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
      // All vital signs are normal, store the report and clear the input fields
      const newReport = {
        heartRate: heartRateInput,
        bloodPressure: bpInput,
        oxygenLevel: oxygenLevelInput
      };
  
      let storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
      storedReports.push(newReport);
      localStorage.setItem('reports', JSON.stringify(storedReports));
  
      // Clear the input fields after submitting
      this.heartRate = 0;
      this.bloodPressure = '';
      this.oxygenLevel = 0;
    } else {
      // At least one vital sign is not normal, navigate to the not normal page and pass the values
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
    const regex = /^\d{2,3}\/\d{2,3}mmHg$/; // Regular expression for the format "120/80mmHg"
    return regex.test(bpInput);
  }
  
  viewReport() {
    // Navigate to the report page
    this.router.navigateByUrl('/report');
  }
}
