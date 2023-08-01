import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChangeNumberComponent } from '../change-number/change-number.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentNumber: string;

  constructor(private popoverController: PopoverController) {
    // Initialize the current number from Local Storage if it exists, otherwise set a default value
    this.currentNumber = localStorage.getItem('currentNumber') || '09612626205';
  }

  ngOnInit() {
  }

  async showChangeNumberPopover() {
    const popover = await this.popoverController.create({
      component: ChangeNumberComponent,
      translucent: true,
      componentProps: {
        newNumber: this.currentNumber
      }
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data && data.newNumber) {
      this.currentNumber = data.newNumber;
      // Save the updated currentNumber to Local Storage
      localStorage.setItem('currentNumber', this.currentNumber);
    }
  }
}
