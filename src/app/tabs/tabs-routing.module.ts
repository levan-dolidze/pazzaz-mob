import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { IsUserLoggedInGuard } from '../is-user-logged-in.guard';
import { LanguageComponent } from '../language/language.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'my-subscribtions',
        loadChildren: () => import('../my-subscribtions/my-subscribtions.module').then( m => m.MySubscribtionsPageModule),
        canActivate:[IsUserLoggedInGuard]
      },
      {
        path: 'details/:id',
        loadChildren: () => import('../details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: 'resetPass',
        loadChildren: () => import('../reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
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
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
