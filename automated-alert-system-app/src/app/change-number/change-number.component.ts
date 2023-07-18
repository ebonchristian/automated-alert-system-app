import { Component, EventEmitter, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.scss'],
})
export class ChangeNumberComponent {
  newNumber: string = '';

  @Output() numberChanged = new EventEmitter<string>();

  constructor(private popoverController: PopoverController) { }

  saveNumber() {
    // Emit the formatted number
    this.popoverController.dismiss({
      newNumber: this.formatNumber(this.newNumber)
    });
  }

  formatNumber(number: string): string {
    // Remove all non-digit characters
    const cleanedNumber = number.replace(/\D/g, '');
  
    // Ensure a maximum of 11 characters
    const limitedNumber = cleanedNumber.substring(0, 11);
  
    // Split the number into groups
    const countryCode = limitedNumber.substring(0, 4);
    const firstGroup = limitedNumber.substring(4, 7);
    const secondGroup = limitedNumber.substring(7, 11);
  
    // Return the formatted number
    return `${countryCode} ${firstGroup} ${secondGroup}`;
  }
  
  applyFormat() {
    this.newNumber = this.formatNumber(this.newNumber);
  }
}
