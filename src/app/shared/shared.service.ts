import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  changeLanguageEvent: Subject<any> = new Subject();
  authStatusChange: Subject<any> = new Subject();
  itemQTYEvent: Subject<any> = new Subject();
  notificationEvent: Subject<any> = new Subject();
  logOutEvent:Subject<void>=new Subject();

  languageControl(lang: any, translate: any) {
    lang = localStorage.getItem('lang');
    lang === 'en' ? translate.setDefaultLang('en') : translate.setDefaultLang('ka');
  };

  userAuthChecking(): Observable<any> {
    let isUserLoggedIn = localStorage.getItem('user');
    if (isUserLoggedIn) {
      return of(true)
    }
    else {
      return of(false)
    }
  }

  returnAuthModel(): Observable<any> {
    let token = localStorage.getItem('user');
    if (token) {
      return of(JSON.parse(token))
    }
    else {
      return of(false)
    };

  };


  getToken() {
    return localStorage.getItem('user')
  }




}
