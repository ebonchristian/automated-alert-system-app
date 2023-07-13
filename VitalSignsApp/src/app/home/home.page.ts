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
  bloodPressure!: number;
  oxygenLevel!: number;
  constructor(private navCtrl: NavController, private router: Router) {}

  submitData() {
    // Store the input values in local storage
    localStorage.setItem('heartRate', this.heartRate.toString());
    localStorage.setItem('bloodPressure', this.bloodPressure.toString());
    localStorage.setItem('oxygenLevel', this.oxygenLevel.toString());
  }
  
  checkVitalSigns() {
    var heartRateInput = parseInt((<HTMLInputElement>document.getElementById('heart-rate-input')).value);
    var bpInput = parseInt((<HTMLInputElement>document.getElementById('bp-input')).value);
    var oxygenLevelInput = parseInt((<HTMLInputElement>document.getElementById('oxygen-level-input')).value);

    var isHeartRateNormal = heartRateInput >= 60 && heartRateInput <= 100;
    var isBPNormal = bpInput < 120;
    var isOxygenLevelNormal = oxygenLevelInput >= 95 && oxygenLevelInput <=99;

    if (isHeartRateNormal && isBPNormal && isOxygenLevelNormal) {
      // All vital signs are normal, navigate to the report page
      this.router.navigate(['/home'], { state: { heartRate: heartRateInput, bp: bpInput, oxygenLevel: oxygenLevelInput } });
    } else {
      // At least one vital sign is not normal, navigate to the alert page
      this.navCtrl.navigateForward('/alert');
    }
  }
  viewReport() {
    // Navigate to the report page
    this.router.navigateByUrl('/report');
  }
}

