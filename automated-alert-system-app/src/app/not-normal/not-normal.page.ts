import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

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
}
