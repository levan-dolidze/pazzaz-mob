import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySubscribtionsPageRoutingModule } from './my-subscribtions-routing.module';

import { MySubscribtionsPage } from './my-subscribtions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySubscribtionsPageRoutingModule
  ],
  declarations: [MySubscribtionsPage]
})
export class MySubscribtionsPageModule {}
