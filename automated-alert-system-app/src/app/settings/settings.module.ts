import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { ChangeNumberComponent } from '../change-number/change-number.component'; // Import the ChangeNumberComponent

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, ChangeNumberComponent] // Include the ChangeNumberComponent in declarations
})
export class SettingsPageModule {}
