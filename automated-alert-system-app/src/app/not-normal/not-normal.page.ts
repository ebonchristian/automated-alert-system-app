import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-not-normal',
  templateUrl: './not-normal.page.html',
  styleUrls: ['./not-normal.page.scss'],
})
export class NotNormalPage implements OnInit {
  heartRate: number = 0;
  bp: string = '';
  oxygenLevel: number = 0;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.heartRate = parseInt(params['heartRate']);
      this.bp = params['bp'];
      this.oxygenLevel = parseInt(params['oxygenLevel']);
    });

    setTimeout(() => {
      this.navCtrl.navigateForward('/loading').then(() => {
        setTimeout(() => {
          this.navCtrl.navigateForward('/alert');
        }, 5000); // 5000 milliseconds = 5 seconds
      });
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  isNotNormalHeartRate(): boolean {
    return this.heartRate < 60 || this.heartRate > 100;
  }

  isNotNormalBP(): boolean {
    const bpValues = this.bp.split('/');
    const systolic = parseInt(bpValues[0]);
    const diastolic = parseInt(bpValues[1]);
    return isNaN(systolic) || isNaN(diastolic) || systolic >= 120 || diastolic >= 80;
  }

  isNotNormalOxygenLevel(): boolean {
    return this.oxygenLevel < 95 || this.oxygenLevel > 99;
  }
}
