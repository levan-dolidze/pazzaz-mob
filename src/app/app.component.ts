import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    private shared:SharedService,

  ) { }
  showPanel: boolean = false;
  lang: any;

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.shared.languageControl(this.lang, this.translate);
        this.shared.changeLanguageEvent.subscribe(() => {
      this.lang = localStorage.getItem('lang');
      this.shared.languageControl(this.lang, this.translate);
    })
  }


  languagePanel() {
    this.closeMenu();
    this.router.navigate(['/tabs/language'])
  };

  closeMenu() {
    this.menu.close();
  };

  login(){
    this.router.navigate(['/tabs/login'])
    this.closeMenu();

  }
  goToProducts(){
    this.closeMenu();
    this.router.navigate(['/tabs/tab1'])


  }
};
