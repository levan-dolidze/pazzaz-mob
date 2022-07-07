import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  changeLanguageEvent: Subject<any> = new Subject();


  languageControl(lang: any, translate: any) {
    lang = localStorage.getItem('lang');
    lang === 'en' ? translate.setDefaultLang('en') : translate.setDefaultLang('ka');
  };
}
