import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotNormalPageRoutingModule } from './not-normal-routing.module';

import { NotNormalPage } from './not-normal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotNormalPageRoutingModule
  ],
  declarations: [NotNormalPage]
})
export class NotNormalPageModule {}
