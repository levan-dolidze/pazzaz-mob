import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  lang: any
  constructor(private translate: TranslateService,
              private shared:SharedService
    ) { }

  ngOnInit() {

    this.lang = localStorage.getItem('lang');
    this.shared.languageControl(this.lang, this.translate);
    // this.shared.changeLanguageEvent.subscribe(() => {
    //   this.shared.languageControl(this.lang, this.translate)
    // })

  }




  changeLanguage(lang: any) {
    localStorage.setItem('lang', lang.target.value);
    this.translate.use(lang.target.value);
  }
}
