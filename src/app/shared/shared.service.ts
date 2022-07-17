import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  changeLanguageEvent: Subject<any> = new Subject();
  authStatusChange: Subject<any> = new Subject();


  languageControl(lang: any, translate: any) {
    lang = localStorage.getItem('lang');
    lang === 'en' ? translate.setDefaultLang('en') : translate.setDefaultLang('ka');
  };

  userAuthCheckong(): Observable<any> {
    let isUserLoggedIn = localStorage.getItem('user');
    if (isUserLoggedIn) {
      return of(true)
    }
    else {
      return of(false)
    }
  }
}
