import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySubscribtionsPage } from './my-subscribtions.page';

const routes: Routes = [
  {
    path: '',
    component: MySubscribtionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySubscribtionsPageRoutingModule {}
