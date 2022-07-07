import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private router:Router,private menu: MenuController) { }
  showPanel: boolean = false;


  languagePanel() {
    this.closeMenu();
    this.router.navigate(['/tabs/language'])
  };

  closeMenu(){
    this.menu.close();
  };
};
