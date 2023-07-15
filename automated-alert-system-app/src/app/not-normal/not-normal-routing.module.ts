import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotNormalPage } from './not-normal.page';

const routes: Routes = [
  {
    path: '',
    component: NotNormalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotNormalPageRoutingModule {}
