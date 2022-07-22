import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FilterPipe } from '../pipes/filter.pipe';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ExploreContainerComponentModule,
    MatBadgeModule

  ],
  declarations: [HomePage,FilterPipe]
})
export class HomePageModule {}
