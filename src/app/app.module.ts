import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageComponent } from './language/language.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { RegistrationComponent } from './registration/registration.component';
// import { FilterPipe } from './pipes/filter.pipe';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MySubscribtionComponent } from './my-subscribtion/my-subscribtion.component';






@NgModule({
  declarations: [AppComponent,LanguageComponent,LoginComponent,ViewDetailsComponent,RegistrationComponent,MySubscribtionComponent],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(),
           AppRoutingModule,
           HttpClientModule,
           AngularFireModule.initializeApp(environment.firebase),
           TranslateModule.forRoot({
           loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
      }
  }) 
  ],
  providers: [{ provide: RouteReuseStrategy, 
                useClass: IonicRouteStrategy 
             }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
