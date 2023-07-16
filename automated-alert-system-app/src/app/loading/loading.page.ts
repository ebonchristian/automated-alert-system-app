import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  isLoading: boolean = true;

  constructor(private loadingCtrl: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Vital signs are not normal!',
      spinner: 'dots',
      duration: 10000, // Set the duration to 10 seconds (10000 milliseconds)
    });

    await loading.present();

    // Perform necessary tasks or operations
    await this.simulateLongRunningTask(); // Example of a simulated long-running task

    // After the tasks are completed, dismiss the loading message
    await loading.dismiss();

    this.isLoading = false;
  }

  async simulateLongRunningTask(): Promise<void> {
    // Simulate a delay of 10 seconds (10000 milliseconds)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }

  ngOnInit() {
    this.presentLoading();
  }
  
}
