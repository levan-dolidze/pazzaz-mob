import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(private router: Router,
    private menu: MenuController,
    private translate: TranslateService,
    private shared: SharedService,
    private firebaseAuth: FirebaseAuthService

  ) { }
  showPanel: boolean = false;
  lang: any;
  userLoggedIn: boolean;

  ngOnInit() {

    this.shared.authStatusChange.subscribe((res) => {
      // this.userLoggedIn = false
      this.checkUserLoggedIn();
    })
    this.checkUserLoggedIn();
    this.lang = localStorage.getItem('lang');
    this.shared.languageControl(this.lang, this.translate);
    this.shared.changeLanguageEvent.subscribe(() => {
      this.lang = localStorage.getItem('lang');
      this.shared.languageControl(this.lang, this.translate);
    })
  }

  logOut() {
    this.firebaseAuth.logOut();
    this.userLoggedIn = false;
    this.checkUserLoggedIn();
    this.menu.close();

  }


  checkUserLoggedIn() {
    let tokenInfo = localStorage.getItem('user');
    tokenInfo ? this.userLoggedIn = true : this.userLoggedIn = false;
  };




  mySubscribtion() {
    this.menu.close();
    this.router.navigate(['/tabs/my-subscribtions'])

  }








  languagePanel() {
    this.closeMenu();
    this.router.navigate(['/tabs/language'])
  };

  closeMenu() {
    this.menu.close();
  };

  login() {
    this.router.navigate(['/tabs/login'])
    this.closeMenu();

  }
  goToProducts() {
    this.closeMenu();
    this.router.navigate(['/tabs/tab1'])


  }


};
