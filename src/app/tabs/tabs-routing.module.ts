import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { IsUserLoggedInGuard } from '../is-user-logged-in.guard';
import { LanguageComponent } from '../language/language.component';
import { LoginComponent } from '../login/login.component';
import { MySubscribtionComponent } from '../my-subscribtion/my-subscribtion.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: "language",
        component: LanguageComponent,
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "registration",
        component: RegistrationComponent,
      },
      {
        path: "viewDetails",
        component: ViewDetailsComponent,
      },
      {
        path: "my-subscribtion",
        component: MySubscribtionComponent,
        canActivate:[IsUserLoggedInGuard]

      },
    ]
  },
  {
    path: "viewDetails/:id",
    component: ViewDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
