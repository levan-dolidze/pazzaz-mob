import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  lang: any
  constructor(private translate: TranslateService,
              private shared:SharedService,
              private route:Router,
              private menu: MenuController
    ) { }

  ngOnInit() {

    this.lang = localStorage.getItem('lang');
    this.shared.languageControl(this.lang, this.translate);
    // this.shared.changeLanguageEvent.subscribe(() => {
    //   this.shared.languageControl(this.lang, this.translate)
    // })

  }

  // openMenu(){
  //   this.menu.open()

  // this.route.navigate(['/tabs/language'])

  // }





  changeLanguage(lang: any) {
    localStorage.setItem('lang', lang.target.value);
    this.translate.use(lang.target.value);
    this.shared.changeLanguageEvent.next();
  }
}
